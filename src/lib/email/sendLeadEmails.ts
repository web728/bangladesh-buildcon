
import { sendMail, getNotificationRecipients } from "./mailer";
import {
  organiserNotificationEmail,
  userAcknowledgementEmail,
} from "./templates";

import type { ExhibitorEnquiryInput } from "@/lib/validation/exhibitorEnquiry";
import type { VisitorRegistrationInput } from "@/lib/validation/visitorRegistration";
import type { ContactEnquiryInput } from "@/lib/validation/contactEnquiry";
import type { PartnerEnquiryInput } from "@/lib/validation/partnerEnquiry";
import type { BrochureDownloadInput } from "@/lib/validation/brochureDownload";

/* ==========================================
   PREMIUM EMAIL TEMPLATE
========================================== */

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function displayValue(value: unknown): string {
  const text = String(value ?? "").trim();
  return text ? escapeHtml(text) : "Not specified";
}

type EmailRow = {
  label: string;
  value?: unknown;
};

function premiumEmail({
  eyebrow,
  heading,
  intro,
  rows = [],
  closing,
}: {
  eyebrow: string;
  heading: string;
  intro: string;
  rows?: EmailRow[];
  closing?: string;
}): string {
  const details = rows.length
    ? `
      <table
        role="presentation"
        cellpadding="0"
        cellspacing="0"
        width="100%"
        style="border-collapse:collapse;margin:28px 0 8px;"
      >
        ${rows
          .map(
            ({ label, value }) => `
              <tr>
                <td
                  style="
                    padding:13px 10px 13px 0;
                    border-bottom:1px solid #e9eaf0;
                    color:#697080;
                    font:500 13px Arial,sans-serif;
                    vertical-align:top;
                    width:40%;
                  "
                >
                  ${escapeHtml(label)}
                </td>

                <td
                  style="
                    padding:13px 0;
                    border-bottom:1px solid #e9eaf0;
                    color:#101521;
                    font:600 14px/1.5 Arial,sans-serif;
                    vertical-align:top;
                    overflow-wrap:anywhere;
                  "
                >
                  ${displayValue(value)}
                </td>
              </tr>
            `,
          )
          .join("")}
      </table>
    `
    : "";

  return `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta
    name="viewport"
    content="width=device-width,initial-scale=1"
  />
  <title>${escapeHtml(heading)}</title>
</head>

<body
  style="
    margin:0;
    padding:0;
    background:#f5f6f9;
    font-family:Arial,Helvetica,sans-serif;
    color:#101521;
  "
>
  <table
    role="presentation"
    cellpadding="0"
    cellspacing="0"
    width="100%"
    style="background:#f5f6f9;"
  >
    <tr>
      <td align="center" style="padding:40px 16px;">

        <table
          role="presentation"
          cellpadding="0"
          cellspacing="0"
          width="100%"
          style="
            max-width:620px;
            background:#ffffff;
            border:1px solid #e9eaf0;
            border-radius:12px;
          "
        >
          <tr>
            <td
              style="
                height:5px;
                background:#ba1d82;
                font-size:0;
                line-height:0;
              "
            >&nbsp;</td>
          </tr>

          <tr>
            <td style="padding:36px 38px 28px;">

              <div
                style="
                  font:700 12px/1.4 Arial,sans-serif;
                  letter-spacing:2px;
                  text-transform:uppercase;
                  color:#304090;
                "
              >
                BANGLADESH BUILDCON
              </div>

              <div
                style="
                  margin-top:8px;
                  font:500 13px/1.6 Arial,sans-serif;
                  color:#6d7380;
                "
              >
                International Expo 2027
              </div>

              <div
                style="
                  margin-top:34px;
                  font:700 11px/1.6 Arial,sans-serif;
                  letter-spacing:1.5px;
                  text-transform:uppercase;
                  color:#ba1d82;
                "
              >
                ${escapeHtml(eyebrow)}
              </div>

              <h1
                style="
                  font:700 28px/1.25 Arial,sans-serif;
                  color:#111827;
                  margin:10px 0 15px;
                "
              >
                ${escapeHtml(heading)}
              </h1>

              <p
                style="
                  font:400 15px/1.8 Arial,sans-serif;
                  color:#515a69;
                  margin:0;
                "
              >
                ${escapeHtml(intro)}
              </p>

              ${details}

              ${
                closing
                  ? `
                    <p
                      style="
                        font:400 14px/1.8 Arial,sans-serif;
                        color:#515a69;
                        margin:28px 0 0;
                      "
                    >
                      ${escapeHtml(closing)}
                    </p>
                  `
                  : ""
              }

            </td>
          </tr>

          <tr>
            <td
              style="
                padding:23px 38px;
                background:#fafafb;
                border-top:1px solid #eceef2;
              "
            >
              <div
                style="
                  font:700 12px/1.5 Arial,sans-serif;
                  color:#304090;
                "
              >
                11–13 November 2027
                &nbsp;·&nbsp;
                ICCB Expo Village, Dhaka
              </div>

              <div
                style="
                  font:400 11px/1.7 Arial,sans-serif;
                  color:#7d8491;
                  margin-top:6px;
                "
              >
                Bangladesh Buildcon International Expo 2027
              </div>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/* ==========================================
   1. EXHIBITOR ENQUIRY EMAILS
========================================== */

export async function sendExhibitorEnquiryEmails(
  data: ExhibitorEnquiryInput & {
    referenceId: string;
  },
): Promise<void> {
  const recipients = getNotificationRecipients();

  // Organiser notification
  if (recipients.length > 0) {
    await sendMail({
      to: recipients,

      subject: `New Exhibitor Enquiry | ${data.companyName}`,

      html: premiumEmail({
        eyebrow: "New Exhibitor Enquiry",

        heading: "New exhibitor enquiry",

        intro:
          "A new exhibitor enquiry has been received through the Bangladesh Buildcon website. The submitted details are provided below.",

        rows: [
          {
            label: "Company Name",
            value: data.companyName,
          },
          {
            label: "Contact Person",
            value: data.contactPerson,
          },
          {
            label: "Designation",
            value: data.designation,
          },
          {
            label: "Mobile / WhatsApp",
            value: data.mobile,
          },
          {
            label: "Email",
            value: data.email,
          },
          {
            label: "Country",
            value: data.country,
          },
          {
            label: "Products & Services",
            value: data.productsServices,
          },
          {
            label: "Preferred Booth Size",
            value: data.preferredBoothSize,
          },
        ],

        closing:
          "Please review this enquiry and contact the prospective exhibitor regarding participation opportunities.",
      }),
    });
  }

  // Exhibitor acknowledgement
  await sendMail({
    to: data.email,

    subject:
      "Your Exhibitor Enquiry Has Been Received | Bangladesh Buildcon 2027",

    html: premiumEmail({
      eyebrow: "Enquiry Received",

      heading: `Thank you, ${data.contactPerson}`,

      intro:
        "We have received your interest in exhibiting at Bangladesh Buildcon International Expo 2027. Our exhibition team will review your requirements and contact you regarding participation opportunities.",

      closing:
        "We look forward to welcoming your company to Bangladesh Buildcon International Expo 2027.",
    }),
  });
}

/* ==========================================
   2. VISITOR REGISTRATION EMAILS
========================================== */

export async function sendVisitorRegistrationEmails(
  data: VisitorRegistrationInput & {
    referenceId: string;
  },
): Promise<void> {
  const recipients = getNotificationRecipients();

  // Organiser notification
  if (recipients.length > 0) {
    await sendMail({
      to: recipients,

      subject: `New Visitor Registration | ${data.fullName}`,

      html: premiumEmail({
        eyebrow: "New Visitor Registration",

        heading: "New visitor registration",

        intro:
          "A visitor has registered for Bangladesh Buildcon International Expo 2027. The submitted registration details are provided below.",

        rows: [
          {
            label: "Full Name",
            value: data.fullName,
          },
          {
            label: "Company / Organisation",
            value: data.company,
          },
          {
            label: "Designation",
            value: data.designation,
          },
          {
            label: "Mobile / WhatsApp",
            value: data.mobile,
          },
          {
            label: "Email",
            value: data.email,
          },
          {
            label: "Business / Category",
            value: data.businessCategory,
          },
          {
            label: "Country",
            value: data.country,
          },
        ],

        closing:
          "The visitor registration has been recorded. Please follow up if any additional information is required.",
      }),
    });
  }

  // Visitor acknowledgement
  await sendMail({
    to: data.email,

    subject:
      "Your Visitor Registration Has Been Received | Bangladesh Buildcon 2027",

    html: premiumEmail({
      eyebrow: "Registration Received",

      heading: `Thank you, ${data.fullName}`,

      intro:
        "Thank you for registering to visit Bangladesh Buildcon International Expo 2027. We have received your registration details and look forward to welcoming you to the event.",

      closing:
        "Please stay tuned for official exhibition announcements and visitor information closer to the event.",
    }),
  });
}

/* ==========================================
   3. CONTACT ENQUIRY EMAILS
========================================== */

export async function sendContactEnquiryEmails(
  data: ContactEnquiryInput & {
    referenceId: string;
  },
): Promise<void> {
  const recipients = getNotificationRecipients();

  if (recipients.length > 0) {
    await sendMail({
      to: recipients,

      subject: `New Website Enquiry – ${data.name} – ${data.referenceId}`,

      html: organiserNotificationEmail({
        heading: "New Website Enquiry",
        referenceId: data.referenceId,

        rows: [
          { label: "Name", value: data.name },
          { label: "Company", value: data.company },
          { label: "Country", value: data.country },
          { label: "Email", value: data.email },
          { label: "Mobile / WhatsApp", value: data.mobile },
          { label: "Interest", value: data.interest },
          { label: "Message", value: data.message },
        ],
      }),
    });
  }

  await sendMail({
    to: data.email,

    subject: `We've received your enquiry – ${data.referenceId}`,

    html: userAcknowledgementEmail({
      greetingName: data.name,
      heading: "Enquiry Received",

      bodyText:
        "Thank you for contacting Bangladesh Buildcon International Expo. Our team will respond to your enquiry shortly.",

      referenceId: data.referenceId,
    }),
  });
}

/* ==========================================
   4. PARTNER ENQUIRY EMAILS
========================================== */

export async function sendPartnerEnquiryEmails(
  data: PartnerEnquiryInput & {
    referenceId: string;
  },
): Promise<void> {
  const recipients = getNotificationRecipients();

  if (recipients.length > 0) {
    await sendMail({
      to: recipients,

      subject: `New Partnership Enquiry – ${data.organisation} – ${data.referenceId}`,

      html: organiserNotificationEmail({
        heading: "New Partnership Enquiry",
        referenceId: data.referenceId,

        rows: [
          {
            label: "Organisation",
            value: data.organisation,
          },
          {
            label: "Type",
            value: data.organisationType,
          },
          {
            label: "Country",
            value: data.country,
          },
          {
            label: "Contact Person",
            value: data.contactPerson,
          },
          {
            label: "Email",
            value: data.email,
          },
          {
            label: "Phone",
            value: data.phone,
          },
          {
            label: "Nature of Enquiry",
            value: data.natureOfEnquiry,
          },
          {
            label: "Message",
            value: data.message,
          },
        ],
      }),
    });
  }

  await sendMail({
    to: data.email,

    subject: `We've received your partnership enquiry – ${data.referenceId}`,

    html: userAcknowledgementEmail({
      greetingName: data.contactPerson,
      heading: "Partnership Enquiry Received",

      bodyText:
        "Thank you for your interest in partnering with Bangladesh Buildcon International Expo. Our team will review your enquiry and respond shortly.",

      referenceId: data.referenceId,
    }),
  });
}

/* ==========================================
   5. BROCHURE DOWNLOAD EMAILS
========================================== */

export async function sendBrochureDownloadEmails(
  data: BrochureDownloadInput & {
    referenceId: string;
  },
): Promise<void> {
  const recipients = getNotificationRecipients();

  if (recipients.length > 0) {
    await sendMail({
      to: recipients,

      subject: `Brochure Download Request – ${data.name} (${data.company}) – ${data.referenceId}`,

      html: organiserNotificationEmail({
        heading: "New Brochure Download",
        referenceId: data.referenceId,

        rows: [
          { label: "Name", value: data.name },
          { label: "Company", value: data.company },
          { label: "Country", value: data.country },
          { label: "Email", value: data.email },
          { label: "Mobile / WhatsApp", value: data.mobile },
        ],
      }),
    });
  }

  await sendMail({
    to: data.email,

    subject: `Bangladesh Buildcon 2027 – Official Exhibition Brochure [${data.referenceId}]`,

    html: userAcknowledgementEmail({
      greetingName: data.name,
      heading: "Thank You for Downloading the Brochure",

      bodyText:
        "Thank you for your interest in Bangladesh Buildcon International Expo 2027. Your brochure download request has been received. Our exhibition sales team is available should you require custom space allocations or prime pavilion details.",

      referenceId: data.referenceId,
    }),
  });
}

/* ==========================================
   6. NEWSLETTER SUBSCRIPTION EMAILS
========================================== */

export async function sendNewsletterSubscriptionEmails(
  data: {
    email: string;
    country?: string;
    interest?: string[];
  },
): Promise<void> {
  const recipients = getNotificationRecipients();

  if (recipients.length > 0) {
    await sendMail({
      to: recipients,

      subject: `New Newsletter Subscriber – ${data.email}`,

      html: organiserNotificationEmail({
        heading: "New Newsletter Subscriber",
        referenceId: "NEWSLETTER",

        rows: [
          {
            label: "Subscriber Email",
            value: data.email,
          },
          {
            label: "Country",
            value: data.country || "Not specified",
          },
          {
            label: "Interests",
            value: data.interest?.length
              ? data.interest.join(", ")
              : "General Updates",
          },
        ],
      }),
    });
  }

  await sendMail({
    to: data.email,

    subject:
      "Subscription Confirmed – Bangladesh Buildcon International Expo 2027",

    html: userAcknowledgementEmail({
      greetingName: "Subscriber",

      heading: "Thank You for Subscribing",

      bodyText:
        "You have successfully subscribed to Bangladesh Buildcon International Expo updates. You will receive official trade announcements, floorplan releases, and exhibitor highlights directly in your inbox.",

      referenceId: "TBCN-NEWSLETTER",
    }),
  });
}
