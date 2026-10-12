import nodemailer, { type Transporter } from "nodemailer";

const {
  MAIL_FROM_NAME = "Bangladesh Buildcon",
  MAIL_FROM_EMAIL,
  MAIL_USER,
  MAIL_APP_PASSWORD,
  MAIL_CLIENT_ID,
  MAIL_CLIENT_SECRET,
  MAIL_REFRESH_TOKEN,
} = process.env;

let cachedTransporter: Transporter | null | undefined;

/**
 * Builds (and caches) a Nodemailer transporter. Prefers Gmail OAuth2 when
 * client credentials + refresh token are present, falling back to an App
 * Password. Returns null when neither is configured, so callers can skip
 * sending in local/dev environments without throwing.
 */
export function getTransporter(): Transporter | null {
  if (cachedTransporter !== undefined) return cachedTransporter;

  if (!MAIL_USER) {
    cachedTransporter = null;
    return cachedTransporter;
  }

  if (MAIL_CLIENT_ID && MAIL_CLIENT_SECRET && MAIL_REFRESH_TOKEN) {
    cachedTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: MAIL_USER,
        clientId: MAIL_CLIENT_ID,
        clientSecret: MAIL_CLIENT_SECRET,
        refreshToken: MAIL_REFRESH_TOKEN,
      },
    });
    return cachedTransporter;
  }

  if (MAIL_APP_PASSWORD) {
    cachedTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: MAIL_USER, pass: MAIL_APP_PASSWORD },
    });
    return cachedTransporter;
  }

  cachedTransporter = null;
  return cachedTransporter;
}

export function isEmailConfigured(): boolean {
  return getTransporter() !== null;
}

export function getFromAddress(): string {
  return `"${MAIL_FROM_NAME}" <${MAIL_FROM_EMAIL || MAIL_USER || "no-reply@bangladeshbuildcon.com"}>`;
}

export function getNotificationRecipients(): string[] {
  return [process.env.FORM_NOTIFICATION_EMAIL_1, process.env.FORM_NOTIFICATION_EMAIL_2].filter(
    (email): email is string => Boolean(email),
  );
}

export async function sendMail(options: { to: string | string[]; subject: string; html: string }): Promise<void> {
  const transporter = getTransporter();
  if (!transporter) return; // Not configured — no-op in dev.

  await transporter.sendMail({
    from: getFromAddress(),
    to: options.to,
    subject: options.subject,
    html: options.html,
  });
}
