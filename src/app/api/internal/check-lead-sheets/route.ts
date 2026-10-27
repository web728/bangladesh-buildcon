import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { isSheetsConfigured, TARGET_TAB_NAME } from "@/lib/google/sheets";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isSheetsConfigured())
    return NextResponse.json({ ok: false, issue: "GOOGLE_SHEET_ID or GOOGLE_CREDENTIALS_BASE64 not configured" }, { status: 503 });

  try {
    const credentials = JSON.parse(
      Buffer.from(process.env.GOOGLE_CREDENTIALS_BASE64!, "base64").toString("utf8"),
    ) as { client_email?: string; private_key?: string };
    if (!credentials.client_email || !credentials.private_key)
      return NextResponse.json({ ok: false, issue: "Invalid service-account credentials JSON" }, { status: 503 });
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      fields: "spreadsheetId,properties(title),sheets(properties(title))",
    });
    const tabs = spreadsheet.data.sheets?.map((tab) => tab.properties?.title || "") || [];
    const tabExists = tabs.includes(TARGET_TAB_NAME);
    return NextResponse.json({
      ok: tabExists,
      issue: tabExists ? null : `Tab '${TARGET_TAB_NAME}' not found`,
      sheetTitle: spreadsheet.data.properties?.title,
      tabExists,
      // This is a read-only API check. Edit access is tested by real save/retry.
      access: "read verified; edit permissions require write test",
    }, { status: tabExists ? 200 : 503 });
  } catch (error) {
    console.error("[Sheets check] Failed:", error);
    const message = error instanceof Error ? error.message : "Unknown Google Sheets error";
    return NextResponse.json({ ok: false, issue: message.slice(0, 350) }, { status: 503 });
  }
}
