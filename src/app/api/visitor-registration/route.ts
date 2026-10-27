import { NextRequest, NextResponse } from "next/server";
import { visitorRegistrationSchema } from "@/lib/validation/visitorRegistration";
import { MIN_SUBMIT_MS } from "@/lib/validation/shared";
import { connectToDatabase, safeDbErrorMessage } from "@/lib/db/mongodb";
import { VisitorRegistration } from "@/models/VisitorRegistration";
import { VisitorDraft } from "@/models/VisitorDraft";
import { generateReferenceId } from "@/lib/utils/referenceId";
import { getClientIp, isRateLimited } from "@/lib/utils/rateLimit";
import { isSheetsConfigured } from "@/lib/google/sheets";
import { upsertVisitorLeadRow } from "@/lib/google/visitorLeadSheets";
import { sendVisitorRegistrationEmails } from "@/lib/email/sendLeadEmails";
import { isEmailConfigured } from "@/lib/email/mailer";

export const runtime = "nodejs";
async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return false;
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }), cache: "no-store",
    });
    if (!res.ok) return false;
    const result: { success?: boolean } = await res.json();
    return result.success === true;
  } catch (error) { console.error("Visitor reCAPTCHA verification failed", error); return false; }
}
export async function POST(req: NextRequest) {
  if (isRateLimited(`visitor:${getClientIp(req.headers)}`)) return NextResponse.json({ error: "Too many submissions. Try again later." }, { status: 429 });
  let body: Record<string, unknown>;
  try {
    const json: unknown = await req.json();
    if (!json || typeof json !== "object" || Array.isArray(json)) throw new Error("Invalid body");
    body = json as Record<string, unknown>;
  } catch { return NextResponse.json({ error: "Invalid request body" }, { status: 400 }); }
  const token = String(body.recaptchaToken || body["g-recaptcha-response"] || "");
  if (!token || !(await verifyRecaptcha(token))) return NextResponse.json({ error: "Complete the reCAPTCHA verification." }, { status: 400 });
  const parsed = visitorRegistrationSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Check the highlighted fields.", issues: parsed.error.issues }, { status: 400 });
  const data = parsed.data;
  if (data.website_hp || (data.startedAt && Date.now() - data.startedAt < MIN_SUBMIT_MS)) {
    return NextResponse.json({ success: true, referenceId: generateReferenceId("TBVR") });
  }
  let referenceId = generateReferenceId("TBVR");
  let alreadyRegistered = false;
  try {
    if (!await connectToDatabase()) throw new Error("Database unavailable");
    // Preserve historical email deduplication; the email index alone is not unique.
    const existing = await VisitorRegistration.findOne({ email: data.email.toLowerCase() }).select("referenceId draftId").lean();
    if (existing) {
      referenceId = existing.referenceId;
      alreadyRegistered = true;
    } else {
      try {
        await VisitorRegistration.create({
          referenceId, draftId: data.draftId || undefined, fullName: data.fullName,
          company: data.company, designation: data.designation, mobile: data.mobile,
          email: data.email, businessCategory: data.businessCategory || "", country: data.country,
          utm: data.utm, landingPage: data.landingPage,
          userAgent: req.headers.get("user-agent") || undefined,
        });
      } catch (error) {
        // Recovery for a concurrent submission of the same draft ID.
        if (!data.draftId) throw error;
        const concurrent = await VisitorRegistration.findOne({ draftId: data.draftId }).select("referenceId").lean();
        if (!concurrent) throw error;
        referenceId = concurrent.referenceId;
        alreadyRegistered = true;
      }
    }
    if (data.draftId) {
      await VisitorDraft.updateOne({ draftId: data.draftId }, {
        $set: { status: "submitted", referenceId, sheetsSyncStatus: "synced" },
        $unset: { expiresAt: 1, sheetsLeaseUntil: 1 },
      }).catch((err: unknown) => console.error("Visitor draft finalize failed", safeDbErrorMessage(err)));
    }
  } catch (error) {
    console.error("Visitor save failed", safeDbErrorMessage(error));
    return NextResponse.json({ error: "Unable to save registration. Please retry." }, { status: 503 });
  }
  if (alreadyRegistered) return NextResponse.json({ success: true, referenceId, alreadyRegistered: true });
  if (isSheetsConfigured()) {
    try {
      await upsertVisitorLeadRow(`VISITOR:${data.draftId || referenceId}`, {
        referenceId, registerAs: "Visitor Registration", fullName: data.fullName,
        company: data.company, designation: data.designation, mobile: data.mobile,
        email: data.email, businessCategory: data.businessCategory || "", country: data.country,
        landingPage: data.landingPage, status: "Submitted",
      });
      await VisitorRegistration.updateOne({ referenceId }, { sheetsSyncStatus: "synced" });
    } catch (error) {
      console.error("Visitor Sheet sync failed", error);
      await VisitorRegistration.updateOne({ referenceId }, { sheetsSyncStatus: "failed" }).catch(() => {});
    }
  }
  if (isEmailConfigured()) {
    try {
      await sendVisitorRegistrationEmails({ ...data, referenceId });
      await VisitorRegistration.updateOne({ referenceId }, { emailStatus: "sent" });
    } catch (error) {
      console.error("Visitor email failed", error);
      await VisitorRegistration.updateOne({ referenceId }, { emailStatus: "failed" }).catch(() => {});
    }
  }
  return NextResponse.json({ success: true, referenceId });
}
