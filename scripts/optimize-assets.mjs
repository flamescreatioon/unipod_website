import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const PUBLIC_ASSETS = path.resolve("public/assets");

function getMaxWidth(filePath) {
  const norm = filePath.replace(/\\/g, "/");
  if (norm.includes("/hero/") || norm.includes("-hero.")) {
    return 1920;
  }
  if (norm.includes("/facility/")) {
    return 1200;
  }
  if (norm.includes("/about/") || norm.includes("/teams/")) {
    return 800;
  }
  return 1200;
}

async function getFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getFiles(fullPath)));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

async function run() {
  console.log("Starting image optimization with buffer input...");

  // 1. Remove unreferenced 13.3MB duplicate with spaces if it exists
  const duplicate = path.join(PUBLIC_ASSETS, "about", "otti and ahunna.jpg");
  try {
    await fs.unlink(duplicate);
    console.log("Removed duplicate unreferenced file: otti and ahunna.jpg");
  } catch (e) {
    // ignore
  }

  const allFiles = await getFiles(PUBLIC_ASSETS);
  const imageFiles = allFiles.filter((f) =>
    /\.(jpg|jpeg|png)$/i.test(f)
  );

  let initialTotalBytes = 0;
  let finalWebpBytes = 0;
  let finalFallbackBytes = 0;

  for (const file of imageFiles) {
    const ext = path.extname(file);
    const baseWithoutExt = file.slice(0, -ext.length);
    const webpPath = `${baseWithoutExt}.webp`;
    const maxWidth = getMaxWidth(file);

    try {
      const inputBuffer = await fs.readFile(file);
      initialTotalBytes += inputBuffer.length;

      const metadata = await sharp(inputBuffer).metadata();
      const width = metadata.width && metadata.width > maxWidth ? maxWidth : undefined;

      // 1. Output WebP
      const webpBuffer = await sharp(inputBuffer)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 82, effort: 4 })
        .toBuffer();
      await fs.writeFile(webpPath, webpBuffer);
      finalWebpBytes += webpBuffer.length;

      // 2. Overwrite original JPG/PNG with compressed, resized version as fallback
      let fallbackBuffer;
      if (/\.(jpg|jpeg)$/i.test(file)) {
        fallbackBuffer = await sharp(inputBuffer)
          .resize({ width, withoutEnlargement: true })
          .jpeg({ quality: 80, mozjpeg: true })
          .toBuffer();
        await fs.writeFile(file, fallbackBuffer);
      } else if (/\.png$/i.test(file) && inputBuffer.length > 200 * 1024) {
        fallbackBuffer = await sharp(inputBuffer)
          .resize({ width, withoutEnlargement: true })
          .png({ compressionLevel: 9, quality: 80 })
          .toBuffer();
        await fs.writeFile(file, fallbackBuffer);
      } else {
        fallbackBuffer = inputBuffer;
      }
      finalFallbackBytes += fallbackBuffer.length;

      console.log(
        `✓ ${path.relative(PUBLIC_ASSETS, file)}: ${(inputBuffer.length / 1024 / 1024).toFixed(2)} MB -> WebP: ${(webpBuffer.length / 1024).toFixed(1)} KB | Compressed fallback: ${(fallbackBuffer.length / 1024).toFixed(1)} KB`
      );
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }

  console.log("=========================================");
  console.log(`Original images processed: ${(initialTotalBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(`WebP assets total: ${(finalWebpBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Compressed fallbacks total: ${(finalFallbackBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(
    `Total bandwidth savings with WebP: ${((1 - finalWebpBytes / initialTotalBytes) * 100).toFixed(1)}%`
  );
}

run();
