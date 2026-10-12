import { event } from "@/config/event";

function baseLayout(bodyHtml: string): string {
  return `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${event.name}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#F2F5F8;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;color:#1E293B;-webkit-font-smoothing:antialiased;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F2F5F8;padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:600px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.01);border:1px solid #E2E8F0;">
            
            <!-- Header Section with Gradient Look -->
            <tr>
              <td style="background:#0F172A;padding:32px 40px;background-image:linear-gradient(to right, #0F172A, #1E293B);">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <span style="color:#C82028;font-weight:900;font-size:22px;letter-spacing:-0.5px;">Bangladesh</span>
                      <span style="color:#ffffff;font-weight:900;font-size:22px;letter-spacing:-0.5px;"> Buildcon</span>
                      <div style="color:#94A3B8;font-size:11px;margin-top:6px;letter-spacing:0.1em;text-transform:uppercase;font-weight:600;">
                        International Expo ${event.edition}
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Main Content Area -->
            <tr>
              <td style="padding:40px;">
                ${bodyHtml}
              </td>
            </tr>

            <!-- Footer Section -->
            <tr>
              <td style="background-color:#F8FAFC;padding:28px 40px;border-top:1px solid #F1F5F9;font-size:12px;line-height:1.6;color:#64748B;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <strong style="color:#334155;">${event.name}</strong><br />
                      📅 ${event.dates.display} &nbsp;•&nbsp; 📍 ${event.venue.fullLocation}<br />
                      🌐 <a href="https://${event.websiteDisplay}" style="color:#C82028;text-decoration:none;font-weight:600;" target="_blank">${event.websiteDisplay}</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function detailRow(label: string, value?: string | null): string {
  if (!value) return "";
  return `
  <tr>
    <td style="padding:10px 0;font-size:13px;color:#64748B;width:160px;vertical-align:top;border-bottom:1px solid #F1F5F9;font-weight:500;">${label}</td>
    <td style="padding:10px 0;font-size:13px;color:#0F172A;font-weight:600;border-bottom:1px solid #F1F5F9;">${value}</td>
  </tr>`;
}

export function organiserNotificationEmail(params: {
  heading: string;
  referenceId: string;
  rows: Array<{ label: string; value?: string | null }>;
}): string {
  const body = `
    <div style="display:inline-block;padding:4px 12px;background:#F5F5F6;color:#304090;border-radius:20px;font-size:12px;font-weight:700;margin-bottom:12px;letter-spacing:0.02em;">
      ADMIN NOTIFICATION
    </div>
    <h1 style="font-size:22px;font-weight:800;color:#0F172A;margin:0 0 6px;letter-spacing:-0.5px;">${params.heading}</h1>
    <p style="font-size:13px;color:#64748B;margin:0 0 24px;">Reference ID: <strong style="color:#C82028;">${params.referenceId}</strong></p>
    
    <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;padding:8px 20px;margin-bottom:10px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${params.rows.map((r) => detailRow(r.label, r.value)).join("")}
      </table>
    </div>
  `;
  return baseLayout(body);
}

export function userAcknowledgementEmail(params: {
  greetingName: string;
  heading: string;
  bodyText: string;
  referenceId: string;
}): string {
  const body = `
    <h1 style="font-size:22px;font-weight:800;color:#0F172A;margin:0 0 16px;letter-spacing:-0.5px;">${params.heading}</h1>
    <p style="font-size:15px;line-height:1.6;color:#334155;margin:0 0 12px;">Dear <strong>${params.greetingName}</strong>,</p>
    <p style="font-size:15px;line-height:1.6;color:#334155;margin:0 0 28px;">${params.bodyText}</p>
    
    <!-- Premium Reference Card -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg, #FFFFFF 0%, #F5F5F6 100%);border:1px solid #D8D8E0;border-radius:12px;margin:0 0 28px;">
      <tr>
        <td style="padding:20px;text-align:center;">
          <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#304090;font-weight:700;margin-bottom:4px;">Your Official Reference ID</div>
          <div style="font-size:26px;font-weight:900;color:#C82028;letter-spacing:1px;">${params.referenceId}</div>
        </td>
      </tr>
    </table>

    <!-- CTA Button -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr>
        <td align="center">
          <a href="https://${event.websiteDisplay}" target="_blank" style="display:inline-block;background-color:#C82028;color:#ffffff;font-size:14px;font-weight:700;padding:14px 28px;border-radius:8px;text-decoration:none;box-shadow:0 4px 6px -1px rgba(200, 32, 40, 0.3);">
            Visit Event Website
          </a>
        </td>
      </tr>
    </table>

    <p style="font-size:13px;line-height:1.6;color:#64748B;margin:0;border-top:1px dashed #E2E8F0;padding-top:20px;">
      This email confirms receipt of your submission. Our team will review your details and be in touch shortly regarding next steps.
    </p>
  `;
  return baseLayout(body);
}