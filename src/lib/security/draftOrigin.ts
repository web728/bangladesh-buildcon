
import type { NextRequest } from "next/server";

const PRODUCTION_ORIGINS = [
  "https://bangladeshbuildcon.com",
  "https://www.bangladeshbuildcon.com",
];

function getAllowedOrigins(): Set<string> {
  const allowed = new Set(PRODUCTION_ORIGINS);

  // Additional explicitly configured origins, if needed.
  // Example: https://staging.example.com
  const extraOrigins =
    process.env.DRAFT_ALLOWED_ORIGINS ?? "";

  for (const value of extraOrigins.split(",")) {
    const origin = value.trim();

    if (!origin) continue;

    try {
      const parsed = new URL(origin);

      if (
        parsed.protocol === "https:" ||
        (process.env.NODE_ENV !== "production" &&
          parsed.protocol === "http:")
      ) {
        allowed.add(parsed.origin);
      }
    } catch {
      console.error(
        "[Draft Origin] Invalid configured origin",
      );
    }
  }

  if (process.env.NODE_ENV !== "production") {
    allowed.add("http://localhost:3000");
    allowed.add("http://127.0.0.1:3000");
  }

  return allowed;
}

export function isValidDraftOrigin(
  req: NextRequest,
): boolean {
  const originHeader = req.headers.get("origin");

  // Reject requests without an Origin header.
  if (!originHeader) {
    return false;
  }

  try {
    const origin = new URL(originHeader).origin;

    return getAllowedOrigins().has(origin);
  } catch {
    return false;
  }
}
