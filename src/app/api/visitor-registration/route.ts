import { NextRequest, NextResponse } from "next/server";
import { visitorRegistrationSchema } from "@/lib/validation/visitorRegistration";
import { MIN_SUBMIT_MS } from "@/lib/validation/shared";
import { connectToDatabase, safeDbErrorMessage } from "@/lib/db/mongodb";
import { VisitorRegistration } from "@/models/VisitorRegistration";
import { VisitorDraft } from "@/models/VisitorDraft";
import { generateReferenceId } from "@/lib/utils/referenceId";
import { isRateLimited, getClientIp } from "@/lib/utils/rateLimit";
import { isSheetsConfigured } from "@/lib/google/sheets";
import { upsertVisitorLeadRow } from "@/lib/google/visitorLeadSheets";
import { sendVisitorRegistrationEmails } from "@/lib/email/sendLeadEmails";
import { isEmailConfigured } from "@/lib/email/mailer";

export const runtime = "nodejs";
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret || !token) return false;
  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }).toString(),
      cache: "no-store", signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return false;
    const json: { success?: boolean } = await response.json();
    return json.success === true;
  } catch (error) { console.error("[Visitor] recaptcha:", error); return false; }
}

type SheetVisitor = {
  draftId?: string; fullName: string; company: string; designation: string;
  mobile: string; email: string; country: string; businessCategory?: string | null;
  landingPage?: string | null;
};

async function syncSheet(referenceId: string, data: SheetVisitor): Promise<"synced" | "failed" | "unconfigured"> {
  if (!isSheetsConfigured()) {
    console.error("[Visitor] Google Sheets credentials missing:", referenceId);
    return "unconfigured";
  }
  try {
    await upsertVisitorLeadRow(data.draftId ? `VISITOR:${data.draftId}` : `VISITOR:${referenceId}`, {
      referenceId, registerAs: "Visitor Registration", fullName: data.fullName,
      company: data.company, designation: data.designation, mobile: data.mobile,
      email: data.email, businessCategory: data.businessCategory ?? "",
      country: data.country, landingPage: data.landingPage ?? "", status: "Submitted",
    });
    await VisitorRegistration.updateOne({ referenceId }, { $set: { sheetsSyncStatus: "synced" } });
    return "synced";
  } catch (error) {
    console.error("[Visitor] Google Sheets FAILED:", referenceId, error);
    await VisitorRegistration.updateOne({ referenceId }, { $set: { sheetsSyncStatus: "failed" } }).catch(console.error);
    return "failed";
  }
}

export async function POST(req: NextRequest) {
  if (isRateLimited(`visitor:${getClientIp(req.headers)}`))
    return NextResponse.json({ error: "Too many submissions. Try later." }, { status: 429 });
  let body: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (Buffer.byteLength(raw, "utf8") > 12_000)
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Bad body");
    body = parsed as Record<string, unknown>;
  } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const token = String(body.recaptchaToken || body["g-recaptcha-response"] || "");
  if (!(await verifyRecaptcha(token)))
    return NextResponse.json({ error: "Please complete reCAPTCHA." }, { status: 400 });
  const result = visitorRegistrationSchema.safeParse(body);
  if (!result.success)
    return NextResponse.json({ error: "Check highlighted fields", issues: result.error.issues }, { status: 400 });
  const data = result.data;
  if (data.website_hp || (data.startedAt && Date.now() - data.startedAt < MIN_SUBMIT_MS))
    return NextResponse.json({ success: true, referenceId: generateReferenceId("TBVR") });

  const draftId = typeof body.draftId === "string" && uuidPattern.test(body.draftId) ? body.draftId : undefined;
  let referenceId = generateReferenceId("TBVR");
  let created = false;
  try {
    if (!(await connectToDatabase())) throw new Error("Database unavailable");
    // Preserve the existing email-based duplicate registration rule.
    const existing = await VisitorRegistration.findOne({ email: data.email.toLowerCase().trim() }).lean();
    if (existing) {
      referenceId = existing.referenceId;
      const sheets = await syncSheet(referenceId, {
        draftId: existing.draftId || draftId,
        fullName: existing.fullName, company: existing.company,
        designation: existing.designation, mobile: existing.mobile,
        email: existing.email, country: existing.country,
        businessCategory: existing.businessCategory,
        landingPage: existing.landingPage,
      });
      return NextResponse.json({ success: true, referenceId, alreadyRegistered: true, sheets });
    }
    await VisitorRegistration.create({
      referenceId, ...(draftId ? { draftId } : {}),
      fullName: data.fullName, company: data.company,
      designation: data.designation, mobile: data.mobile, email: data.email,
      businessCategory: data.businessCategory || "", country: data.country,
      utm: data.utm, landingPage: data.landingPage,
      userAgent: req.headers.get("user-agent") || "",
      sheetsSyncStatus: "pending", emailStatus: "pending",
    });
    created = true;
    if (draftId) await VisitorDraft.updateOne(
      { draftId }, { $set: { status: "submitted", referenceId }, $unset: { expiresAt: 1 } },
    ).catch((error) => console.error("[Visitor] draft update failed:", error));
  } catch (error) {
    const prior = await VisitorRegistration.findOne({ email: data.email.toLowerCase().trim() }).lean().catch(() => null);
    if (prior) return NextResponse.json({ success: true, referenceId: prior.referenceId, alreadyRegistered: true, sheets: "retry-required" });
    console.error("[Visitor] MongoDB failed:", safeDbErrorMessage(error));
    return NextResponse.json({ error: "Unable to save registration." }, { status: 503 });
  }
  const sheets = await syncSheet(referenceId, { ...data, draftId });
  if (created && isEmailConfigured()) {
    try {
      await sendVisitorRegistrationEmails({ ...data, referenceId });
      await VisitorRegistration.updateOne({ referenceId }, { $set: { emailStatus: "sent" } });
    } catch (error) {
      console.error("[Visitor] email failed:", error);
      await VisitorRegistration.updateOne({ referenceId }, { $set: { emailStatus: "failed" } }).catch(console.error);
    }
  }
  return NextResponse.json({ success: true, referenceId, sheets });
}
