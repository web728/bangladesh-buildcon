import { connectToDatabase } from "@/lib/db/mongodb";
import { GalleryItem } from "@/models/GalleryItem";

export type GallerySummary = {
  _id: string;
  title: string;
  imageUrl: string;
  category: "Show Preparations" | "Exhibitors" | "Venue" | "Media" | "Future Editions";
};

const STATIC_GALLERY: GallerySummary[] = Array.from({ length: 12 }, (_, index) => ({
  _id: `bangladesh-buildcon-gallery-${index + 1}`,
  title: `Bangladesh Buildcon 2025 event highlight ${index + 1}`,
  imageUrl: `/images/gallery/bangladesh-buildcon-${String(index + 1).padStart(2, "0")}.jpg`,
  category: index < 3 ? "Show Preparations" : "Exhibitors",
}));

function serialize(doc: Record<string, unknown>): GallerySummary {
  return JSON.parse(JSON.stringify(doc));
}

export async function getPublishedGalleryItems(): Promise<GallerySummary[]> {
  try {
    const conn = await connectToDatabase();
    if (!conn) return STATIC_GALLERY;
    const docs = await GalleryItem.find({ published: true }).sort({ sortOrder: 1 }).lean();
    const dynamicItems = docs.map((doc) => serialize(doc as Record<string, unknown>));
    return dynamicItems.length > 0 ? dynamicItems : STATIC_GALLERY;
  } catch {
    return STATIC_GALLERY;
  }
}
