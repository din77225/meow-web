import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root')!;
const tree = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Production builds ship a prerendered #root (scripts/prerender.mjs), so
// hydrate it. Dev server (and any build where prerender was skipped) starts
// from an empty container and renders from scratch.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
