import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = path.join(process.cwd(), "public", "images", "original");
const OUTPUT_DIR = path.join(process.cwd(), "public", "images", "optimized");
const MAX_DIMENSION = 2048;
const WEBP_QUALITY = 86;
const WORKERS = 3;
const LOSSLESS_TRANSPARENT_PNG = true;
const SUPPORTED = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

type ImageEntry = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

async function findImages(folder: string): Promise<string[]> {
  const entries = await fs.readdir(folder, { withFileTypes: true });
  const paths = await Promise.all(
    entries.map(async (entry): Promise<string[]> => {
      const fullPath = path.join(folder, entry.name);
      if (entry.isDirectory()) return findImages(fullPath);
      if (entry.isFile() && SUPPORTED.has(path.extname(entry.name).toLowerCase())) {
        return [fullPath];
      }
      return [];
    }),
  );
  return paths.flat();
}

function prettySize(bytes: number): string {
  return bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(2)} MB`
    : `${(bytes / 1024).toFixed(1)} KB`;
}

async function main(): Promise<void> {
  const files = (await findImages(SOURCE_DIR)).sort();
  if (files.length === 0) {
    console.log(`No supported images found in ${SOURCE_DIR}`);
    return;
  }

  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  // Avoid collisions such as photo.jpg and photo.png -> photo.webp.
  const duplicateStems = new Map<string, number>();
  for (const file of files) {
    const parsed = path.parse(path.relative(SOURCE_DIR, file));
    const key = path.join(parsed.dir, parsed.name).toLowerCase();
    duplicateStems.set(key, (duplicateStems.get(key) ?? 0) + 1);
  }

  const manifest: ImageEntry[] = [];
  let processed = 0;
  let skipped = 0;
  let ignored = 0;
  let failed = 0;
  let originalBytes = 0;
  let optimizedBytes = 0;
  let cursor = 0;

  async function optimize(file: string): Promise<void> {
    const relative = path.relative(SOURCE_DIR, file);
    const parsed = path.parse(relative);
    const stemKey = path.join(parsed.dir, parsed.name).toLowerCase();
    const suffix = (duplicateStems.get(stemKey) ?? 0) > 1
      ? `-${parsed.ext.slice(1).toLowerCase()}`
      : "";
    const relativeOutput = path.join(parsed.dir, `${parsed.name}${suffix}.webp`);
    const destination = path.join(OUTPUT_DIR, relativeOutput);

    try {
      const inputStat = await fs.stat(file);
      const metadata = await sharp(file).metadata();

      // Don't silently turn animated WebP into a single still frame.
      if ((metadata.pages ?? 1) > 1) {
        ignored++;
        console.warn(`SKIPPED animated image: ${relative}`);
        return;
      }

      await fs.mkdir(path.dirname(destination), { recursive: true });
      const previous = await fs.stat(destination).catch(() => null);

      if (previous && previous.mtimeMs >= inputStat.mtimeMs) {
        skipped++;
      } else {
        const pipeline = sharp(file)
          .rotate() // Respect EXIF orientation
          .resize({
            width: MAX_DIMENSION,
            height: MAX_DIMENSION,
            fit: "inside", // Keep entire image, no crop
            withoutEnlargement: true,
          });

        const isTransparentPng =
          parsed.ext.toLowerCase() === ".png" && metadata.hasAlpha;

        const options = isTransparentPng && LOSSLESS_TRANSPARENT_PNG
          ? { lossless: true, effort: 6 }
          : {
              quality: WEBP_QUALITY,
              effort: 6,
              smartSubsample: true,
              alphaQuality: 100,
            };

        const result = await pipeline.webp(options).toFile(destination);
        processed++;
        console.log(`${relative}  ${prettySize(inputStat.size)} -> ${prettySize(result.size)}`);
      }

      const [outputStat, outputMetadata] = await Promise.all([
        fs.stat(destination),
        sharp(destination).metadata(),
      ]);
      if (!outputMetadata.width || !outputMetadata.height) {
        throw new Error(`Missing dimensions: ${destination}`);
      }

      const url = relativeOutput
        .split(path.sep)
        .map((segment) => encodeURIComponent(segment))
        .join("/");
      manifest.push({
        src: `/images/optimized/${url}`,
        width: outputMetadata.width,
        height: outputMetadata.height,
        alt: parsed.name.replace(/[-_]+/g, " "),
      });
      originalBytes += inputStat.size;
      optimizedBytes += outputStat.size;
    } catch (error) {
      failed++;
      console.error(`FAILED ${relative}`, error);
    }
  }

  async function worker(): Promise<void> {
    while (cursor < files.length) {
      const file = files[cursor++];
      await optimize(file);
    }
  }

  await Promise.all(Array.from({ length: Math.min(WORKERS, files.length) }, worker));
  manifest.sort((a, b) => a.src.localeCompare(b.src));
  await fs.writeFile(
    path.join(OUTPUT_DIR, "manifest.json"),
    JSON.stringify(manifest, null, 2),
    "utf8",
  );

  const savedPercent = originalBytes
    ? ((1 - optimizedBytes / originalBytes) * 100).toFixed(1)
    : "0.0";
  console.log(`\nFound: ${files.length} | Converted: ${processed} | Already current: ${skipped} | Animated skipped: ${ignored} | Failed: ${failed}`);
  console.log(`Total: ${prettySize(originalBytes)} -> ${prettySize(optimizedBytes)} (${savedPercent}% saved)`);
  console.log(`Manifest: ${path.join(OUTPUT_DIR, "manifest.json")}`);
  if (failed > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
