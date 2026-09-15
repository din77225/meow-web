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

// Skool has no public API, so the member count is hand-set here. This is the ONE
// place to change it; the homepage, /links and channel.json all read from it.
// (/about/ is a dated brand-facts page and is updated by hand on purpose.)
const SKOOL_MEMBERS = '1,000+';

function formatCount(n) {
  n = parseInt(n, 10);
  if (isNaN(n))       return null;
  // Floor, never round up: 1,198,392 views is "1.1M+", not "1.2M+".
  if (n >= 1_000_000) return (Math.floor(n / 100_000) / 10).toFixed(1).replace(/\.0$/, '') + 'M+';
  if (n >= 1_000)     return Math.floor(n / 1_000) + 'K+';
  return String(n);
}

// One channels.list call (1 API unit) returns subscribers AND total views.
async function channelStats() {
  if (!KEY) return { subs: null, views: null };
  try {
    const res  = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${KEY}`);
    const data = await res.json();
    const st = data.items?.[0]?.statistics || {};
    return { subs: formatCount(st.subscriberCount), views: formatCount(st.viewCount) };
  } catch { return { subs: null, views: null }; }
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

  const { subs, views } = await channelStats();
  // If the API call failed (no key, quota), keep the last good numbers rather
  // than blanking the stats block.
  const channelPath = join(__dirname, '../src/data/channel.json');
  const prev = existsSync(channelPath) ? JSON.parse(readFileSync(channelPath, 'utf8')) : {};
  const channel = {
    subscribers: subs   || prev.subscribers || null,
    views:       views  || prev.views       || null,
    members:     SKOOL_MEMBERS,
    updated:     (subs || views) ? new Date().toISOString().slice(0, 10) : (prev.updated || null),
  };

  const payload = { videos: merged, subscribers: channel.subscribers, views: channel.views, members: channel.members };
  writeFileSync(OUTPUT, JSON.stringify(payload, null, 2) + '\n');
  // Same numbers for the homepage stats block, so the site never shows two
  // different figures (AI answers pick up inconsistent facts).
  writeFileSync(channelPath, JSON.stringify(channel, null, 2) + '\n');
  console.log(`  Done — ${merged.length} video(s), ${channel.subscribers} subscribers, ${channel.views} views, ${channel.members} members → public/links-data.json`);
  merged.forEach(v => console.log(`    ${v.publishedAt}  ${v.videoId}  ${(v.title || '').slice(0, 44)}`));
  console.log('');
}

run();
