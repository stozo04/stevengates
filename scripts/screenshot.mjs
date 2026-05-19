#!/usr/bin/env node
// Headless Chromium screenshot utility for PR-evidence bundle.
//
// Usage:
//   node scripts/screenshot.mjs --url http://localhost:3000 --out screenshots/phase-a-desktop.png
//   node scripts/screenshot.mjs --url http://localhost:3000 --out screenshots/cmdk.png --press Control+k
//   node scripts/screenshot.mjs --url http://localhost:3000 --out screenshots/light.png --theme light
//
// Origin: spec § 13.c — embed 16 screenshots in the PR description.

import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const flag = argv[i];
    if (flag.startsWith("--")) {
      const key = flag.slice(2);
      out[key] = argv[i + 1];
      i++;
    }
  }
  return out;
}

const args = parseArgs(process.argv.slice(2));
const url = args.url ?? "http://localhost:3000";
const outPath = resolve(args.out ?? "screenshots/shot.png");
const width = Number(args.width ?? 1440);
const height = Number(args.height ?? 900);
const theme = (args.theme ?? "dark").toLowerCase();
const fullPage = args.fullPage === "true";
const waitMs = Number(args.waitMs ?? 1500);
const waitFor = args.waitFor;
const press = args.press;

await mkdir(dirname(outPath), { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width, height },
  deviceScaleFactor: 2,
  colorScheme: theme === "light" ? "light" : "dark",
});
const page = await context.newPage();

page.on("pageerror", (err) => {
  console.error("[pageerror]", err.message);
});

await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });

if (waitFor) {
  await page.waitForSelector(waitFor, { timeout: 10_000 });
}

if (theme === "light") {
  await page.evaluate(() => {
    const root = document.documentElement;
    root.classList.remove("dark");
    root.classList.add("light");
    try { localStorage.setItem("theme", "light"); } catch {}
  });
  await page.waitForTimeout(300);
} else {
  await page.evaluate(() => {
    const root = document.documentElement;
    root.classList.remove("light");
    root.classList.add("dark");
    try { localStorage.setItem("theme", "dark"); } catch {}
  });
  await page.waitForTimeout(300);
}

if (press) {
  await page.keyboard.press(press);
  await page.waitForTimeout(400);
}

await page.waitForTimeout(waitMs);

await page.screenshot({ path: outPath, fullPage });

await browser.close();

console.log(`saved ${outPath} (${width}x${height}, ${theme}${fullPage ? ", fullPage" : ""}${press ? `, press=${press}` : ""})`);
