// Prerender the homepage into dist/index.html after `vite build`.
//
// Why: AEO. Answer engines' crawlers fetch HTML but most do not run JS. Before
// this step a non-JS crawler saw ~70 words (the <noscript> block). After it,
// they see the full page. The client then hydrates the same markup.
//
// Deterministic, $0, no network. Fails the build loudly if rendering throws,
// so a broken prerender never ships an empty page silently.
import {createServer} from 'vite';
import {readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const distIndex = path.join(root, 'dist', 'index.html');

const vite = await createServer({
  root,
  logLevel: 'error',
  server: {middlewareMode: true},
  appType: 'custom',
});

try {
  const {render} = await vite.ssrLoadModule('/src/entry-prerender.tsx');
  const appHtml = render();
  const words = appHtml.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  if (words < 200) throw new Error(`prerender produced only ${words} words; refusing to ship`);

  let html = await readFile(distIndex, 'utf8');
  const marker = '<div id="root"></div>';
  if (!html.includes(marker)) throw new Error('dist/index.html has no empty #root marker');
  html = html.replace(marker, `<div id="root">${appHtml}</div>`);
  await writeFile(distIndex, html);
  console.log(`prerender: injected ${words} words into dist/index.html`);
} finally {
  await vite.close();
}
