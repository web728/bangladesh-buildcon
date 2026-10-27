import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, safeDbErrorMessage } from "@/lib/db/mongodb";
import { visitorDraftSchema } from "@/lib/validation/visitorDraft";
import { VisitorDraft } from "@/models/VisitorDraft";
import { getClientIp, isRateLimited } from "@/lib/utils/rateLimit";

export const runtime = "nodejs";
export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!origin || origin !== new URL(req.url).origin) return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  if (isRateLimited(`visitor-draft:${getClientIp(req.headers)}`)) return NextResponse.json({ error: "Rate limited" }, { status: 429 });
  let raw = "";
  try { raw = await req.text(); } catch { return NextResponse.json({ error: "Invalid body" }, { status: 400 }); }
  if (raw.length > 12_000) return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  let json: unknown;
  try { json = JSON.parse(raw); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }
  const result = visitorDraftSchema.safeParse(json);
  if (!result.success) return NextResponse.json({ error: "Invalid draft fields" }, { status: 400 });
  const { draftId, website_hp, ...fields } = result.data;
  if (website_hp) return NextResponse.json({ ok: true, saved: false });
  const hasContact = fields.email.includes("@") || fields.mobile.replace(/\D/g, "").length >= 7;
  if (!hasContact) return NextResponse.json({ ok: true, saved: false });
  try {
    if (!await connectToDatabase()) throw new Error("DB unavailable");
    const now = new Date();
    // Unique draftId and conditional upsert prevent new writes to submitted drafts.
    const existing = await VisitorDraft.findOne({ draftId }).select("status").lean();
    if (existing?.status === "submitted") return NextResponse.json({ ok: true, saved: false, submitted: true });
    await VisitorDraft.updateOne(
      { draftId, status: "draft" },
      { $set: { ...fields, lastInputAt: now, sheetsSyncStatus: "pending", expiresAt: new Date(now.getTime() + 30 * 86400000) }, $setOnInsert: { status: "draft" } },
      { upsert: !existing },
    );
    return NextResponse.json({ ok: true, saved: true });
  } catch (error) {
    console.error("Visitor draft save failed", safeDbErrorMessage(error));
    return NextResponse.json({ error: "Draft temporarily unavailable" }, { status: 503 });
  }
}
