/**
 * fetch-videos.mjs
 * Fetches the latest videos from @miameowai YouTube RSS feed and writes
 * them to src/data/videos.json. Runs as part of the build (see package.json).
 *
 * The RSS feed is free, requires no API key, and has no quota limits.
 * Duration is not available in RSS — the badge is hidden when absent.
 */

import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname       = dirname(fileURLToPath(import.meta.url));
const OUTPUT          = join(__dirname, '../src/data/videos.json');
const OUTPUT_FEATURED = join(__dirname, '../src/data/featured.json');
const TAG_OVERRIDES   = join(__dirname, '../src/data/tag-overrides.json');
const HANDLE          = 'miameowai';
const MAX             = 8;

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  'Accept-Language': 'en-US,en;q=0.9',
};

// Load manual tag overrides (video ID → tag). Takes precedence over inferTag.
const tagOverrides = existsSync(TAG_OVERRIDES)
  ? JSON.parse(readFileSync(TAG_OVERRIDES, 'utf8'))
  : {};

/** Infer a tag label from the video title + description.
 *  Title-based Tutorial/Showcase checks fire first — creator intent is clearest in the title.
 *  Description adds signal only for Review/Workflow/Use Case (less noisy for those).
 *  Returns 'Video' when no pattern matches — add to tag-overrides.json to correct. */
function inferTag(title, description = '') {
  const titleL    = title.toLowerCase();
  const combined  = (title + ' ' + description).toLowerCase();

  // Tutorial: title takes priority — "how to", "create", "make", "guide" all signal instructional intent
  if (titleL.includes('how') || titleL.includes('tutorial') || titleL.includes('guide') ||
      titleL.includes('step by step') || titleL.includes('create') || titleL.includes('make')) return 'Tutorial';

  // Use Case: strong signal in either title or description
  if (combined.includes('use case') || combined.includes('use cases')) return 'Use Case';

  // Showcase: title only — descriptions often mention other music videos as references
  if (titleL.includes('music video') || titleL.includes('showcase')) return 'Showcase';

  // Review: title or description
  if (combined.includes('review') || combined.includes('impression') || combined.includes('honest') ||
      combined.includes('test') || combined.includes('best') || combined.includes('ready')) return 'Review';

  // Workflow: title or description
  if (combined.includes('workflow') || combined.includes('system') || combined.includes('pipeline')) return 'Workflow';

  return 'Video';
}

/** Get tag for a video — manual override wins, then inferTag */
function getTag(id, title, description) {
  return tagOverrides[id] ?? inferTag(title, description);
}

/** Decode basic HTML entities */
function decodeHtml(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

async function getChannelId() {
  console.log(`  Fetching channel page for @${HANDLE}...`);
  const res = await fetch(`https://www.youtube.com/@${HANDLE}`, { headers: HEADERS });
  const html = await res.text();

  // YouTube embeds the channel ID in multiple places — try several patterns
  const patterns = [
    /"externalId":"(UC[^"]{22})"/,
    /"channelId":"(UC[^"]{22})"/,
    /channel_id=(UC[^&"]{22})/,
    /"browseId":"(UC[^"]{22})"/,
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) return m[1];
  }
  throw new Error('Channel ID not found in page HTML — YouTube may have changed its structure.');
}

async function run() {
  console.log('\n[fetch-videos] Updating video list from YouTube RSS...');

  try {
    const channelId = await getChannelId();
    console.log(`  Channel ID: ${channelId}`);

    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    console.log(`  Fetching RSS: ${rssUrl}`);
    const res = await fetch(rssUrl, { headers: HEADERS });
    if (!res.ok) throw new Error(`RSS request failed: ${res.status}`);
    const xml = await res.text();

    const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];
    const candidates = entries
      .map(([, entry]) => {
        const id          = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
        const title       = entry.match(/<title>([^<]+)<\/title>/)?.[1];
        const desc        = entry.match(/<media:description>([\s\S]*?)<\/media:description>/)?.[1] ?? '';
        const published   = entry.match(/<published>([^<]+)<\/published>/)?.[1]?.slice(0, 10) ?? '';
        if (!id || !title) return null;
        return { id, title: decodeHtml(title), tag: getTag(id, title, desc), publishedAt: published };
      })
      .filter(Boolean);

    if (candidates.length === 0) throw new Error('No videos parsed from RSS — check feed format.');

    // Filter out Shorts — if /shorts/VIDEO_ID redirects back to /shorts/, it's a Short
    console.log(`  Checking ${candidates.length} videos for Shorts...`);
    const isShort = async (id) => {
      try {
        const r = await fetch(`https://www.youtube.com/shorts/${id}`, {
          headers: HEADERS,
          redirect: 'follow',
        });
        return r.url.includes('/shorts/');
      } catch { return false; }
    };
    const shortFlags = await Promise.all(candidates.map(v => isShort(v.id)));
    const all = candidates.filter((_, i) => !shortFlags[i]);
    const skipped = candidates.length - all.length;
    if (skipped > 0) console.log(`  Skipped ${skipped} Short(s).`);

    if (all.length === 0) throw new Error('All videos were Shorts — no long-form content found.');

    // First long-form video = most recent upload → use as featured
    const featured = all[0];
    writeFileSync(OUTPUT_FEATURED, JSON.stringify(featured, null, 2));
    console.log(`  Featured: "${featured.title}" (${featured.id})`);

    // Remaining long-form videos fill the uploads grid (skip featured, cap at MAX)
    const videos = all.slice(1, MAX + 1);
    writeFileSync(OUTPUT, JSON.stringify(videos, null, 2));
    console.log(`  Done — wrote ${videos.length} videos to src/data/videos.json\n`);
  } catch (err) {
    console.warn(`\n  [fetch-videos] Warning: ${err.message}`);
    if (existsSync(OUTPUT)) {
      console.warn('  Keeping existing videos.json — build will continue.\n');
    } else {
      console.warn('  No existing videos.json found — build may fail. Check your internet connection.\n');
    }
  }
}

run();
