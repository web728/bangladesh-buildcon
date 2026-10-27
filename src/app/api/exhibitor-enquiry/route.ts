import { NextRequest, NextResponse } from "next/server";
import { exhibitorEnquirySchema } from "@/lib/validation/exhibitorEnquiry";
import { MIN_SUBMIT_MS } from "@/lib/validation/shared";
import { connectToDatabase, safeDbErrorMessage } from "@/lib/db/mongodb";
import { ExhibitorEnquiry } from "@/models/ExhibitorEnquiry";
import { ExhibitorDraft } from "@/models/ExhibitorDraft";
import { generateReferenceId } from "@/lib/utils/referenceId";
import { isRateLimited, getClientIp } from "@/lib/utils/rateLimit";
import { upsertExhibitorLeadRow, isSheetsConfigured } from "@/lib/google/sheets";
import { sendExhibitorEnquiryEmails } from "@/lib/email/sendLeadEmails";
import { isEmailConfigured } from "@/lib/email/mailer";

export const runtime = "nodejs";

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret || !token) return false;
  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }).toString(),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return false;
    const json: { success?: boolean } = await response.json();
    return json.success === true;
  } catch (error) {
    console.error("[Exhibitor] recaptcha:", error);
    return false;
  }
}

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function syncSheet(referenceId: string, data: {
  draftId?: string; companyName: string; contactPerson: string; designation: string;
  mobile: string; email: string; country: string; productsServices: string;
  preferredBoothSize?: string | null; landingPage?: string | null;
  utm?: { source?: string; medium?: string; campaign?: string } | null;
}): Promise<"synced" | "failed" | "unconfigured"> {
  if (!isSheetsConfigured()) {
    console.error("[Exhibitor] Sheets not configured; MongoDB record remains pending:", referenceId);
    return "unconfigured";
  }
  try {
    await upsertExhibitorLeadRow(
      data.draftId ? `DRAFT:${data.draftId}` : `EXHIBITOR:${referenceId}`,
      {
        referenceId,
        registerAs: "Exhibitor Enquiry",
        companyName: data.companyName,
        contactPerson: data.contactPerson,
        designation: data.designation,
        mobile: data.mobile,
        email: data.email,
        country: data.country,
        boothSizeRequirement: data.preferredBoothSize ?? "",
        areaOfInterest: data.productsServices,
        message: "Submitted",
        utmSource: data.utm?.source ?? "",
        utmMedium: data.utm?.medium ?? "",
        utmCampaign: data.utm?.campaign ?? "",
        landingPage: data.landingPage ?? "",
      },
    );
    await ExhibitorEnquiry.updateOne({ referenceId }, { $set: { sheetsSyncStatus: "synced" } });
    return "synced";
  } catch (error) {
    console.error("[Exhibitor] Google Sheets FAILED:", referenceId, error);
    await ExhibitorEnquiry.updateOne({ referenceId }, { $set: { sheetsSyncStatus: "failed" } }).catch(console.error);
    return "failed";
  }
}

export async function POST(req: NextRequest) {
  if (isRateLimited(`exhibitor:${getClientIp(req.headers)}`))
    return NextResponse.json({ error: "Too many submissions. Try later." }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (Buffer.byteLength(raw, "utf8") > 12_000)
      return NextResponse.json({ error: "Request too large" }, { status: 413 });
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Bad body");
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const token = String(body.recaptchaToken || body["g-recaptcha-response"] || "");
  if (!(await verifyRecaptcha(token)))
    return NextResponse.json({ error: "Please complete reCAPTCHA." }, { status: 400 });

  const result = exhibitorEnquirySchema.safeParse(body);
  if (!result.success)
    return NextResponse.json({ error: "Check highlighted fields", issues: result.error.issues }, { status: 400 });
  const data = result.data;
  if (data.website_hp || (data.startedAt && Date.now() - data.startedAt < MIN_SUBMIT_MS))
    return NextResponse.json({ success: true, referenceId: generateReferenceId("TBEX") });

  const draftId = typeof body.draftId === "string" && uuidPattern.test(body.draftId) ? body.draftId : undefined;
  let referenceId = generateReferenceId("TBEX");
  let created = false;
  try {
    if (!(await connectToDatabase())) throw new Error("MongoDB not configured");
    const existing = draftId ? await ExhibitorEnquiry.findOne({ draftId }).lean() : null;
    if (existing) {
      referenceId = existing.referenceId;
      // Retry Sheets even when lead already exists. Never repeat acknowledgement email.
      const sheets = await syncSheet(referenceId, {
        draftId, companyName: existing.companyName, contactPerson: existing.contactPerson,
        designation: existing.designation, mobile: existing.mobile, email: existing.email,
        country: existing.country, productsServices: existing.productsServices,
        preferredBoothSize: existing.preferredBoothSize,
        landingPage: existing.landingPage, utm: data.utm,
      });
      return NextResponse.json({ success: true, referenceId, alreadySubmitted: true, sheets });
    }
    await ExhibitorEnquiry.create({
      referenceId, ...(draftId ? { draftId } : {}),
      companyName: data.companyName, contactPerson: data.contactPerson,
      designation: data.designation, mobile: data.mobile, email: data.email,
      country: data.country, productsServices: data.productsServices,
      preferredBoothSize: data.preferredBoothSize || undefined,
      utm: data.utm, landingPage: data.landingPage,
      userAgent: req.headers.get("user-agent") || "",
      sheetsSyncStatus: "pending", emailStatus: "pending",
    });
    created = true;
    if (draftId) await ExhibitorDraft.updateOne(
      { draftId }, { $set: { status: "submitted", referenceId }, $unset: { expiresAt: 1 } },
    ).catch((error) => console.error("[Exhibitor] mark draft submitted:", error));
  } catch (error) {
    if (draftId && !created) {
      const prior = await ExhibitorEnquiry.findOne({ draftId }).lean().catch(() => null);
      if (prior) return NextResponse.json({ success: true, referenceId: prior.referenceId, alreadySubmitted: true, sheets: "retry-required" });
    }
    console.error("[Exhibitor] MongoDB save failed:", safeDbErrorMessage(error));
    return NextResponse.json({ error: "Unable to save enquiry." }, { status: 503 });
  }

  const sheets = await syncSheet(referenceId, { ...data, draftId, preferredBoothSize: data.preferredBoothSize || "" });
  if (created && isEmailConfigured()) {
    try {
      await sendExhibitorEnquiryEmails({ ...data, preferredBoothSize: data.preferredBoothSize || undefined, referenceId });
      await ExhibitorEnquiry.updateOne({ referenceId }, { $set: { emailStatus: "sent" } });
    } catch (error) {
      console.error("[Exhibitor] email failed:", error);
      await ExhibitorEnquiry.updateOne({ referenceId }, { $set: { emailStatus: "failed" } }).catch(console.error);
    }
  }
  // Don't claim Sheet success when Sheets failed. Form lead IS saved in MongoDB.
  return NextResponse.json({ success: true, referenceId, sheets });
}
