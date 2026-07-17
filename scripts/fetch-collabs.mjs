/**
 * fetch-collabs.mjs
 * Fetches Mia's "Collaborations" YouTube playlist and writes the collab list to
 * src/data/collabs.json. Runs as part of the build (see package.json), right
 * next to fetch-videos.mjs (which handles her own uploads).
 *
 * Why a playlist instead of a hand-maintained JSON:
 *   - Titles auto-sync from YouTube (e.g. when OpenArt renames a collab).
 *   - New collabs appear on the site just by adding them to the playlist.
 *   - No code edits, no manual JSON, no stale entries.
 *
 * The playlist is UNLISTED — the YouTube Data API can still read it with a key.
 * Add the video to the playlist "Collaborations" (PLLIkjseSwB2c) on the
 * @miameowai account and the next build picks it up.
 *
 * RULE: only videos hosted on OTHER channels belong in the playlist. Collabs
 * uploaded to Mia's own channel already surface through fetch-videos.mjs (RSS),
 * so this script also filters out own-channel videos defensively.
 *
 * Requires YOUTUBE_API_KEY in the environment (Cloudflare Pages build var, or
 * root .env locally). Cost: ~2 API units per build (well under the 10k/day free
 * quota). Degrades gracefully — keeps the existing collabs.json on any failure.
 */

import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT    = join(__dirname, '../src/data/collabs.json');

const PLAYLIST_ID    = 'PLLIkjseSwB2c';                 // "Collaborations" (unlisted)
const OWN_CHANNEL_ID = 'UCbeTqbTXZgokTvLN2KDK3uw';      // @miameowai — exclude own uploads
const SKIP_IDS       = new Set([
  '2VPGDf2Woqw',   // Barnabas podcast — intentionally not a site collab
]);
const MAX = 12;

const KEY = process.env.YOUTUBE_API_KEY;

/** Fetch JSON, throwing on an API-level error payload. */
async function fetchJson(url) {
  const res  = await fetch(url);
  const data = await res.json();
  if (data.error) {
    throw new Error(data.error.message || `YouTube API error ${res.status}`);
  }
  return data;
}

/** Infer a display tag from the title. App.tsx relabels collabs to "Collab" for
 *  the grid, so this is only for readability of the JSON itself. */
function inferTag(title = '') {
  const t = title.toLowerCase();
  if (t.includes('how') || t.includes('tutorial') || t.includes('guide') ||
      t.includes('create') || t.includes('make') || t.includes('generat')) return 'Tutorial';
  if (t.includes('music video') || t.includes('showcase')) return 'Showcase';
  if (t.includes('review') || t.includes('test') || t.includes('realistic') ||
      t.includes('best') || t.includes('ready')) return 'Review';
  return 'Collab';
}

async function run() {
  console.log('\n[fetch-collabs] Updating collab list from the Collaborations playlist...');

  if (!KEY) {
    console.warn('  [fetch-collabs] Warning: YOUTUBE_API_KEY not set — skipping.');
    if (existsSync(OUTPUT)) console.warn('  Keeping existing collabs.json — build will continue.\n');
    else console.warn('  No collabs.json found — collab section may be empty.\n');
    return;
  }

  try {
    // 1) Page through the playlist to collect video IDs (filter own-channel + skips).
    const ids = [];
    let pageToken = '';
    do {
      const page = await fetchJson(
        `https://www.googleapis.com/youtube/v3/playlistItems` +
        `?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=50` +
        (pageToken ? `&pageToken=${pageToken}` : '') + `&key=${KEY}`
      );
      for (const it of page.items || []) {
        const s   = it.snippet || {};
        const vid = s.resourceId?.videoId;
        if (!vid || SKIP_IDS.has(vid)) continue;
        if (s.videoOwnerChannelId === OWN_CHANNEL_ID) {
          console.log(`  Skipping own-channel video ${vid} (already in uploads).`);
          continue;
        }
        ids.push(vid);
      }
      pageToken = page.nextPageToken || '';
    } while (pageToken);

    if (ids.length === 0) throw new Error('Playlist returned no eligible videos.');

    // 2) Look up true titles + publish dates (playlist "added" dates are wrong for sorting).
    const detail = await fetchJson(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${ids.join(',')}&key=${KEY}`
    );

    const collabs = (detail.items || [])
      .filter(it => it.snippet?.channelId !== OWN_CHANNEL_ID)   // belt-and-suspenders
      .map(it => ({
        id:          it.id,
        title:       it.snippet.title,
        tag:         inferTag(it.snippet.title),
        publishedAt: (it.snippet.publishedAt || '').slice(0, 10),
      }))
      .sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''))
      .slice(0, MAX);

    if (collabs.length === 0) throw new Error('No collab videos after filtering.');

    writeFileSync(OUTPUT, JSON.stringify(collabs, null, 2) + '\n');
    console.log(`  Done — wrote ${collabs.length} collab(s) to src/data/collabs.json`);
    collabs.forEach(c => console.log(`    ${c.publishedAt}  ${c.id}  ${c.title.slice(0, 48)}`));
    console.log('');
  } catch (err) {
    console.warn(`\n  [fetch-collabs] Warning: ${err.message}`);
    if (existsSync(OUTPUT)) console.warn('  Keeping existing collabs.json — build will continue.\n');
    else console.warn('  No collabs.json found — collab section may be empty.\n');
  }
}

run();
