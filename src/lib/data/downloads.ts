import { connectToDatabase } from "@/lib/db/mongodb";
import { Download } from "@/models/Download";

export type DownloadSummary = {
  _id: string;
  title: string;
  description?: string;
  fileUrl: string;
  category: string;
};

const STATIC_DOWNLOADS: DownloadSummary[] = [
  {
    _id: "bangladesh-buildcon-2025-post-show-report",
    title: "11th Bangladesh Buildcon International Expo 2027 Post-Show Report",
    description: "Previous-edition highlights, audience profile, survey findings, and event photography.",
    fileUrl: "/downloads/Bangladesh-Buildcon-Post-Show-Report-2025.pdf",
    category: "Post-Show Report",
  },
];

function serialize(doc: Record<string, unknown>): DownloadSummary {
  return JSON.parse(JSON.stringify(doc));
}

export async function getPublishedDownloads(): Promise<DownloadSummary[]> {
  try {
    const conn = await connectToDatabase();
    if (!conn) return STATIC_DOWNLOADS;
    const docs = await Download.find({ published: true }).sort({ sortOrder: 1 }).lean();
    const dynamicDownloads = docs.map((doc) => serialize(doc as Record<string, unknown>));
    return dynamicDownloads.length > 0 ? dynamicDownloads : STATIC_DOWNLOADS;
  } catch {
    return STATIC_DOWNLOADS;
  }
}
