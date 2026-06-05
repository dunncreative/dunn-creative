// Generates dark placeholder JPGs for every image path referenced across the
// content collections, so the site renders during development before real
// photography is dropped in.
//
//   npm install -D sharp
//   node scripts/gen-placeholders.js
//
// Heroes render at 1200×800, everything else at 800×600. Existing files are
// left untouched — delete a placeholder and re-run to regenerate it.

import { readFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const publicDir = join(root, 'public');
const contentDir = join(root, 'src', 'content');

const BG = { r: 26, g: 26, b: 26 };

// Collect every "/images/..." path referenced in the markdown frontmatter.
const paths = new Set();
const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
      const text = readFileSync(full, 'utf8');
      for (const m of text.matchAll(/(\/images\/[^\s"')]+\.(?:jpg|jpeg|png|webp))/gi)) {
        paths.add(m[1]);
      }
    }
  }
};
walk(contentDir);

let created = 0;
for (const rel of paths) {
  const out = join(publicDir, rel);
  if (existsSync(out)) continue;
  mkdirSync(dirname(out), { recursive: true });
  const isHero = /hero/i.test(rel);
  const [w, h] = isHero ? [1200, 800] : [800, 600];
  await sharp({ create: { width: w, height: h, channels: 3, background: BG } })
    .jpeg({ quality: 80 })
    .toFile(out);
  console.log(`created ${rel} (${w}×${h})`);
  created++;
}

console.log(created ? `\nDone — ${created} placeholder(s) created.` : 'All images already exist.');
