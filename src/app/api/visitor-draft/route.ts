
import { NextRequest, NextResponse } from "next/server";

import {
  connectToDatabase,
  safeDbErrorMessage,
} from "@/lib/db/mongodb";

import { visitorDraftSchema } from
  "@/lib/validation/visitorDraft";

import { VisitorDraft } from
  "@/models/VisitorDraft";

import {
  getClientIp,
  isRateLimited,
} from "@/lib/utils/rateLimit";

import { isValidDraftOrigin } from
  "@/lib/security/draftOrigin";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 12_000;
const DRAFT_RETENTION_MS =
  30 * 24 * 60 * 60 * 1000;

export async function POST(req: NextRequest) {
  // 1. Validate the actual public website origin.
  if (!isValidDraftOrigin(req)) {
    return NextResponse.json(
      { error: "Invalid request origin" },
      { status: 403 },
    );
  }

  // 2. Rate limiting.
  const ip = getClientIp(req.headers);

  if (isRateLimited(`visitor-draft:${ip}`)) {
    return NextResponse.json(
      {
        error:
          "Too many draft requests. Please try again later.",
      },
      { status: 429 },
    );
  }

  // 3. Parse JSON safely.
  let input: unknown;

  try {
    const raw = await req.text();

    if (
      Buffer.byteLength(raw, "utf8") >
      MAX_BODY_BYTES
    ) {
      return NextResponse.json(
        { error: "Payload too large" },
        { status: 413 },
      );
    }

    input = JSON.parse(raw);
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  // 4. Validate partial visitor fields.
  const parsed = visitorDraftSchema.safeParse(input);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid draft fields",
        issues: parsed.error.issues,
      },
      { status: 400 },
    );
  }

  const {
    draftId,
    website_hp,
    ...fields
  } = parsed.data;

  // 5. Bot honeypot.
  if (website_hp) {
    return NextResponse.json({
      ok: true,
      saved: false,
    });
  }

  // 6. Contact information check.
  const email = fields.email.trim();

  const mobileDigits = fields.mobile.replace(
    /\D/g,
    "",
  );

  const hasContact =
    email.includes("@") ||
    mobileDigits.length >= 7;

  if (!hasContact) {
    return NextResponse.json({
      ok: true,
      saved: false,
      reason: "No contact details yet",
    });
  }

  // 7. Save visitor draft.
  try {
    const connection = await connectToDatabase();

    if (!connection) {
      throw new Error("Database unavailable");
    }

    const now = new Date();

    const existing = await VisitorDraft.findOne({
      draftId,
    })
      .select("status")
      .lean()
      .exec();

    if (existing?.status === "submitted") {
      return NextResponse.json({
        ok: true,
        saved: false,
        submitted: true,
      });
    }

    const result = await VisitorDraft.updateOne(
      {
        draftId,
        status: "draft",
      },
      {
        $set: {
          ...fields,
          lastInputAt: now,
          sheetsSyncStatus: "pending",
          expiresAt: new Date(
            now.getTime() + DRAFT_RETENTION_MS,
          ),
        },
        $setOnInsert: {
          draftId,
          status: "draft",
        },
      },
      {
        upsert: !existing,
        runValidators: true,
      },
    );

    if (
      result.matchedCount === 0 &&
      result.upsertedCount === 0
    ) {
      return NextResponse.json({
        ok: true,
        saved: false,
        submitted: true,
      });
    }

    return NextResponse.json({
      ok: true,
      saved: true,
      draftId,
    });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        {
          error:
            "Concurrent draft update. Please retry.",
        },
        { status: 409 },
      );
    }

    console.error(
      "[Visitor Draft] Save failed:",
      safeDbErrorMessage(error),
    );

    return NextResponse.json(
      {
        error:
          "Draft save temporarily unavailable.",
      },
      { status: 503 },
    );
  }
}
