// Build-time only. Used by scripts/prerender.mjs to render the homepage to
// static HTML so crawlers that do not execute JavaScript (ChatGPT's bot,
// among others) see the real page instead of an empty <div id="root">.
import {StrictMode} from 'react';
import {renderToString} from 'react-dom/server';
import App from './App.tsx';

export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
