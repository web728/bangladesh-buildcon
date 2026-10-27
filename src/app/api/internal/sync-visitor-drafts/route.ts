import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { VisitorDraft } from "@/models/VisitorDraft";
import { VisitorRegistration } from "@/models/VisitorRegistration";
import { upsertVisitorLeadRow } from "@/lib/google/visitorLeadSheets";
import { isSheetsConfigured } from "@/lib/google/sheets";
export const runtime = "nodejs";
export const maxDuration = 60;
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isSheetsConfigured() || !await connectToDatabase())
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  let synced = 0; let failed = 0;
  for (let i = 0; i < 25; i++) {
    const now = new Date();
    const draft = await VisitorDraft.findOneAndUpdate(
      { status: "draft", lastInputAt: { $lt: new Date(now.getTime() - 5 * 60_000) },
        $or: [{ sheetsSyncStatus: "pending" }, { sheetsSyncStatus: "processing", sheetsLeaseUntil: { $lt: now } }] },
      { $set: { sheetsSyncStatus: "processing", sheetsLeaseUntil: new Date(now.getTime() + 120_000) }, $inc: { sheetsAttempts: 1 } },
      { new: true, sort: { lastInputAt: 1 } },
    );
    if (!draft) break;
    try {
      const registered = await VisitorRegistration.exists({ draftId: draft.draftId });
      if (!registered) {
        await upsertVisitorLeadRow(`VISITOR:${draft.draftId}`, {
          referenceId: "", registerAs: "Visitor Draft - Not Submitted", fullName: draft.fullName,
          company: draft.company, designation: draft.designation, mobile: draft.mobile,
          email: draft.email, businessCategory: draft.businessCategory, country: draft.country,
          landingPage: draft.landingPage, status: "Draft - Not Submitted",
        });
      }
      const outcome = await VisitorDraft.updateOne(
        { _id: draft._id, sheetsSyncStatus: "processing", status: "draft", lastInputAt: draft.lastInputAt },
        { $set: { sheetsSyncStatus: "synced", sheetsSyncedAt: new Date() }, $unset: { sheetsLeaseUntil: 1 } },
      );
      if (outcome.modifiedCount === 0) {
        await VisitorDraft.updateOne({ _id: draft._id, status: "draft", sheetsSyncStatus: "processing" }, { $set: { sheetsSyncStatus: "pending" }, $unset: { sheetsLeaseUntil: 1 } });
      }
      synced++;
    } catch (error) {
      failed++; console.error("Visitor draft sync failed", error);
      await VisitorDraft.updateOne({ _id: draft._id, status: "draft", sheetsSyncStatus: "processing" },
        { $set: { sheetsSyncStatus: "pending", sheetsLastError: "Sheet sync failed" }, $unset: { sheetsLeaseUntil: 1 } }).catch(() => {});
    }
  }
  return NextResponse.json({ ok: true, synced, failed });
}
