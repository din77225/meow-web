// Tell Bing (and IndexNow partners) which URLs changed, instead of waiting to
// be re-crawled. Free. Run manually after a deploy has gone live:
//   INDEXNOW_KEY=<key> node scripts/indexnow.mjs https://miameow.ai/ https://miameow.ai/about/
// The key must also be served at https://miameow.ai/<key>.txt (see public/).
// Not wired into `npm run build` on purpose: the build runs before deploy, and
// the daily scheduled rebuild would re-ping unchanged URLs.
const key = process.env.INDEXNOW_KEY;
const urls = process.argv.slice(2);
if (!key || urls.length === 0) {
  console.error('usage: INDEXNOW_KEY=<key> node scripts/indexnow.mjs <url> [url...]');
  process.exit(2);
}
const host = new URL(urls[0]).host;
const res = await fetch('https://api.indexnow.org/IndexNow', {
  method: 'POST',
  headers: {'Content-Type': 'application/json; charset=utf-8'},
  body: JSON.stringify({host, key, keyLocation: `https://${host}/${key}.txt`, urlList: urls}),
});
console.log(`IndexNow: HTTP ${res.status} for ${urls.length} URL(s)`);
process.exit(res.ok || res.status === 202 ? 0 : 1);
