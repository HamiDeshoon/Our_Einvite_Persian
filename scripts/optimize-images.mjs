// Batch image optimization for the wedding invitation gallery.
// Resizes to max 1600px on the long edge and recompresses as progressive JPEG.
// Run with: node scripts/optimize-images.mjs
// Originals are moved to public/images/originals/ on first run.

import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

const IMG_DIR = path.resolve('public/images');
const BACKUP_DIR = path.resolve('originals');
const MAX_WIDTH = 1600;
const QUALITY = 78;

async function main() {
  await fs.mkdir(BACKUP_DIR, { recursive: true });

  const entries = await fs.readdir(IMG_DIR, { withFileTypes: true });
  const images = entries.filter(
    (e) => e.isFile() && /\.(jpe?g|png|webp)$/i.test(e.name)
  );

  if (images.length === 0) {
    console.log('No images found to optimize.');
    return;
  }

  let totalBefore = 0;
  let totalAfter = 0;

  for (const entry of images) {
    const name = entry.name;
    const src = path.join(IMG_DIR, name);
    const backup = path.join(BACKUP_DIR, name);

    // Back up once (skip if a backup already exists).
    try {
      await fs.access(backup);
    } catch {
      await fs.copyFile(src, backup);
    }

    const before = (await fs.stat(backup)).size;
    const outName = name.replace(/\.(jpe?g|png|webp)$/i, '.jpg');
    const tmp = path.join(IMG_DIR, '.' + outName + '.tmp');

    await sharp(backup)
      .rotate() // honor EXIF orientation
      .resize({ width: MAX_WIDTH, height: MAX_WIDTH, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: QUALITY, progressive: true, mozjpeg: true })
      .toFile(tmp);

    // Replace the original file (rename tmp -> final).
    const final = path.join(IMG_DIR, outName);
    await fs.rename(tmp, final);

    // If the output name differs (e.g. .png -> .jpg), remove the stale source.
    if (path.basename(final) !== name) {
      try { await fs.unlink(src); } catch {}
    }

    const after = (await fs.stat(final)).size;
    totalBefore += before;
    totalAfter += after;

    const pct = (((before - after) / before) * 100).toFixed(0);
    console.log(
      `${name.padEnd(28)} ${(before / 1024).toFixed(0).padStart(5)} KB -> ${(after / 1024).toFixed(0).padStart(4)} KB  (-${pct}%)`
    );
  }

  console.log('---');
  console.log(
    `Total: ${(totalBefore / 1024 / 1024).toFixed(1)} MB -> ${(totalAfter / 1024 / 1024).toFixed(1)} MB  (${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(0)}% smaller)`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
