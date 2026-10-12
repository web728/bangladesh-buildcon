// Ensures the operational Google Sheet has the expected tabs and header
// row for each lead type. Safe to re-run — never deletes existing data.
// Run with: npm run setup:sheets

import { google } from "googleapis";

const { GOOGLE_SHEET_ID, GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY } = process.env;

if (!GOOGLE_SHEET_ID || !GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
  console.error("GOOGLE_SHEET_ID, GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY must all be set.");
  process.exit(1);
}

const HEADERS = [
  "Reference ID", "Date", "Time", "Name", "Company", "Designation", "Country", "City",
  "Email", "Phone", "Type", "Product Interest", "Message", "UTM Source", "UTM Medium",
  "UTM Campaign", "Landing Page", "Status",
];

const TABS = ["Exhibitor Enquiries", "Visitor Registrations", "Partner Enquiries", "Contact Enquiries", "Newsletter"];

const auth = new google.auth.GoogleAuth({
  credentials: { client_email: GOOGLE_CLIENT_EMAIL, private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n") },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

async function main() {
  const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId: GOOGLE_SHEET_ID });
  const existingTitles = new Set(spreadsheet.data.sheets?.map((s) => s.properties?.title) ?? []);

  const tabsToCreate = TABS.filter((t) => !existingTitles.has(t));
  if (tabsToCreate.length > 0) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: GOOGLE_SHEET_ID,
      requestBody: {
        requests: tabsToCreate.map((title) => ({ addSheet: { properties: { title } } })),
      },
    });
    console.log("Created tabs:", tabsToCreate.join(", "));
  }

  for (const tab of TABS) {
    const existing = await sheets.spreadsheets.values.get({ spreadsheetId: GOOGLE_SHEET_ID, range: `${tab}!A1:R1` });
    if (!existing.data.values || existing.data.values.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: `${tab}!A1`,
        valueInputOption: "RAW",
        requestBody: { values: [HEADERS] },
      });
      console.log(`Wrote header row to ${tab}`);
    } else {
      console.log(`${tab} already has a header row — left unchanged`);
    }
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
