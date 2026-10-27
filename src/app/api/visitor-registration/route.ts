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
const UUID = /^[a-f\d]{8}-(?:[a-f\d]{4}-){3}[a-f\d]{12}$/i;

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
    const result: { success?: boolean } = await response.json();
    return result.success === true;
  } catch (error) {
    console.error("[Visitor] reCAPTCHA verification failed", error);
    return false;
  }
}

function isDuplicateKey(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === 11000;
}

type FinalVisitor = {
  referenceId: string;
  draftId?: string | null;
  fullName: string;
  company: string;
  designation: string;
  mobile: string;
  email: string;
  country: string;
  businessCategory?: string | null;
  landingPage?: string | null;
  sheetsSyncStatus?: string;
  emailStatus?: string;
};

async function syncSheet(doc: FinalVisitor): Promise<"synced" | "failed" | "unconfigured"> {
  if (!isSheetsConfigured()) {
    await VisitorRegistration.updateOne(
      { referenceId: doc.referenceId },
      { $set: { sheetsSyncStatus: "failed" } },
    ).catch(console.error);
    return "unconfigured";
  }
  try {
    await upsertVisitorLeadRow(
      doc.draftId ? `VISITOR:${doc.draftId}` : `VISITOR:${doc.referenceId}`,
      {
        referenceId: doc.referenceId,
        registerAs: "Visitor Registration",
        fullName: doc.fullName,
        company: doc.company,
        designation: doc.designation,
        mobile: doc.mobile,
        email: doc.email,
        businessCategory: doc.businessCategory ?? "",
        country: doc.country,
        landingPage: doc.landingPage ?? "",
        status: "Submitted",
      },
    );
    await VisitorRegistration.updateOne(
      { referenceId: doc.referenceId },
      { $set: { sheetsSyncStatus: "synced" } },
    );
    return "synced";
  } catch (error) {
    console.error("[Visitor] Google Sheets sync failed", doc.referenceId, error);
    await VisitorRegistration.updateOne(
      { referenceId: doc.referenceId },
      { $set: { sheetsSyncStatus: "failed" } },
    ).catch(console.error);
    return "failed";
  }
}

async function markDraftSubmitted(draftId: string | undefined, referenceId: string) {
  if (!draftId) return;
  try {
    await VisitorDraft.updateOne(
      { draftId },
      {
        $set: { status: "submitted", referenceId },
        $unset: { expiresAt: 1, sheetsLeaseUntil: 1 },
      },
    );
  } catch (error) {
    // Submission must not fail because of a secondary status update.
    console.error("[Visitor] Failed to mark draft submitted", error);
  }
}

export async function POST(req: NextRequest) {
  if (isRateLimited(`visitor:${getClientIp(req.headers)}`)) {
    return NextResponse.json({ error: "Too many submissions. Try later." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (Buffer.byteLength(raw, "utf8") > 12_000) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid request body");
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const token = String(body.recaptchaToken || body["g-recaptcha-response"] || "");
  if (!(await verifyRecaptcha(token))) {
    return NextResponse.json({ error: "Please complete reCAPTCHA." }, { status: 400 });
  }

  const parsed = visitorRegistrationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the highlighted fields.", issues: parsed.error.issues },
      { status: 400 },
    );
  }
  const data = parsed.data;
  if (data.website_hp || (data.startedAt && Date.now() - data.startedAt < MIN_SUBMIT_MS)) {
    return NextResponse.json({ success: true, referenceId: generateReferenceId("TBVR") });
  }

  const draftId = typeof body.draftId === "string" && UUID.test(body.draftId)
    ? body.draftId
    : undefined;
  const email = data.email.toLowerCase().trim();
  let doc: FinalVisitor | null = null;
  let created = false;
  let alreadyRegistered = false;
  let sessionResetRequired = false;
  let effectiveDraftId = draftId;

  try {
    if (!(await connectToDatabase())) throw new Error("Database unavailable");

    // A session ID is not an identity credential. The browser can retain a
    // previously submitted ID even when a different visitor uses the form.
    const existingByDraft = draftId
      ? await VisitorRegistration.findOne({ draftId }).lean()
      : null;

    if (existingByDraft && existingByDraft.email.toLowerCase() !== email) {
      // Never attach a second person's registration to that old draft ID.
      // Continue with independent email-based registration and ask the client
      // to reset its locally stored draft session after a successful response.
      effectiveDraftId = undefined;
      sessionResetRequired = true;
    }

    const matchingDraft = existingByDraft &&
      existingByDraft.email.toLowerCase() === email
        ? existingByDraft
        : null;

    const existingByEmail = matchingDraft ??
      await VisitorRegistration.findOne({ email }).lean();

    if (existingByEmail) {
      doc = existingByEmail as FinalVisitor;
      alreadyRegistered = true;
      // Only finalize a draft if that exact ID belongs to this registration.
      if (doc.draftId !== effectiveDraftId) effectiveDraftId = undefined;
    } else {
      const referenceId = generateReferenceId("TBVR");
      const inserted = await VisitorRegistration.create({
        referenceId,
        ...(effectiveDraftId ? { draftId: effectiveDraftId } : {}),
        fullName: data.fullName,
        company: data.company,
        designation: data.designation,
        mobile: data.mobile,
        email,
        businessCategory: data.businessCategory || "",
        country: data.country,
        utm: data.utm,
        landingPage: data.landingPage,
        userAgent: req.headers.get("user-agent") ?? "",
        sheetsSyncStatus: "pending",
        emailStatus: "pending",
      });
      doc = inserted.toObject() as FinalVisitor;
      created = true;
    }
  } catch (error) {
    if (isDuplicateKey(error)) {
      // Recover a duplicate caused by concurrent requests. The draft row
      // may belong to another email; never select it in that case.
      try {
        const byDraft = effectiveDraftId
          ? await VisitorRegistration.findOne({ draftId: effectiveDraftId }).lean()
          : null;
        const sameEmailDraft = byDraft?.email.toLowerCase() === email
          ? byDraft
          : null;
        const byEmail = sameEmailDraft ??
          await VisitorRegistration.findOne({ email }).lean();
        if (byEmail && byEmail.email.toLowerCase() === email) {
          doc = byEmail as FinalVisitor;
          alreadyRegistered = true;
          if (doc.draftId !== effectiveDraftId) effectiveDraftId = undefined;
        }
      } catch (lookupError) {
        console.error("[Visitor] Duplicate recovery lookup failed", lookupError);
      }
    }
    if (!doc) {
      console.error("[Visitor] MongoDB save failed", safeDbErrorMessage(error));
      return NextResponse.json({ error: "Unable to save registration." }, { status: 503 });
    }
  }

  if (!doc) return NextResponse.json({ error: "Registration unavailable" }, { status: 503 });

  // Same session always resolves to the persisted reference ID; no duplicates.
  await markDraftSubmitted(effectiveDraftId, doc.referenceId);

  // Existing registrations must also retry Sheets, not early-return before it.
  const sheets = await syncSheet(doc);

  // Emails only for newly created submitted registrations; no repeat emails on retry.
  if (created && isEmailConfigured()) {
    try {
      await sendVisitorRegistrationEmails({ ...data, referenceId: doc.referenceId });
      await VisitorRegistration.updateOne(
        { referenceId: doc.referenceId },
        { $set: { emailStatus: "sent" } },
      );
    } catch (error) {
      console.error("[Visitor] Email failed", error);
      await VisitorRegistration.updateOne(
        { referenceId: doc.referenceId },
        { $set: { emailStatus: "failed" } },
      ).catch(console.error);
    }
  }

  return NextResponse.json({
    success: true,
    referenceId: doc.referenceId,
    alreadyRegistered,
    sheets,
    sessionResetRequired,
  });
}
