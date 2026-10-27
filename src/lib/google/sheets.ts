import "server-only";
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

const SPREADSHEET_SCOPE = "https://www.googleapis.com/auth/spreadsheets";

export function isSheetsConfigured(): boolean {
  return Boolean(process.env.GOOGLE_SHEET_ID && process.env.GOOGLE_CREDENTIALS_BASE64);
}

function sheetClient() {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const encoded = process.env.GOOGLE_CREDENTIALS_BASE64;
  if (!spreadsheetId || !encoded) {
    throw new Error("Google Sheets credentials are not configured");
  }

  let credentials: Record<string, unknown>;
  try {
    credentials = JSON.parse(Buffer.from(encoded, "base64").toString("utf8")) as Record<string, unknown>;
  } catch {
    throw new Error("Invalid GOOGLE_CREDENTIALS_BASE64 JSON");
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: [SPREADSHEET_SCOPE],
  });
  return {
    spreadsheetId,
    sheets: google.sheets({ version: "v4", auth }),
  };
}

function dateInDhaka(): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hour12: false, timeZone: "Asia/Dhaka",
  }).format(new Date());
}

function clean(value: string | undefined): string {
  const s = (value ?? "").trim();
  // Google Sheets valueInputOption is RAW, so inputs are never parsed as formulas.
  return s;
}

function rowValues(row: SheetRow, internalKey = ""): string[] {
  const source = row.infoGetFrom ||
    (row.utmSource ? `UTM: ${row.utmSource}` : "") ||
    row.landingPage || "Direct Website";

  return [
    dateInDhaka(), "Website", clean(row.registerAs || row.type || "Website Enquiry"),
    clean(row.companyName || row.company),
    clean(row.contactPerson || row.name),
    clean(row.designation), clean(row.emailId || row.email),
    clean(row.mobileNo || row.mobile || row.phone),
    clean(row.website), clean(row.address || row.city), clean(row.country),
    clean(row.boothSizeRequirement), clean(row.areaOfInterest || row.productInterest),
    clean(source), clean(row.message), clean(internalKey),
  ];
}

/** Preserve the current sheet's A:Y layout and existing append-only callers. */
export async function appendLeadRow(_tabIgnored: string, row: SheetRow): Promise<void> {
  const { sheets, spreadsheetId } = sheetClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `'${TARGET_TAB_NAME}'!A:Y`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [[...rowValues(row), ...Array<string>(9).fill("")]] },
  });
}

/**
 * Uses column P as the unique lead key. Does not modify Q:Y staff status columns.
 * Draft and submitted records MUST use the SAME key to update one row.
 * Concurrency limitation: Sheets API has no unique-constraint/transactional upsert.
 */
export async function upsertLeadRow(key: string, row: SheetRow): Promise<void> {
  if (!/^(DRAFT|EXHIBITOR|VISITOR):[A-Za-z0-9_-]{3,100}$/.test(key)) {
    throw new Error("Invalid lead key");
  }

  const { sheets, spreadsheetId } = sheetClient();
  const range = `'${TARGET_TAB_NAME}'!P2:P`;
  const result = await sheets.spreadsheets.values.get({ spreadsheetId, range });
  const rows: string[][] = result.data.values ?? [];
  const rowOffset = rows.findIndex((entry) => entry?.[0] === key);
  const values = rowValues(row, key);

  if (rowOffset !== -1) {
    const rowNumber = rowOffset + 2;
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `'${TARGET_TAB_NAME}'!A${rowNumber}:P${rowNumber}`,
      valueInputOption: "RAW",
      requestBody: { values: [values] },
    });
    return;
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `'${TARGET_TAB_NAME}'!A:Y`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [[...values, ...Array<string>(9).fill("")]] },
  });
}

export async function upsertExhibitorLeadRow(key: string, row: SheetRow): Promise<void> {
  if (!/^(DRAFT:[a-f0-9-]{36}|EXHIBITOR:[A-Za-z0-9_-]{3,80})$/i.test(key)) {
    throw new Error("Invalid exhibitor key");
  }
  return upsertLeadRow(key, row);
}
