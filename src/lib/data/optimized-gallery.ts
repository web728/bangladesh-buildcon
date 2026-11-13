import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

/**
 * All optimized photos come from public/images/optimized, including subfolders.
 * The Sharp script's manifest is reused for dimensions where possible.
 */
const OPTIMIZED_DIR = path.join(
  process.cwd(),
  "public",
  "images",
  "optimized",
);
const WEB_PREFIX = "/images/optimized";
const SUPPORTED_EXTENSIONS = new Set([
  ".webp",
  ".avif",
  ".jpg",
  ".jpeg",
  ".png",
]);

export type OptimizedGalleryItem = {
  id: string;
  imageUrl: string;
  title: string;
  width: number;
  height: number;
};

type ManifestEntry = {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
};

async function listImages(dir: string, relative = ""): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  const files = await Promise.all(
    entries.map(async (entry): Promise<string[]> => {
      const nextRelative = path.join(relative, entry.name);
      if (entry.isDirectory()) {
        // Do not accidentally include separately generated thumbnails.
        if (entry.name === "_thumbnails") return [];
        return listImages(path.join(dir, entry.name), nextRelative);
      }
      return entry.isFile() &&
        SUPPORTED_EXTENSIONS.has(path.extname(entry.name).toLowerCase())
        ? [nextRelative]
        : [];
    }),
  );

  return files.flat();
}

function publicUrl(relativePath: string): string {
  return (
    WEB_PREFIX +
    "/" +
    relativePath
      .split(path.sep)
      .map((part) => encodeURIComponent(part))
      .join("/")
  );
}

function titleFromFilename(relativePath: string): string {
  return path
    .parse(relativePath)
    .name.replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function readManifest(): Promise<Map<string, ManifestEntry>> {
  const filename = path.join(OPTIMIZED_DIR, "manifest.json");
  try {
    const raw = await fs.readFile(filename, "utf8");
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return new Map();
    const entries = data.filter(
      (value): value is ManifestEntry =>
        typeof value === "object" &&
        value !== null &&
        typeof (value as ManifestEntry).src === "string",
    );
    return new Map(entries.map((entry) => [entry.src!, entry]));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      console.warn("Gallery: manifest.json could not be read; using image files.", error);
    }
    return new Map();
  }
}

export async function getOptimizedGalleryItems(): Promise<OptimizedGalleryItem[]> {
  try {
    const [files, manifest] = await Promise.all([
      listImages(OPTIMIZED_DIR),
      readManifest(),
    ]);

    // This checks the actual directory, so newly added images appear even if
    // manifest.json has not been regenerated. Run the optimizer for best speed.
    const sorted = files.sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }),
    );

    const result = await Promise.all(
      sorted.map(async (relativePath): Promise<OptimizedGalleryItem | null> => {
        const imageUrl = publicUrl(relativePath);
        const record = manifest.get(imageUrl);
        let width = record?.width;
        let height = record?.height;

        if (
          !Number.isSafeInteger(width) ||
          !Number.isSafeInteger(height) ||
          !width ||
          !height ||
          width <= 0 ||
          height <= 0
        ) {
          try {
            const imageMetadata = await sharp(
              path.join(OPTIMIZED_DIR, relativePath),
            ).metadata();
            width = imageMetadata.width;
            height = imageMetadata.height;
          } catch (error) {
            console.warn("Gallery: skipping unreadable image", relativePath, error);
            return null;
          }
        }

        if (!width || !height) return null;

        return {
          id: imageUrl,
          imageUrl,
          title: record?.alt?.trim() || titleFromFilename(relativePath),
          width,
          height,
        };
      }),
    );

    return result.filter((item): item is OptimizedGalleryItem => item !== null);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      console.warn("Gallery: optimized directory not found", OPTIMIZED_DIR);
      return [];
    }
    throw error;
  }
}
