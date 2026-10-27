import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { ExhibitorEnquiry } from "@/models/ExhibitorEnquiry";
import { VisitorRegistration } from "@/models/VisitorRegistration";
import { isSheetsConfigured, upsertExhibitorLeadRow } from "@/lib/google/sheets";
import { upsertVisitorLeadRow } from "@/lib/google/visitorLeadSheets";

export const runtime = "nodejs";
export const maxDuration = 60;

// Repair submitted leads saved to MongoDB while Google Sheets was unavailable.
// Invoke on a schedule separately from draft sync; protected with CRON_SECRET.
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isSheetsConfigured())
    return NextResponse.json({ error: "Sheets unconfigured" }, { status: 503 });
  if (!(await connectToDatabase()))
    return NextResponse.json({ error: "DB unavailable" }, { status: 503 });

  let synced = 0;
  let failed = 0;
  const errors: string[] = [];
const query = {
  sheetsSyncStatus: {
    $in: ["pending", "failed"],
  },
} as const;


  const exhibitors = await ExhibitorEnquiry.find(query).sort({ createdAt: 1 }).limit(10).lean();
  const visitors = await VisitorRegistration.find(query).sort({ createdAt: 1 }).limit(10).lean();

  for (const doc of exhibitors) {
    try {
      await upsertExhibitorLeadRow(doc.draftId ? `DRAFT:${doc.draftId}` : `EXHIBITOR:${doc.referenceId}`, {
        referenceId: doc.referenceId, registerAs: "Exhibitor Enquiry",
        companyName: doc.companyName, contactPerson: doc.contactPerson,
        designation: doc.designation, email: doc.email, mobile: doc.mobile,
        country: doc.country, boothSizeRequirement: doc.preferredBoothSize || "",
        areaOfInterest: doc.productsServices, landingPage: doc.landingPage || "",
        message: "Submitted",
      });
      await ExhibitorEnquiry.updateOne({ _id: doc._id }, { $set: { sheetsSyncStatus: "synced" } });
      synced++;
    } catch (error) {
      failed++;
      const reason = error instanceof Error ? error.message : "Unknown error";
      errors.push(`exhibitor ${doc.referenceId}: ${reason.slice(0, 160)}`);
      console.error("[Retry exhibitor sheet]", error);
      await ExhibitorEnquiry.updateOne({ _id: doc._id }, { $set: { sheetsSyncStatus: "failed" } }).catch(console.error);
    }
  }
  for (const doc of visitors) {
    try {
      await upsertVisitorLeadRow(doc.draftId ? `VISITOR:${doc.draftId}` : `VISITOR:${doc.referenceId}`, {
        referenceId: doc.referenceId, registerAs: "Visitor Registration",
        fullName: doc.fullName, company: doc.company,
        designation: doc.designation, mobile: doc.mobile, email: doc.email,
        businessCategory: doc.businessCategory || "", country: doc.country,
        landingPage: doc.landingPage || "", status: "Submitted",
      });
      await VisitorRegistration.updateOne({ _id: doc._id }, { $set: { sheetsSyncStatus: "synced" } });
      synced++;
    } catch (error) {
      failed++;
      const reason = error instanceof Error ? error.message : "Unknown error";
      errors.push(`visitor ${doc.referenceId}: ${reason.slice(0, 160)}`);
      console.error("[Retry visitor sheet]", error);
      await VisitorRegistration.updateOne({ _id: doc._id }, { $set: { sheetsSyncStatus: "failed" } }).catch(console.error);
    }
  }
  return NextResponse.json({ ok: failed === 0, synced, failed, errors });
}
