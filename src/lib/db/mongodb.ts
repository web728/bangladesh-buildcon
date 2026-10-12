import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || "bangladesh_buildcon";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var _mongooseCache: MongooseCache | undefined;
}

const cache: MongooseCache = global._mongooseCache ?? { conn: null, promise: null };
global._mongooseCache = cache;

/**
 * Lazily connects to MongoDB. Returns null (instead of throwing) when
 * MONGODB_URI is not configured, so pages can render with graceful empty
 * states in local/dev environments without a database.
 */
export async function connectToDatabase(): Promise<typeof mongoose | null> {
  if (!MONGODB_URI) return null;

  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGODB_URI, {
      dbName: MONGODB_DB,
      // Public pages have verified static fallbacks. Fail quickly when the
      // optional CMS database is unreachable instead of blocking a request
      // for the driver's much longer default server-selection window.
      serverSelectionTimeoutMS: 5_000,
      connectTimeoutMS: 5_000,
    });
  }

  try {
    cache.conn = await cache.promise;
  } catch (err) {
    cache.promise = null;
    throw err;
  }

  return cache.conn;
}

export function isDatabaseConfigured(): boolean {
  return Boolean(MONGODB_URI);
}

/**
 * A connection-string error message can echo the URI verbatim (credentials
 * included) depending on the driver/error type. Strips it and returns only
 * the message — never the stack — so route handlers can log DB failures
 * without risking a credential leak in server logs.
 */
export function safeDbErrorMessage(err: unknown): string {
  const message = err instanceof Error ? err.message : String(err);
  return message.replace(/mongodb(\+srv)?:\/\/[^\s"']+/gi, "mongodb://[redacted]");
}
