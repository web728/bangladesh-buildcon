import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { ExhibitorDraft } from "@/models/ExhibitorDraft";
import { ExhibitorEnquiry } from "@/models/ExhibitorEnquiry";
import { upsertExhibitorLeadRow, isSheetsConfigured } from "@/lib/google/sheets";

export const runtime = "nodejs";
export const maxDuration = 60;

/** Scheduled with bearer CRON_SECRET. Batch limits protect Sheets quota. */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isSheetsConfigured()) {
    return NextResponse.json({ error: "Sheets unavailable" }, { status: 503 });
  }
  if (!(await connectToDatabase())) {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
  let synced = 0;
  let failed = 0;
  for (let i = 0; i < 25; i++) {
    const now = new Date();
    const draft = await ExhibitorDraft.findOneAndUpdate(
      {
        status: "draft",
        lastInputAt: { $lt: new Date(now.getTime() - 5 * 60_000) },
        $or: [
          { sheetsSyncStatus: "pending" },
          { sheetsSyncStatus: "processing", sheetsLeaseUntil: { $lt: now } },
        ],
      },
      {
        $set: { sheetsSyncStatus: "processing", sheetsLeaseUntil: new Date(now.getTime() + 120_000) },
        $inc: { sheetsAttempts: 1 },
      },
      { new: true, sort: { lastInputAt: 1 } },
    );
    if (!draft) break;
    try {
      // Avoid overwriting a completed enquiry from stale draft snapshot.
      const submitted = await ExhibitorEnquiry.exists({ draftId: draft.draftId });
      if (!submitted) {
        await upsertExhibitorLeadRow(`DRAFT:${draft.draftId}`, {
          registerAs: "Exhibitor Draft - Not Submitted",
          companyName: draft.companyName,
          contactPerson: draft.contactPerson,
          designation: draft.designation,
          email: draft.email,
          mobile: draft.mobile,
          country: draft.country,
          boothSizeRequirement: draft.preferredBoothSize,
          areaOfInterest: draft.productsServices,
          message: "Draft - Not Submitted",
          landingPage: draft.landingPage,
        });
      }
      // Do not mark synced if visitor changed the draft during the network call.
      await ExhibitorDraft.updateOne(
        { _id: draft._id, sheetsSyncStatus: "processing", lastInputAt: draft.lastInputAt },
        { $set: { sheetsSyncStatus: "synced", sheetsSyncedAt: new Date() }, $unset: { sheetsLeaseUntil: 1 } },
      );
      synced++;
    } catch (error) {
      failed++;
      console.error("Draft Sheets sync failed", error);
      await ExhibitorDraft.updateOne(
        { _id: draft._id, sheetsSyncStatus: "processing" },
        {
          $set: { sheetsSyncStatus: "pending", sheetsLastError: "Google Sheets unavailable" },
          $unset: { sheetsLeaseUntil: 1 },
        },
      ).catch(() => {});
    }
  }
  return NextResponse.json({ ok: true, synced, failed });
}
