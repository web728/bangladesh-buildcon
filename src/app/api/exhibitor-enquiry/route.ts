import { NextRequest, NextResponse } from "next/server";
import { exhibitorEnquirySchema } from "@/lib/validation/exhibitorEnquiry";
import { MIN_SUBMIT_MS } from "@/lib/validation/shared";
import { connectToDatabase, safeDbErrorMessage } from "@/lib/db/mongodb";
import { ExhibitorEnquiry } from "@/models/ExhibitorEnquiry";
import { generateReferenceId } from "@/lib/utils/referenceId";
import { isRateLimited, getClientIp } from "@/lib/utils/rateLimit";
import { appendLeadRow, isSheetsConfigured } from "@/lib/google/sheets";
import { sendExhibitorEnquiryEmails } from "@/lib/email/sendLeadEmails";
import { isEmailConfigured } from "@/lib/email/mailer";

// Google reCAPTCHA v2 Server Verification
async function verifyRecaptcha(token: string) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    console.warn("RECAPTCHA_SECRET_KEY missing. Skipping recaptcha verification.");
    return true;
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
  if (isRateLimited(`exhibitor:${ip}`)) {
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

  // 1. Verify Google reCAPTCHA v2
  const recaptchaToken = String(body.recaptchaToken || body["g-recaptcha-response"] || "");
  if (process.env.RECAPTCHA_SECRET_KEY) {
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: "Please verify that you are not a robot." },
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

  // 2. Validate incoming data
  const parsed = exhibitorEnquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the highlighted fields.", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // Honeypot + speed check
  if (data.website_hp || (data.startedAt && Date.now() - data.startedAt < MIN_SUBMIT_MS)) {
    return NextResponse.json({ success: true, referenceId: generateReferenceId("TBEX") });
  }

  const referenceId = generateReferenceId("TBEX");

  // 3. Save to MongoDB
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error("Database connection unavailable");

    await ExhibitorEnquiry.create({
          referenceId,
      companyName: data.companyName,
      country: data.country,
      city: data.city,
      website: data.website || undefined,
      companyType: data.companyType,
      firstName: data.firstName,
      lastName: data.lastName,
      designation: data.designation,
      email: data.email,
      mobile: data.mobile,
      productCategory: data.productCategory,
      productsServices: data.productsServices,
      preferredParticipation: data.preferredParticipation,
      requiredArea: data.requiredArea,
      existingBusinessInBangladesh: data.existingBusinessInBangladesh || undefined,
      lookingForDistributor: data.lookingForDistributor || undefined,
      message: data.message,
      utm: data.utm,
      landingPage: data.landingPage,
      userAgent: req.headers.get("user-agent") || undefined,
    });
  } catch (err) {
    console.error("ExhibitorEnquiry save failed:", safeDbErrorMessage(err));
    return NextResponse.json(
      { error: "We couldn't save your enquiry right now. Please try again in a moment." },
      { status: 503 }
    );
  }

  // 4. Save to Same Google Sheet (Tab: "Exhibitor Enquiries")
  if (isSheetsConfigured()) {
    try {
      await appendLeadRow("Website Enquiries", {
            referenceId,
        registerAs: "Exhibitor Enquiry",
        name: `${data.firstName} ${data.lastName}`,
        company: data.companyName,
        designation: data.designation,
        country: data.country,
        city: data.city ?? "",
        email: data.email,
        phone: data.mobile,
        type: data.companyType,
        productInterest: data.productCategory,
        message: data.productsServices,
        utmSource: data.utm?.source ?? "",
        utmMedium: data.utm?.medium ?? "",
        utmCampaign: data.utm?.campaign ?? "",
        landingPage: data.landingPage ?? "",
      });
      await ExhibitorEnquiry.updateOne({ referenceId }, { sheetsSyncStatus: "synced" });
    } catch (err) {
      console.error("Sheets sync failed", err);
      await ExhibitorEnquiry.updateOne({ referenceId }, { sheetsSyncStatus: "failed" }).catch(() => {});
    }
  }

  // 5. Send Notification Email to BOTH Organisers (Futurex & ASK Trade & Exhibitions Pvt. Ltd.)
  if (isEmailConfigured()) {
    try {
      await sendExhibitorEnquiryEmails({ ...data, referenceId });
      await ExhibitorEnquiry.updateOne({ referenceId }, { emailStatus: "sent" });
    } catch (err) {
      console.error("Exhibitor enquiry email failed", err);
      await ExhibitorEnquiry.updateOne({ referenceId }, { emailStatus: "failed" }).catch(() => {});
    }
  }

  return NextResponse.json({ success: true, referenceId });
}
