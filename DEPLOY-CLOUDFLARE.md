# Deploying miameow.ai on Cloudflare Pages

This is the step-by-step to move miameow.ai from Netlify to Cloudflare Pages,
with the link-in-bio page folded in at `/links` and video lists that update
themselves. Follow it top to bottom. Anything marked **[you]** is a click you do
in a dashboard; the code side is already done.

## What changed in the repo (already done)

- `scripts/fetch-collabs.mjs` pulls your **Collaborations** playlist
  (`PLLIkjseSwB2c`) at build time and writes `src/data/collabs.json`. No more
  hand-editing that file. Only videos on OTHER channels belong in the playlist;
  own-channel collabs already show up through your uploads.
- `scripts/fetch-links-data.mjs` writes `public/links-data.json` (the newest
  videos + your subscriber count) for the `/links` page.
- `public/links/` is the link-in-bio page, folded in. It reads the static
  `/links-data.json` instead of the old Vercel API. Discount is set to 25% off.
- `public/flow-prompt/` is your Omni Flash prompt page, so it lands at
  `/flow-prompt/` automatically.
- `public/_headers` sets sane caching. `.github/workflows/scheduled-rebuild.yml`
  refreshes the live site daily without a push.
- `package.json` build now runs: fetch-videos, fetch-collabs, fetch-links-data,
  then Vite.

## Step 1 — push the changes **[you]**

From your machine, in the `meow-web` folder:

```bash
git rm --cached public/links/_STALE_DO_NOT_EDIT.md public/flow-prompt/_STALE_DO_NOT_EDIT.md 2>/dev/null
git add -A
git commit -m "Fold link-in-bio into /links, auto-fetch collabs from playlist, Cloudflare config"
git push
```

(The two `_STALE_DO_NOT_EDIT.md` markers are obsolete now that the page is the
real one. Removing them is optional but tidy.)

## Step 2 — create the Cloudflare Pages project **[you]**

1. Cloudflare dashboard > **Workers & Pages** > **Create** > **Pages** >
   **Connect to Git**.
2. Pick the **`din77225/meow-web`** repo, branch **`main`**.
3. Build settings:
   - **Framework preset:** None (or Vite)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. **Environment variables** > add:
   - `YOUTUBE_API_KEY` = your key (same one Netlify uses). The build needs it to
     read the playlist and subscriber count. Without it the build still succeeds
     and keeps the last committed data.
5. **Save and Deploy.** First build takes a couple of minutes. You will get a
   `*.pages.dev` URL to check before pointing the domain.

Open `your-project.pages.dev/links` and `.../flow-prompt/` to confirm they work.

## Step 3 — attach the miameow.ai domain **[you]**

1. In the Pages project > **Custom domains** > **Set up a custom domain** >
   enter `miameow.ai` (and add `www.miameow.ai` if you use it).
2. If your DNS is already on Cloudflare, it wires the records automatically.
   If DNS is elsewhere, Cloudflare shows the CNAME/records to add.
3. Wait for the domain to go **Active** (usually minutes). SSL is automatic.

## Step 4 — turn on the daily auto-refresh **[you]**

1. Pages project > **Settings** > **Builds & deployments** > **Deploy hooks** >
   **Add deploy hook**. Name it `scheduled`, branch `main`. Copy the URL.
2. GitHub > `din77225/meow-web` > **Settings** > **Secrets and variables** >
   **Actions** > **New repository secret**:
   - Name: `CF_DEPLOY_HOOK`
   - Value: the deploy-hook URL
3. Done. The workflow in `.github/workflows/scheduled-rebuild.yml` pings that
   hook every morning, so new uploads and new playlist collabs appear on their
   own. You can also fire it manually from the repo's **Actions** tab.

## Step 5 — retire the old hosts **[you]**

- **Netlify:** once miameow.ai serves from Cloudflare and looks right, pause or
  delete the Netlify site so it stops building the same repo.
- **Vercel (mia-links):** you only link your bio to Instagram, so the plan is to
  point your IG bio at `https://miameow.ai/links`. If any old video descriptions
  link to `mia-links.vercel.app/flow-prompt/`, either leave the Vercel project up
  as a redirect or update those links. Otherwise you can retire it too.

## Adding a future collab (the new way)

1. Open the collab video on the OTHER channel.
2. Save it to your **Collaborations** playlist (the unlisted one, `PLLIkjseSwB2c`).
3. That's it. Next daily rebuild (or a manual Actions run) shows it on the site.
   Do NOT add collabs that are uploaded to your own channel; those appear on
   their own.

## If something looks off

- Videos not updating: check the build log in Cloudflare for the
  `[fetch-collabs]` / `[fetch-links-data]` lines, and confirm `YOUTUBE_API_KEY`
  is set in the Pages environment.
- `/links` shows no videos: the page degrades gracefully to "Watch on YouTube"
  links, which means `/links-data.json` did not load. Re-check the build ran the
  scripts.
