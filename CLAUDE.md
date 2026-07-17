# meow-web — miameow.ai (Mia's main site + link page)

## Why this exists
This repo IS miameow.ai. It also hosts the link-in-bio page at `/links` and the
Omni Flash prompt page at `/flow-prompt/`. Any agent changing anything under
miameow.ai works HERE. Read this before editing.

## Host + deploy (READ FIRST)
- **Host:** Cloudflare Pages, project **`meow-web`**. Auto-deploys on every push
  to GitHub **`din77225/meow-web`** `main`. Live URL while testing:
  `https://meow-web.pages.dev`.
- **Build command:** `npm run build`  **Output dir:** `dist`
- **Build env var:** `YOUTUBE_API_KEY` (set in Cloudflare Pages settings, and in
  root `.env` locally). Build-time only — it is NEVER shipped to the browser.
- **To ship a change:** commit + push to `main`. Cloudflare rebuilds in ~2 min.
- **History:** was on Netlify (retired, near plan limit). The link page was a
  separate Vercel project `din77225/mia-links` — now folded in here at `/links`.
- Full first-time setup / domain / deploy-hook steps: `DEPLOY-CLOUDFLARE.md`.

## Where each page lives (what file to edit)
| URL | File | Type |
|---|---|---|
| `/` homepage | `src/App.tsx` | React (anchor-based single page) |
| `/links` | `public/links/index.html` | Static (folded-in link-in-bio) |
| `/flow-prompt/` | `public/flow-prompt/index.html` | Static |
| `/ai-marketing-course/` | `public/ai-marketing-course/` | Static, WIP, unlinked |
| `/privacy.html`, `/404.html` | `public/` | Static |

No client-side router. Cloudflare serves static files first and falls back to
`404.html` for unknown paths, so no `_redirects` file is needed.

## The video lists update THEMSELVES — do not hand-edit the data files
Three build-time scripts run inside `npm run build`. Their JSON outputs are
GENERATED. Editing them by hand is pointless; the next build overwrites them.

| Script | Writes | Source |
|---|---|---|
| `scripts/fetch-videos.mjs` | `src/data/videos.json`, `featured.json` | @miameowai RSS (her uploads) |
| `scripts/fetch-collabs.mjs` | `src/data/collabs.json` | **Collaborations** playlist `PLLIkjseSwB2c` |
| `scripts/fetch-links-data.mjs` | `public/links-data.json` | the above + subscriber count (for `/links`) |

**To add a collab video:** save it to the unlisted **Collaborations** playlist
(`PLLIkjseSwB2c`) on the @miameowai account. ONLY videos hosted on OTHER
channels (OpenArt, Fish Audio, etc.) — collabs uploaded to Mia's own channel
already appear through her uploads. Next build shows it. Never edit
`collabs.json` by hand.

**Auto-refresh without a push:** `.github/workflows/scheduled-rebuild.yml` pings
a Cloudflare deploy hook daily (GitHub secret `CF_DEPLOY_HOOK`), so new uploads
and new playlist collabs appear on their own.

## Image rule (learned 2026-07-17)
Keep web images small. Source art is often huge (a 4.8MB 2048px cover and a
693KB avatar both caused slow loads). Downscale before committing: covers
~800px, avatars ~500px, target well under ~300KB. Keep the SAME filename so refs
don't break. Cover + avatar are already optimized; check any NEW image you add.

## Security
- `YOUTUBE_API_KEY` is used only at build time to fetch public video data. It is
  not in the built `dist` output (verified). Keep it in Cloudflare env
  (encrypted) + root `.env`. In Google Cloud Console restrict it to the
  **YouTube Data API v3** only.
- `.env` is gitignored — never commit it.

## Voice
Any copy that goes out as Mia (page text, product blurbs): **no em dashes**,
conversational. See root `USER.md` / `SOUL.md`.

## Gotchas
- `_headers` sets caching for `/links-data.json` (short) and hashed `/assets/*`
  (immutable). Leave it.
- The `/links` page reads `/links-data.json` at runtime; it degrades to plain
  "Watch on YouTube" links if that file is missing, which means the build didn't
  run the scripts (usually a missing `YOUTUBE_API_KEY`).
- One stray `public/flow-prompt/_STALE_DO_NOT_EDIT.md` got committed; the page
  next to it is the REAL one. Safe to `git rm` the marker.

## Memory map
- Deploy steps: `DEPLOY-CLOUDFLARE.md` (this repo).
- Legacy link-page notes: `projects/client/link-in-bio/CLAUDE.md` (now a pointer here).
- Cross-session memory: auto-memory `reference_mia_links_page`.
- Universal rules / voice: workspace root `CLAUDE.md`, `USER.md`, `SOUL.md`.
