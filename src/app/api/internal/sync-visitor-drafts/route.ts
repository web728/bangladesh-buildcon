import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { VisitorDraft } from "@/models/VisitorDraft";
import { VisitorRegistration } from "@/models/VisitorRegistration";
import { upsertVisitorLeadRow } from "@/lib/google/visitorLeadSheets";
import { isSheetsConfigured } from "@/lib/google/sheets";

export const runtime = "nodejs";
export const maxDuration = 60;

const BATCH_SIZE = 10; // Service-account per-minute Sheets quota protection.
const INACTIVE_MS = 60_000; // 1 minute since last input.
const LEASE_MS = 120_000;
const RETRY_MS = 5 * 60_000;

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isSheetsConfigured()) {
    return NextResponse.json({ error: "Google Sheets not configured" }, { status: 503 });
  }
  if (!(await connectToDatabase())) {
    return NextResponse.json({ error: "MongoDB unavailable" }, { status: 503 });
  }

  let synced = 0;
  let failed = 0;
  let skippedSubmitted = 0;
  const errors: string[] = [];

  for (let i = 0; i < BATCH_SIZE; i++) {
    const now = new Date();
    const draft = await VisitorDraft.findOneAndUpdate(
      {
        status: "draft",
        lastInputAt: { $lte: new Date(now.getTime() - INACTIVE_MS) },
        $or: [
          {
            sheetsSyncStatus: "pending",
            $or: [
              { sheetsLeaseUntil: { $exists: false } },
              { sheetsLeaseUntil: null },
              { sheetsLeaseUntil: { $lte: now } },
            ],
          },
          { sheetsSyncStatus: "processing", sheetsLeaseUntil: { $lte: now } },
        ],
      },
      {
        $set: { sheetsSyncStatus: "processing", sheetsLeaseUntil: new Date(now.getTime() + LEASE_MS) },
        $inc: { sheetsAttempts: 1 },
      },
      { new: true, sort: { lastInputAt: 1 } },
    );
    if (!draft) break;

    try {
      const registered = await VisitorRegistration.exists({ draftId: draft.draftId });
      if (!registered) {
        await upsertVisitorLeadRow(`VISITOR:${draft.draftId}`, {
          referenceId: "",
          registerAs: "Visitor Draft - Not Submitted",
          fullName: draft.fullName ?? "",
          company: draft.company ?? "",
          designation: draft.designation ?? "",
          mobile: draft.mobile ?? "",
          email: draft.email ?? "",
          businessCategory: draft.businessCategory ?? "",
          country: draft.country ?? "",
          landingPage: draft.landingPage ?? "",
          status: "Draft - Not Submitted",
        });
      } else {
        skippedSubmitted++;
      }

      // Only mark synced if no new field edits occurred while calling Sheets.
      const updated = await VisitorDraft.updateOne(
        {
          _id: draft._id, status: "draft", sheetsSyncStatus: "processing",
          lastInputAt: draft.lastInputAt, sheetsLeaseUntil: draft.sheetsLeaseUntil,
        },
        {
          $set: { sheetsSyncStatus: "synced", sheetsSyncedAt: new Date() },
          $unset: { sheetsLeaseUntil: 1, sheetsLastError: 1 },
        },
      );
      if (updated.modifiedCount === 0) {
        await VisitorDraft.updateOne(
          { _id: draft._id, status: "draft", sheetsSyncStatus: "processing", sheetsLeaseUntil: draft.sheetsLeaseUntil },
          { $set: { sheetsSyncStatus: "pending" }, $unset: { sheetsLeaseUntil: 1 } },
        );
      }
      synced++;
    } catch (error) {
      failed++;
      const message = error instanceof Error ? error.message : "Unknown Sheets error";
      console.error("[Visitor draft sync]", message);
      errors.push(message.slice(0, 200));
      await VisitorDraft.updateOne(
        { _id: draft._id, status: "draft", sheetsSyncStatus: "processing", sheetsLeaseUntil: draft.sheetsLeaseUntil },
        {
          $set: {
            sheetsSyncStatus: "pending", sheetsLastError: message.slice(0, 500),
            sheetsLeaseUntil: new Date(Date.now() + RETRY_MS),
          },
        },
      ).catch(console.error);
    }
  }

  return NextResponse.json({ ok: failed === 0, synced, failed, skippedSubmitted, errors });
}
