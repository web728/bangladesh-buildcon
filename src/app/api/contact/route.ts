import { NextRequest, NextResponse } from "next/server";
import { contactEnquirySchema } from "@/lib/validation/contactEnquiry";
import { MIN_SUBMIT_MS } from "@/lib/validation/shared";
import { connectToDatabase, safeDbErrorMessage } from "@/lib/db/mongodb";
import { ContactEnquiry } from "@/models/ContactEnquiry";
import { generateReferenceId } from "@/lib/utils/referenceId";
import { isRateLimited, getClientIp } from "@/lib/utils/rateLimit";
import { appendLeadRow, isSheetsConfigured } from "@/lib/google/sheets";
import { sendContactEnquiryEmails } from "@/lib/email/sendLeadEmails";
import { isEmailConfigured } from "@/lib/email/mailer";

// Helper to verify Google reCAPTCHA v2
async function verifyRecaptcha(token: string) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    console.warn("RECAPTCHA_SECRET_KEY is not defined. Skipping verification.");
    return true; // dev fallback
  }

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secretKey}&response=${token}`,
    });
    const result = await res.json();
    return result.success === true;
  } catch (err) {
    console.error("Recaptcha verification failed:", err);
    return false;
  }
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  if (isRateLimited(`contact:${ip}`)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    const parsedBody: unknown = await req.json();
    if (!parsedBody || typeof parsedBody !== "object" || Array.isArray(parsedBody)) {
      throw new Error("Invalid request body");
    }
    body = parsedBody as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // 1. Verify reCAPTCHA token if provided in body
  const recaptchaToken = String(body.recaptchaToken || body["g-recaptcha-response"] || "");
  if (process.env.RECAPTCHA_SECRET_KEY) {
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: "Please complete the reCAPTCHA verification." },
        { status: 400 }
      );
    }
    const isHuman = await verifyRecaptcha(recaptchaToken);
    if (!isHuman) {
      return NextResponse.json(
        { error: "reCAPTCHA verification failed. Please try again." },
        { status: 400 }
      );
    }
  }

  const parsed = contactEnquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the highlighted fields.", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // Honeypot & bot speed check
  if (data.website_hp || (data.startedAt && Date.now() - data.startedAt < MIN_SUBMIT_MS)) {
    return NextResponse.json({ success: true, referenceId: generateReferenceId("TBCN") });
  }

  const referenceId = generateReferenceId("TBCN");

  // Save to MongoDB
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error("Database connection unavailable");

    await ContactEnquiry.create({
         referenceId,
      name: data.name,
      company: data.company,
      designation: data.designation,
      country: data.country,
      email: data.email,
      mobile: data.mobile,
      interest: data.interest,
      message: data.message,
      utm: data.utm,
      landingPage: data.landingPage,
      userAgent: req.headers.get("user-agent") || undefined,
    });
  } catch (err) {
    console.error("ContactEnquiry save failed:", safeDbErrorMessage(err));
    return NextResponse.json(
      { error: "We couldn't send your message right now. Please try again in a moment." },
      { status: 503 }
    );
  }

  // 2. Google Sheets sync check
  if (isSheetsConfigured()) {
    try {
      await appendLeadRow("Website Enquiries", {
        referenceId,
        registerAs: "Contact Form",
        name: data.name,
        company: data.company,
        designation: data.designation ?? "",
        country: data.country,
        city: "",
        email: data.email,
        phone: data.mobile,
        type: data.interest,
        productInterest: "",
        message: data.message,
        utmSource: data.utm?.source ?? "",
        utmMedium: data.utm?.medium ?? "",
        utmCampaign: data.utm?.campaign ?? "",
        landingPage: data.landingPage ?? "",
      });
      await ContactEnquiry.updateOne({ referenceId }, { sheetsSyncStatus: "synced" });
    } catch (err) {
      console.error("Sheets sync failed", err);
      await ContactEnquiry.updateOne({ referenceId }, { sheetsSyncStatus: "failed" }).catch(() => {});
    }
  }

  // 3. Send email notifications to both configured organiser recipients.
  if (isEmailConfigured()) {
    try {
      await sendContactEnquiryEmails({ ...data, referenceId });
      await ContactEnquiry.updateOne({ referenceId }, { emailStatus: "sent" });
    } catch (err) {
      console.error("Contact enquiry email failed", err);
      await ContactEnquiry.updateOne({ referenceId }, { emailStatus: "failed" }).catch(() => {});
    }
  }

  return NextResponse.json({ success: true, referenceId });
}
