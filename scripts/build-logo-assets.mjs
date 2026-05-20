#!/usr/bin/env node
// Build brand mark assets by extracting them directly from the chosen logo
// mockup (logo-concept-2-calligraphic-monogram.png). The mockup contains both
// the dark-on-cream primary mark and a cream-on-forest reversed mark, so we
// extract both and use them as-is — no regeneration, no recoloring guesswork.
import sharp from 'sharp';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Source mockup is not committed to the repo (intentionally — it's a design asset, not code).
// Drop the file at this path locally, or override with: LOGO_SRC=/some/path node scripts/build-logo-assets.mjs
const SRC = resolve(
  process.env.LOGO_SRC ?? resolve(ROOT, 'design/logo-concept-2-calligraphic-monogram.png'),
);
const OUT_DIR = resolve(ROOT, 'public/images/brand');
await mkdir(OUT_DIR, { recursive: true });

const FOREST = [0x0b, 0x3d, 0x2e];
const CREAM = [0xf7, 0xf3, 0xeb];
// Gold sampled from the dot in the source mockup.
const GOLD = [0xb8, 0x95, 0x6a];

function hexFromRgb([r, g, b]) {
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}

function colorDistance(p, c) {
  const dr = p[0] - c[0];
  const dg = p[1] - c[1];
  const db = p[2] - c[2];
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

async function loadRaw(path) {
  const { data, info } = await sharp(path)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height, channels: info.channels };
}

/**
 * Scan a region for pixels that are NOT close to the background color, and
 * return the tight bounding box of those pixels.
 */
function findBoundingBox(raw, region, bgColor, threshold = 60) {
  const { data, width, channels } = raw;
  let minX = region.right, minY = region.bottom, maxX = region.left, maxY = region.top;
  let found = false;
  for (let y = region.top; y < region.bottom; y++) {
    for (let x = region.left; x < region.right; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      if (colorDistance([r, g, b], bgColor) > threshold) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
        found = true;
      }
    }
  }
  if (!found) throw new Error(`No foreground pixels found in region ${JSON.stringify(region)}`);
  return { left: minX, top: minY, right: maxX, bottom: maxY };
}

/**
 * Connected-component bounding box: flood-fill from a seed pixel and return
 * the tight bbox of all pixels reachable through "dark" (non-background)
 * neighbors. This isolates a single mark shape without bleeding into nearby
 * disconnected shapes like an adjacent wordmark.
 */
function floodFillBoundingBox(raw, seedX, seedY, bgColor, threshold = 50) {
  const { data, width, height, channels } = raw;
  const isDark = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return false;
    const idx = (y * width + x) * channels;
    return (
      colorDistance([data[idx], data[idx + 1], data[idx + 2]], bgColor) > threshold
    );
  };
  if (!isDark(seedX, seedY)) {
    throw new Error(`Seed (${seedX},${seedY}) is not a dark pixel`);
  }
  const visited = new Uint8Array(width * height);
  const stack = [[seedX, seedY]];
  let minX = seedX, maxX = seedX, minY = seedY, maxY = seedY;
  while (stack.length) {
    const [x, y] = stack.pop();
    const vidx = y * width + x;
    if (visited[vidx]) continue;
    if (!isDark(x, y)) continue;
    visited[vidx] = 1;
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
    stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    stack.push([x + 1, y + 1], [x - 1, y + 1], [x + 1, y - 1], [x - 1, y - 1]);
  }
  return { left: minX, top: minY, right: maxX, bottom: maxY };
}

function unionBox(a, b) {
  return {
    left: Math.min(a.left, b.left),
    top: Math.min(a.top, b.top),
    right: Math.max(a.right, b.right),
    bottom: Math.max(a.bottom, b.bottom),
  };
}

/** Find the first pixel in `region` (row-major) whose color is far from bg. */
function findFirstDarkPixel(raw, region, bgColor, threshold = 50) {
  const { data, width, channels } = raw;
  for (let y = region.top; y < region.bottom; y++) {
    for (let x = region.left; x < region.right; x++) {
      const idx = (y * width + x) * channels;
      const dist = colorDistance(
        [data[idx], data[idx + 1], data[idx + 2]],
        bgColor,
      );
      if (dist > threshold) return [x, y];
    }
  }
  throw new Error(`No dark pixel found in region ${JSON.stringify(region)}`);
}

/** Perpendicular distance from point p to the line segment a→b in RGB space,
 *  plus the parametric position `t` of the foot of the perpendicular along
 *  the segment (clamped to [0,1]). t=0 means p projects onto `a`, t=1 onto `b`. */
function distLineSeg(p, a, b) {
  const abx = b[0] - a[0], aby = b[1] - a[1], abz = b[2] - a[2];
  const apx = p[0] - a[0], apy = p[1] - a[1], apz = p[2] - a[2];
  const abLen2 = abx * abx + aby * aby + abz * abz;
  let t = (apx * abx + apy * aby + apz * abz) / abLen2;
  if (t < 0) t = 0;
  if (t > 1) t = 1;
  const cx = a[0] + t * abx, cy = a[1] + t * aby, cz = a[2] + t * abz;
  const dx = p[0] - cx, dy = p[1] - cy, dz = p[2] - cz;
  return { dist: Math.sqrt(dx * dx + dy * dy + dz * dz), t };
}

/** Find the pixel in `bbox` whose color is furthest from `bgColor` — i.e. the
 *  most saturated stroke pixel. Used to anchor the cream→stroke gradient line
 *  on the source's actual stroke color (not our brand color, which may be
 *  slightly different). */
function findMostSaturatedPixel(raw, bbox, bgColor) {
  const { data, width, channels } = raw;
  let best = bgColor;
  let bestDist = 0;
  for (let y = bbox.top; y <= bbox.bottom; y++) {
    for (let x = bbox.left; x <= bbox.right; x++) {
      const idx = (y * width + x) * channels;
      const c = [data[idx], data[idx + 1], data[idx + 2]];
      const d = colorDistance(c, bgColor);
      if (d > bestDist) {
        bestDist = d;
        best = c;
      }
    }
  }
  return best;
}

/**
 * Extract a mark out of the source image with halo-free transparency.
 *
 * Every source pixel is matched against two gradient lines through RGB space:
 * cream→strokeAnchor and cream→accentAnchor. The pixel is assigned to
 * whichever line it lies closest to, with the parametric position `t` along
 * that line driving the output alpha (t=0 → fully transparent, t=1 → fully
 * opaque). The output RGB is always the canonical brand color, so
 * anti-aliased edges composite cleanly onto ANY background — there is no
 * residue of the source's bg color in the output.
 *
 * `strokeOut`/`accentOut` are the canonical brand colors written to the
 * output (e.g. site `forest` and `gold`). For a reversed variant, pass the
 * cream-on-dark canonical colors instead.
 */
function extractCleanMark(
  raw,
  bbox,
  {
    bgColor,
    strokeAnchor,
    accentAnchor,
    strokeOut,
    accentOut,
    padding = 14,
    /** Perpendicular distance from gradient line at which we begin fading the
     *  pixel out. Generous by default — the only pixels we want to actually
     *  fade are noise / artifacts that don't lie near either color path. */
    perpClamp = 220,
    /** t ≤ alphaLow → fully transparent (background). */
    alphaLow = 0.18,
    /** t ≥ alphaHigh → fully opaque (stroke interior). */
    alphaHigh = 0.45,
  },
) {
  const { data, width: srcWidth, channels } = raw;
  const left = Math.max(0, bbox.left - padding);
  const top = Math.max(0, bbox.top - padding);
  const right = Math.min(raw.width, bbox.right + 1 + padding);
  const bottom = Math.min(raw.height, bbox.bottom + 1 + padding);
  const width = right - left;
  const height = bottom - top;
  const out = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const srcIdx = ((top + y) * srcWidth + (left + x)) * channels;
      const dstIdx = (y * width + x) * 4;
      const pixel = [data[srcIdx], data[srcIdx + 1], data[srcIdx + 2]];
      const strokeLine = distLineSeg(pixel, bgColor, strokeAnchor);
      const accentLine = distLineSeg(pixel, bgColor, accentAnchor);
      let outColor, t, perpDist;
      if (strokeLine.dist <= accentLine.dist) {
        outColor = strokeOut;
        t = strokeLine.t;
        perpDist = strokeLine.dist;
      } else {
        outColor = accentOut;
        t = accentLine.t;
        perpDist = accentLine.dist;
      }
      // Map t through a steep ramp: interior stroke pixels get full alpha,
      // background pixels get zero, and only a narrow band around the edges
      // is anti-aliased. This avoids washed-out interiors when the source's
      // most saturated pixel isn't actually present everywhere inside the
      // stroke.
      let alphaFromT;
      if (t <= alphaLow) alphaFromT = 0;
      else if (t >= alphaHigh) alphaFromT = 1;
      else alphaFromT = (t - alphaLow) / (alphaHigh - alphaLow);
      // Outlier pixels (far from both gradient lines) fade out.
      const perpFactor = Math.max(0, 1 - perpDist / perpClamp);
      const alpha = Math.round(alphaFromT * perpFactor * 255);
      out[dstIdx] = outColor[0];
      out[dstIdx + 1] = outColor[1];
      out[dstIdx + 2] = outColor[2];
      out[dstIdx + 3] = alpha;
    }
  }
  return { buffer: out, width, height };
}

// --- Run ---
const raw = await loadRaw(SRC);
console.log(`Source: ${raw.width}x${raw.height}`);

// The main mark in the top lockup is composed of two visually distinct but
// disconnected shapes: the Z+ذ glyph body and the gold dot floating above
// it. We find a seed pixel in each, flood-fill, and union the bounding
// boxes. Flood-fill walks the actual connected silhouette of the mark, so
// the long curling descender is captured no matter how far right it
// extends, and we won't bleed into the "Zikr Apps" wordmark because there
// is a cream gap between mark and wordmark.
const DOT_SEARCH = { left: 280, top: 150, right: 560, bottom: 240 };
const BODY_SEARCH = { left: 260, top: 280, right: 560, bottom: 520 };
const [dotX, dotY] = findFirstDarkPixel(raw, DOT_SEARCH, CREAM, 50);
const [bodyX, bodyY] = findFirstDarkPixel(raw, BODY_SEARCH, CREAM, 50);
console.log(`Seeds: dot=(${dotX},${dotY}) body=(${bodyX},${bodyY})`);
const dotBox = floodFillBoundingBox(raw, dotX, dotY, CREAM, 50);
const bodyBox = floodFillBoundingBox(raw, bodyX, bodyY, CREAM, 50);
const primaryBox = unionBox(bodyBox, dotBox);
console.log('Primary body bbox:', bodyBox);
console.log('Primary dot bbox:', dotBox);
console.log('Primary union bbox:', primaryBox);

// Sample the source's actual stroke color (most saturated dark pixel in the
// body bbox) and accent color (most saturated dot pixel). These anchor the
// gradient lines we'll project source pixels onto. They are typically close
// to but not exactly equal to our brand FOREST/GOLD because the source PNG
// is AI-generated.
const strokeAnchor = findMostSaturatedPixel(raw, bodyBox, CREAM);
const accentAnchor = findMostSaturatedPixel(raw, dotBox, CREAM);
console.log(
  `Source anchors: stroke=${hexFromRgb(strokeAnchor)} accent=${hexFromRgb(accentAnchor)}`,
);

const primary = extractCleanMark(raw, primaryBox, {
  bgColor: CREAM,
  strokeAnchor,
  accentAnchor,
  strokeOut: FOREST,
  accentOut: GOLD,
  padding: 14,
});
await sharp(primary.buffer, {
  raw: { width: primary.width, height: primary.height, channels: 4 },
})
  .png({ compressionLevel: 9 })
  .toFile(resolve(OUT_DIR, 'zikr-mark-primary.png'));
console.log(`✓ zikr-mark-primary.png (${primary.width}x${primary.height})`);

// Reversed mark: same silhouette and gradient classification as primary,
// but stroke pixels output as CREAM instead of FOREST so the mark reads on
// the dark forest background of the footer.
const reversed = extractCleanMark(raw, primaryBox, {
  bgColor: CREAM,
  strokeAnchor,
  accentAnchor,
  strokeOut: CREAM,
  accentOut: GOLD,
  padding: 14,
});
await sharp(reversed.buffer, {
  raw: { width: reversed.width, height: reversed.height, channels: 4 },
})
  .png({ compressionLevel: 9 })
  .toFile(resolve(OUT_DIR, 'zikr-mark-reversed.png'));
console.log(`✓ zikr-mark-reversed.png (${reversed.width}x${reversed.height})`);

// favicon.svg: small tile that embeds a downscaled reversed mark.
{
  const smallBuf = await sharp(resolve(OUT_DIR, 'zikr-mark-reversed.png'))
    .resize({ width: 200 })
    .png({ compressionLevel: 9 })
    .toBuffer();
  const b64 = smallBuf.toString('base64');
  const ratio = reversed.width / reversed.height;
  const innerH = 64 - 12;
  const innerW = Math.round(innerH * ratio);
  const x = Math.round((64 - innerW) / 2);
  const faviconSvg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">\n` +
    `  <rect width="64" height="64" rx="12" fill="${hexFromRgb(FOREST)}"/>\n` +
    `  <image href="data:image/png;base64,${b64}" x="${x}" y="6" width="${innerW}" height="${innerH}" preserveAspectRatio="xMidYMid meet"/>\n` +
    `</svg>\n`;
  await writeFile(resolve(ROOT, 'public/favicon.svg'), faviconSvg);
  console.log(`✓ public/favicon.svg`);
  void readFile;
}

// Instagram company profile: 1080×1080 cream square; mark scaled to fit the
// circle crop (keep content inside ~68% so corners of the bbox stay visible).
{
  const IG_SIZE = 1080;
  const MARK_MAX = Math.round(IG_SIZE * 0.68);
  const markBuf = await sharp(resolve(OUT_DIR, 'zikr-mark-primary.png'))
    .resize({ width: MARK_MAX, height: MARK_MAX, fit: 'inside' })
    .png({ compressionLevel: 9 })
    .toBuffer();
  const markMeta = await sharp(markBuf).metadata();
  const left = Math.round((IG_SIZE - markMeta.width) / 2);
  const top = Math.round((IG_SIZE - markMeta.height) / 2);
  await sharp({
    create: {
      width: IG_SIZE,
      height: IG_SIZE,
      channels: 3,
      background: { r: CREAM[0], g: CREAM[1], b: CREAM[2] },
    },
  })
    .composite([{ input: markBuf, left, top }])
    .png({ compressionLevel: 9 })
    .toFile(resolve(OUT_DIR, 'instagram-profile.png'));
  console.log(`✓ instagram-profile.png (${IG_SIZE}×${IG_SIZE}, upload as IG profile photo)`);
}
