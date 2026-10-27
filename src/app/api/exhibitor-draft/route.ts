import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, safeDbErrorMessage } from "@/lib/db/mongodb";
import { exhibitorDraftSchema } from "@/lib/validation/exhibitorDraft";
import { ExhibitorDraft } from "@/models/ExhibitorDraft";
import { getClientIp, isRateLimited } from "@/lib/utils/rateLimit";

export const runtime = "nodejs";
const MAX_BODY_BYTES = 12_000;

export async function POST(req: NextRequest) {
  // Browser-origin requests only. Deploy behind a proxy/WAF for robust IP limits.
  const origin = req.headers.get("origin");
  const expectedOrigin = new URL(req.url).origin;
  if (!origin || origin !== expectedOrigin) {
    return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  }
  if (isRateLimited(`exhibitor-draft:${getClientIp(req.headers)}`)) {
    return NextResponse.json({ error: "Too many draft requests" }, { status: 429 });
  }
  let input: unknown;
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }
    input = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  const parsed = exhibitorDraftSchema.safeParse(input);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid draft data" }, { status: 400 });
  }
  const { draftId, website_hp, ...fields } = parsed.data;
  if (website_hp) return NextResponse.json({ ok: true }); // honeypot

  // Save only after the visitor has entered meaningful contact information.
  if (!(fields.email.includes("@") || fields.mobile.replace(/\D/g, "").length >= 7)) {
    return NextResponse.json({ ok: true, saved: false });
  }

  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error("DB unavailable");
    const now = new Date();
    // Guard prevents overwriting a finalized draft. One draftId is unique.
    // $set on each update ensures the latest valid snapshot wins.
    const existing = await ExhibitorDraft.findOne({ draftId }).select("status").lean();
    if (existing?.status === "submitted") {
      return NextResponse.json({ ok: true, saved: false, submitted: true });
    }
    await ExhibitorDraft.updateOne(
      { draftId, status: "draft" },
      {
        $set: {
          ...fields,
          lastInputAt: now,
          sheetsSyncStatus: "pending",
          expiresAt: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
        },
        $setOnInsert: { kind: "exhibitor", status: "draft" },
      },
      { upsert: !existing },
    );
    return NextResponse.json({ ok: true, saved: true });
  } catch (error) {
    console.error("Draft save failed", safeDbErrorMessage(error));
    return NextResponse.json({ error: "Draft save unavailable" }, { status: 503 });
  }
}
