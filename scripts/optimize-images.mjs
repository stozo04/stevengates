#!/usr/bin/env node
// Optimize project screenshots for Lighthouse perf — resize to 1024px wide + convert to jpg q80.
// Origin: Phase E Lighthouse first-pass had mobile perf 68 due to oversized 1.7MB milagates.png.

import sharp from "sharp";
import { readdir } from "node:fs/promises";
import { resolve } from "node:path";

const dir = resolve("public/projects");
const files = (await readdir(dir)).filter((f) => f.endsWith(".png"));

for (const f of files) {
  const inputPath = resolve(dir, f);
  const outputPath = inputPath.replace(/\.png$/, ".jpg");
  const meta = await sharp(inputPath).metadata();
  await sharp(inputPath)
    .resize({ width: 1024, withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(outputPath);
  const newMeta = await sharp(outputPath).metadata();
  console.log(`${f} → ${outputPath.split(/[/\\]/).pop()}  ${meta.width}x${meta.height} → ${newMeta.width}x${newMeta.height}`);
}
