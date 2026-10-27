
import { NextRequest, NextResponse } from "next/server";

import {
  connectToDatabase,
  safeDbErrorMessage,
} from "@/lib/db/mongodb";

import { exhibitorDraftSchema } from
  "@/lib/validation/exhibitorDraft";

import { ExhibitorDraft } from
  "@/models/ExhibitorDraft";

import {
  getClientIp,
  isRateLimited,
} from "@/lib/utils/rateLimit";

import { isValidDraftOrigin } from
  "@/lib/security/draftOrigin";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 12_000;
const DRAFT_RETENTION_DAYS = 30;
const DRAFT_RETENTION_MS =
  DRAFT_RETENTION_DAYS * 24 * 60 * 60 * 1000;

export async function POST(req: NextRequest) {
  // 1. Validate the public website origin.
  // Do not compare with new URL(req.url).origin,
  // because a reverse proxy can change that value.
  if (!isValidDraftOrigin(req)) {
    return NextResponse.json(
      { error: "Invalid request origin" },
      { status: 403 },
    );
  }

  // 2. Basic rate limiting.
  const ip = getClientIp(req.headers);

  if (isRateLimited(`exhibitor-draft:${ip}`)) {
    return NextResponse.json(
      {
        error:
          "Too many draft requests. Please try again later.",
      },
      { status: 429 },
    );
  }

  // 3. Parse the request body.
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

  // 4. Validate partial form fields.
  const parsed = exhibitorDraftSchema.safeParse(input);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid draft data",
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

  // 5. Honeypot protection.
  if (website_hp) {
    return NextResponse.json({
      ok: true,
      saved: false,
    });
  }

  // 6. Save only when useful contact information exists.
  // Other fields may remain empty during autosave.
  const email = fields.email.trim();
  const mobileDigits = fields.mobile.replace(/\D/g, "");

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

  // 7. Persist partial lead in MongoDB.
  try {
    const connection = await connectToDatabase();

    if (!connection) {
      throw new Error("Database unavailable");
    }

    const now = new Date();

    const existing = await ExhibitorDraft.findOne({
      draftId,
    })
      .select("status")
      .lean()
      .exec();

    // Do not overwrite a submitted lead.
    if (existing?.status === "submitted") {
      return NextResponse.json({
        ok: true,
        saved: false,
        submitted: true,
      });
    }

    // Existing unique draftId index prevents duplicate IDs.
    // A conditional update prevents ordinary writes to
    // an already submitted record.
    const result = await ExhibitorDraft.updateOne(
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
          kind: "exhibitor",
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
    // A simultaneous request may hit the unique draftId
    // constraint. The next autosave can retry safely.
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
      "[Exhibitor Draft] Save failed:",
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
