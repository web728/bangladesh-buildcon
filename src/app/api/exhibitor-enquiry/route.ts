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
  if (!secret) return false;
  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }).toString(),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return false;
    const result: { success?: boolean } = await response.json();
    return result.success === true;
  } catch (error) {
    console.error("reCAPTCHA verification failed", error);
    return false;
  }
}

export async function POST(req: NextRequest) {
  if (isRateLimited(`exhibitor:${getClientIp(req.headers)}`)) {
    return NextResponse.json({ error: "Too many submissions. Please try later." }, { status: 429 });
  }
  let body: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (raw.length > 12_000) return NextResponse.json({ error: "Request too large" }, { status: 413 });
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid body");
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const token = String(body.recaptchaToken || body["g-recaptcha-response"] || "");
  if (!token || !(await verifyRecaptcha(token))) {
    return NextResponse.json({ error: "Please complete valid reCAPTCHA verification." }, { status: 400 });
  }
  const parsed = exhibitorEnquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the highlighted fields.", issues: parsed.error.issues },
      { status: 400 },
    );
  }
  const data = parsed.data;
  // Keep existing honeypot behavior for bot-looking input.
  if (data.website_hp || (data.startedAt && Date.now() - data.startedAt < MIN_SUBMIT_MS)) {
    return NextResponse.json({ success: true, referenceId: generateReferenceId("TBEX") });
  }

  const draftId = typeof body.draftId === "string" && /^[a-f0-9-]{36}$/i.test(body.draftId)
    ? body.draftId
    : undefined;
  const preferredBoothSize = data.preferredBoothSize || undefined;
  let referenceId = generateReferenceId("TBEX");
  let newlyCreated = false;

  try {
    if (!(await connectToDatabase())) throw new Error("Database unavailable");
    const existing = draftId ? await ExhibitorEnquiry.findOne({ draftId }).lean() : null;
    if (existing) {
      return NextResponse.json({ success: true, referenceId: existing.referenceId });
    }
    await ExhibitorEnquiry.create({
      referenceId,
      ...(draftId ? { draftId } : {}),
      companyName: data.companyName,
      contactPerson: data.contactPerson,
      designation: data.designation,
      mobile: data.mobile,
      email: data.email,
      country: data.country,
      productsServices: data.productsServices,
      preferredBoothSize,
      utm: data.utm,
      landingPage: data.landingPage,
      userAgent: req.headers.get("user-agent") || "",
    });
    newlyCreated = true;
    if (draftId) {
      await ExhibitorDraft.updateOne(
        { draftId },
        {
          $set: { status: "submitted", referenceId },
          $unset: { expiresAt: 1 },
        },
      ).catch((error) => console.error("Mark draft submitted failed", error));
    }
  } catch (error) {
    // A repeated submit with same draftId can race; return original reference.
    if (draftId) {
      const prior = await ExhibitorEnquiry.findOne({ draftId }).lean().catch(() => null);
      if (prior) return NextResponse.json({ success: true, referenceId: prior.referenceId });
    }
    console.error("Exhibitor save failed", safeDbErrorMessage(error));
    return NextResponse.json({ error: "Unable to save enquiry right now." }, { status: 503 });
  }

  if (newlyCreated && isSheetsConfigured()) {
    try {
      await upsertExhibitorLeadRow(
        draftId ? `DRAFT:${draftId}` : `EXHIBITOR:${referenceId}`,
        {
          referenceId, registerAs: "Exhibitor Enquiry",
          companyName: data.companyName,
          contactPerson: data.contactPerson,
          designation: data.designation,
          email: data.email,
          mobile: data.mobile,
          country: data.country,
          boothSizeRequirement: preferredBoothSize || "",
          areaOfInterest: data.productsServices,
          message: "Submitted",
          utmSource: data.utm?.source ?? "",
          utmMedium: data.utm?.medium ?? "",
          utmCampaign: data.utm?.campaign ?? "",
          landingPage: data.landingPage ?? "",
        },
      );
      await ExhibitorEnquiry.updateOne({ referenceId }, { sheetsSyncStatus: "synced" });
    } catch (error) {
      console.error("Exhibitor sheet sync failed", error);
      await ExhibitorEnquiry.updateOne({ referenceId }, { sheetsSyncStatus: "failed" }).catch(() => {});
    }
  }

  if (newlyCreated && isEmailConfigured()) {
    try {
      await sendExhibitorEnquiryEmails({ ...data, preferredBoothSize, referenceId });
      await ExhibitorEnquiry.updateOne({ referenceId }, { emailStatus: "sent" });
    } catch (error) {
      console.error("Exhibitor mail failed", error);
      await ExhibitorEnquiry.updateOne({ referenceId }, { emailStatus: "failed" }).catch(() => {});
    }
  }

  return NextResponse.json({ success: true, referenceId });
}
