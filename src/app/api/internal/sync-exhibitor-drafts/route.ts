import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { ExhibitorDraft } from "@/models/ExhibitorDraft";
import { ExhibitorEnquiry } from "@/models/ExhibitorEnquiry";
import { upsertExhibitorLeadRow, isSheetsConfigured } from "@/lib/google/sheets";

export const runtime = "nodejs";
export const maxDuration = 60;

const BATCH_SIZE = 10;
const INACTIVE_MS = 60_000;
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
    const draft = await ExhibitorDraft.findOneAndUpdate(
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
      const submitted = await ExhibitorEnquiry.exists({ draftId: draft.draftId });
      if (!submitted) {
        await upsertExhibitorLeadRow(`DRAFT:${draft.draftId}`, {
          registerAs: "Exhibitor Draft - Not Submitted",
          companyName: draft.companyName ?? "",
          contactPerson: draft.contactPerson ?? "",
          designation: draft.designation ?? "",
          email: draft.email ?? "",
          mobile: draft.mobile ?? "",
          country: draft.country ?? "",
          boothSizeRequirement: draft.preferredBoothSize ?? "",
          areaOfInterest: draft.productsServices ?? "",
          message: "Draft - Not Submitted",
          landingPage: draft.landingPage ?? "",
        });
      } else {
        skippedSubmitted++;
      }

      const updated = await ExhibitorDraft.updateOne(
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
        await ExhibitorDraft.updateOne(
          { _id: draft._id, status: "draft", sheetsSyncStatus: "processing", sheetsLeaseUntil: draft.sheetsLeaseUntil },
          { $set: { sheetsSyncStatus: "pending" }, $unset: { sheetsLeaseUntil: 1 } },
        );
      }
      synced++;
    } catch (error) {
      failed++;
      const message = error instanceof Error ? error.message : "Unknown Sheets error";
      console.error("[Exhibitor draft sync]", message);
      errors.push(message.slice(0, 200));
      await ExhibitorDraft.updateOne(
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
