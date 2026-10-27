import { sendMail, getNotificationRecipients } from "./mailer";
import { organiserNotificationEmail, userAcknowledgementEmail } from "./templates";
import type { ExhibitorEnquiryInput } from "@/lib/validation/exhibitorEnquiry";

/** Replace ONLY the exhibitor email function in existing sendLeadEmails.ts. */
export async function sendExhibitorEnquiryEmails(
  data: ExhibitorEnquiryInput & { referenceId: string },
) {
  const recipients = getNotificationRecipients();
  if (recipients.length > 0) {
    await sendMail({
      to: recipients,
      subject: `New Exhibitor Enquiry – ${data.companyName} – ${data.referenceId}`,
      html: organiserNotificationEmail({
        heading: "New Exhibitor Enquiry",
        referenceId: data.referenceId,
        rows: [
          { label: "Company Name", value: data.companyName },
          { label: "Contact Person", value: data.contactPerson },
          { label: "Designation", value: data.designation },
          { label: "Mobile / WhatsApp", value: data.mobile },
          { label: "Email", value: data.email },
          { label: "Country", value: data.country },
          { label: "Products & Services", value: data.productsServices },
          { label: "Preferred Booth Size", value: data.preferredBoothSize || "Not specified" },
        ],
      }),
    });
  }

  await sendMail({
    to: data.email,
    subject: `We've received your exhibitor enquiry – ${data.referenceId}`,
    html: userAcknowledgementEmail({
      greetingName: data.contactPerson,
      heading: "Exhibitor Enquiry Received",
      bodyText:
        "Thank you for your interest in exhibiting at Bangladesh Buildcon International Expo. Our team has received your enquiry and will contact you with participation details.",
      referenceId: data.referenceId,
    }),
  });
}
