
import type { NextRequest } from "next/server";

const ALLOWED_ORIGINS = new Set([
  "https://bangladeshbuildcon.com",
  "https://www.bangladeshbuildcon.com",
]);

export function isValidDraftOrigin(
  req: NextRequest,
): boolean {
  const origin = req.headers.get("origin");

  if (!origin) {
    return false;
  }

  try {
    const parsedOrigin = new URL(origin);

    // Allow local development only outside production.
    if (process.env.NODE_ENV !== "production") {
      ALLOWED_ORIGINS.add("http://localhost:3000");
      ALLOWED_ORIGINS.add("http://127.0.0.1:3000");
    }

    return ALLOWED_ORIGINS.has(
      parsedOrigin.origin,
    );
  } catch {
    return false;
  }
}
