import { google } from "googleapis";

export const TARGET_TAB_NAME = "Website Enquiries";
export const SHEET_COLUMNS = [
  "Date & Time", "Platform", "Register As", "Company Name",
  "Contact Person", "Designation", "Email Id", "Mobile No.",
  "Website", "Address", "Country", "Booth Size Requirement",
  "Area of Interest", "Info. Get From", "Message", "Correction",
  "STATUS 1", "STATUS 2", "STATUS 3", "STATUS 4", "STATUS 5",
  "STATUS 6", "STATUS 7", "STATUS 8", "STATUS 9",
] as const;

export type SheetRow = {
  referenceId?: string;
  type?: string;
  registerAs?: string;
  name?: string;
  contactPerson?: string;
  company?: string;
  companyName?: string;
  designation?: string;
  email?: string;
  emailId?: string;
  phone?: string;
  mobile?: string;
  mobileNo?: string;
  website?: string;
  address?: string;
  city?: string;
  country?: string;
  boothSizeRequirement?: string;
  productInterest?: string;
  areaOfInterest?: string;
  message?: string;
  infoGetFrom?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  landingPage?: string;
};

function credentials() {
  const encoded = process.env.GOOGLE_CREDENTIALS_BASE64;
  if (!encoded) throw new Error("Google Sheets credentials missing");
  return JSON.parse(Buffer.from(encoded, "base64").toString("utf8"));
}

export function isSheetsConfigured() {
  return Boolean(process.env.GOOGLE_SHEET_ID && process.env.GOOGLE_CREDENTIALS_BASE64);
}

function client() {
  if (!isSheetsConfigured()) throw new Error("Google Sheets is not configured");
  const auth = new google.auth.GoogleAuth({
    credentials: credentials(),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

function formatCurrentDateTime() {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hour12: false, timeZone: "Asia/Dhaka",
  }).format(new Date());
}

function rowValues(row: SheetRow, internalKey = "") {
  const source = row.infoGetFrom ||
    (row.utmSource ? `UTM: ${row.utmSource}` : "") ||
    row.landingPage || "Direct Website";
  return [
    formatCurrentDateTime(),
    "Website",
    row.registerAs || row.type || "Website Enquiry",
    row.companyName || row.company || "",
    row.contactPerson || row.name || "",
    row.designation || "",
    row.emailId || row.email || "",
    row.mobileNo || row.mobile || row.phone || "",
    row.website || "",
    row.address || row.city || "",
    row.country || "",
    row.boothSizeRequirement || "",
    row.areaOfInterest || row.productInterest || "",
    source,
    row.message || "",
    internalKey,
  ];
}

/** Existing API stays intact for visitor/contact/partner forms. */
export async function appendLeadRow(_tabIgnored: string, row: SheetRow): Promise<void> {
  if (!isSheetsConfigured()) throw new Error("Google Sheets is not configured");
  const sheets = client();
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: `'${TARGET_TAB_NAME}'!A:Y`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [[...rowValues(row), ...Array(9).fill("")]] },
  });
}

/**
 * Idempotency key is written to the existing Correction column (P).
 * A previously saved draft row can be UPDATED when the final form submits.
 * Columns Q:Y are never overwritten, preserving staff status notes.
 *
 * IMPORTANT: concurrent writers or a crash before the append response can
 * still race. For strict exactly-once use a single durable sync worker and
 * reconcile the P column; Google Sheets is not a transactional database.
 */
export async function upsertExhibitorLeadRow(key: string, row: SheetRow): Promise<void> {
  if (!/^(DRAFT:[a-f0-9-]{36}|EXHIBITOR:[A-Za-z0-9_-]{3,80})$/i.test(key)) {
    throw new Error("Invalid Sheet lead key");
  }
  const sheets = client();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID!;
  const found = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `'${TARGET_TAB_NAME}'!P2:P`,
  });
  const keys = found.data.values || [];
  const index = keys.findIndex((cells) => cells[0] === key);
  const values = rowValues(row, key);
  if (index >= 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `'${TARGET_TAB_NAME}'!A${index + 2}:P${index + 2}`,
      valueInputOption: "RAW",
      requestBody: { values: [values] },
    });
  } else {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `'${TARGET_TAB_NAME}'!A:Y`,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [[...values, ...Array(9).fill("")]] },
    });
  }
}
