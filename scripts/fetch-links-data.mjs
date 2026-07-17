/**
 * fetch-links-data.mjs
 * Composes public/links-data.json for the /links page (the folded-in link-in-bio).
 *
 * The /links page is static HTML (no serverless function on Cloudflare). It fetches
 * /links-data.json at load and fills in the "latest videos" cards + subscriber count.
 * This script rebuilds that JSON every build from the data the other two fetchers
 * already produced (featured.json + videos.json = uploads, collabs.json = collabs),
 * so /links auto-updates on the same cadence as the main site with no manual edits.
 *
 * Run AFTER fetch-videos.mjs and fetch-collabs.mjs (see package.json build chain).
 *
 * Subscriber count needs one channels.list call (1 API unit). If YOUTUBE_API_KEY is
 * absent the page keeps whatever count is hard-coded in the HTML — videos still work.
 */

import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA      = join(__dirname, '../src/data');
const OUTPUT    = join(__dirname, '../public/links-data.json');

const CHANNEL_ID = 'UCbeTqbTXZgokTvLN2KDK3uw'; // @miameowai
const COUNT      = 4;
const KEY        = process.env.YOUTUBE_API_KEY;

function readJson(name, fallback) {
  const p = join(DATA, name);
  if (!existsSync(p)) return fallback;
  try { return JSON.parse(readFileSync(p, 'utf8')); } catch { return fallback; }
}

function formatCount(n) {
  n = parseInt(n, 10);
  if (isNaN(n))       return null;
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M+';
  if (n >= 1_000)     return Math.floor(n / 1_000) + 'K+';
  return String(n);
}

async function subscribers() {
  if (!KEY) return null;
  try {
    const res  = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${KEY}`);
    const data = await res.json();
    return formatCount(data.items?.[0]?.statistics?.subscriberCount);
  } catch { return null; }
}

async function run() {
  console.log('\n[fetch-links-data] Composing public/links-data.json for /links...');

  const featured = readJson('featured.json', null);
  const uploads  = readJson('videos.json', []);
  const collabs  = readJson('collabs.json', []);

  // Merge uploads (featured + grid) with collabs, dedupe by id, newest first.
  const seen = new Set();
  const merged = [...(featured ? [featured] : []), ...uploads, ...collabs]
    .filter(v => v && v.id && !seen.has(v.id) && seen.add(v.id))
    .sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''))
    .slice(0, COUNT)
    .map(v => ({
      videoId:     v.id,
      title:       v.title,
      url:         `https://www.youtube.com/watch?v=${v.id}`,
      publishedAt: v.publishedAt || '',
    }));

  const subs = await subscribers();

  const payload = { videos: merged, subscribers: subs };
  writeFileSync(OUTPUT, JSON.stringify(payload, null, 2) + '\n');
  console.log(`  Done — ${merged.length} video(s)${subs ? `, ${subs} subscribers` : ' (subscribers unchanged)'} → public/links-data.json`);
  merged.forEach(v => console.log(`    ${v.publishedAt}  ${v.videoId}  ${(v.title || '').slice(0, 44)}`));
  console.log('');
}

run();
