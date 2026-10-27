import { google } from "googleapis";
import { TARGET_TAB_NAME } from "@/lib/google/sheets";

export type VisitorSheetLead = {
  referenceId: string;
  registerAs: string;
  fullName: string;
  company: string;
  designation: string;
  mobile: string;
  email: string;
  businessCategory: string;
  country: string;
  landingPage?: string;
  status: "Draft - Not Submitted" | "Submitted";
};

function sheetClient() {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const encoded = process.env.GOOGLE_CREDENTIALS_BASE64;
  if (!sheetId || !encoded) throw new Error("Google Sheets credentials not configured");
  const credentials = JSON.parse(Buffer.from(encoded, "base64").toString("utf8"));
  return { sheetId, sheets: google.sheets({ version: "v4", auth: new google.auth.GoogleAuth({ credentials, scopes: ["https://www.googleapis.com/auth/spreadsheets"] }) }) };
}
function clean(v: string | undefined) {
  // Avoid formulas being interpreted when a user enters spreadsheet operators.
  const s = (v ?? "").trim();
  return /^[=+\-@\t\r]/.test(s) ? `'${s}` : s;
}
function rowValues(row: VisitorSheetLead, key: string) {
  const date = new Intl.DateTimeFormat("en-GB", { dateStyle: "short", timeStyle: "medium", timeZone: "Asia/Dhaka" }).format(new Date());
  return [
    date, "Website", clean(row.registerAs), clean(row.company), clean(row.fullName),
    clean(row.designation), clean(row.email), clean(row.mobile), "", "", clean(row.country),
    "", clean(row.businessCategory), clean(row.landingPage || "Direct Website"), clean(row.status), key,
  ];
}
/** Update the same draft/final row by key in column P; preserves staff statuses Q:Y. */
export async function upsertVisitorLeadRow(key: string, row: VisitorSheetLead) {
  if (!/^VISITOR:(?:[0-9a-f-]{36}|TBVR[A-Za-z0-9_-]{3,80})$/i.test(key)) throw new Error("Invalid visitor row key");
  const { sheetId, sheets } = sheetClient();
  const existing = await sheets.spreadsheets.values.get({ spreadsheetId: sheetId, range: `'${TARGET_TAB_NAME}'!P2:P` });
  const index = (existing.data.values || []).findIndex((cells) => cells[0] === key);
  const values = rowValues(row, key);
  if (index >= 0) {
    await sheets.spreadsheets.values.update({ spreadsheetId: sheetId, range: `'${TARGET_TAB_NAME}'!A${index + 2}:P${index + 2}`, valueInputOption: "RAW", requestBody: { values: [values] } });
  } else {
    await sheets.spreadsheets.values.append({ spreadsheetId: sheetId, range: `'${TARGET_TAB_NAME}'!A:Y`, valueInputOption: "RAW", insertDataOption: "INSERT_ROWS", requestBody: { values: [[...values, ...Array(9).fill("")]] } });
  }
}
