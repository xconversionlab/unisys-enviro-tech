import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const srcDir = path.join(root, "src");
const imagesFile = path.join(srcDir, "data/site-images.ts");
const source = fs.readFileSync(imagesFile, "utf8");

// 1. Every photograph is defined once, is unique, and exists on disk.
const paths = [...source.matchAll(/src:\s*["']([^"']+\.(?:webp|png|jpe?g))["']/gi)].map((m) => m[1]);
const unique = new Set(paths);
if (paths.length !== 10 || unique.size !== 10) {
  console.error(`Expected 10 unique photographic assets; found ${paths.length} definitions / ${unique.size} unique paths.`);
  process.exit(1);
}
for (const asset of paths) {
  if (!fs.existsSync(path.join(root, "public", asset.replace(/^\//, "")))) {
    console.error(`Missing image asset: ${asset}`);
    process.exit(1);
  }
}

// 2. Every photograph is rendered exactly once across the site source.
const keys = [...source.matchAll(/^\s{2}(\w+):\s*\{/gm)].map((m) => m[1]);
const files = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(tsx?|mdx?)$/.test(entry.name) && full !== imagesFile) files.push(full);
  }
})(srcDir);
const corpus = files.map((f) => fs.readFileSync(f, "utf8")).join("\n");

let failed = false;
for (const key of keys) {
  const uses = (corpus.match(new RegExp(`siteImages\\.${key}\\.src`, "g")) ?? []).length;
  if (uses !== 1) {
    console.error(`siteImages.${key} is referenced ${uses} times (expected exactly 1).`);
    failed = true;
  }
}
// Raw path references outside site-images.ts would bypass the guard above.
for (const asset of paths) {
  if (corpus.includes(asset)) {
    console.error(`Raw path ${asset} used outside data/site-images.ts; reference it via siteImages.`);
    failed = true;
  }
}
if (failed) process.exit(1);

console.log(`OK: ${unique.size} unique site photographs are defined, present and each rendered once.`);
