
import "server-only";

import { Types } from "mongoose";

import { connectToDatabase } from "@/lib/db/mongodb";
import {
  Exhibitor,
  type ExhibitorDoc,
} from "@/models/Exhibitor";

import { event } from "@/config/event";

/* ==========================================
   TYPES
========================================== */

export type ExhibitorSummary = Omit<
  ExhibitorDoc,
  "createdAt" | "updatedAt"
> & {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
};

/* ==========================================
   SERIALIZATION
========================================== */

function serialize(
  doc: ExhibitorDoc & {
    _id: Types.ObjectId;
  }
): ExhibitorSummary {
  return {
    ...doc,
    _id: doc._id.toString(),

    createdAt: doc.createdAt
      ? new Date(doc.createdAt).toISOString()
      : undefined,

    updatedAt: doc.updatedAt
      ? new Date(doc.updatedAt).toISOString()
      : undefined,
  };
}

/* ==========================================
   GET PUBLISHED EXHIBITORS
========================================== */

export async function getPublishedExhibitors(): Promise<
  ExhibitorSummary[]
> {
  try {
    const conn = await connectToDatabase();

    if (!conn) return [];

    const docs = await Exhibitor.find({
      published: true,
    })
      .sort({
        sortOrder: 1,
        companyName: 1,
      })
      .lean()
      .exec();

    return docs.map((doc) =>
      serialize(
        doc as ExhibitorDoc & {
          _id: Types.ObjectId;
        }
      )
    );
  } catch (error) {
    console.error(
      "[getPublishedExhibitors] Failed:",
      error
    );

    return [];
  }
}

/* ==========================================
   GET FEATURED EXHIBITORS
========================================== */

export async function getFeaturedExhibitors(
  limit = 6
): Promise<ExhibitorSummary[]> {
  const safeLimit = Math.max(
    0,
    Math.min(Math.floor(limit) || 0, 50)
  );

  if (safeLimit === 0) return [];

  const exhibitors =
    await getPublishedExhibitors();

  if (
    exhibitors.length <
    event.exhibitorDirectoryMinimum
  ) {
    return [];
  }

  const featured = exhibitors.filter(
    (exhibitor) => exhibitor.featured
  );

  return (featured.length > 0
    ? featured
    : exhibitors
  ).slice(0, safeLimit);
}

/* ==========================================
   GET EXHIBITOR BY SLUG
========================================== */

export async function getExhibitorBySlug(
  slug: string
): Promise<ExhibitorSummary | null> {
  const safeSlug = slug.trim().toLowerCase();

  if (!safeSlug) return null;

  try {
    const conn = await connectToDatabase();

    if (!conn) return null;

    const doc = await Exhibitor.findOne({
      slug: safeSlug,
      published: true,
    })
      .lean()
      .exec();

    if (!doc) return null;

    return serialize(
      doc as ExhibitorDoc & {
        _id: Types.ObjectId;
      }
    );
  } catch (error) {
    console.error(
      "[getExhibitorBySlug] Failed:",
      error
    );

    return null;
  }
}
