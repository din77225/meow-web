---
tags: [website, qa, launch]
---
# Mia Meow Creator Launch Verification 2026-09-24

Approved dark creator homepage, personal footer option 2. Final Skool wordmark uses a tightly cropped 58×24px slot, matching the visual height of the neighboring social icons. Mia requested this smaller size after viewing the enlarged version. Community card has 32px/80px top/bottom margins on desktop and 24px/48px on mobile. Course signup uses the dedicated published Google Form. Business email is mia@miameow.ai.

Validation:
- Production build and TypeScript check pass.
- Ten unique recent upload/collaboration cards render into static HTML at build time, followed by the full channel link. Existing scheduled refresh remains active.
- Subscriber count renders into static HTML and refreshes from the public JSON source in the browser. Source update date is retained; Skool remains manual.
- All homepage asset references resolve; all images declare dimensions; structured data parses; canonical and index/follow are present.
- Mobile menu opens/closes with Escape. Footer links and anchors resolve; all footer links have at least 44px height.
- No horizontal overflow at 390px or desktop width.
- Axe finds zero definite violations at 390px and 1440px. Contrast over hero imagery/offscreen carousel cards remains an incomplete automated check. Visible content was inspected manually. The harness waits for finite entrance animations before measuring contrast.
- Decorative video sources are deferred until near the viewport.
- Privacy page now describes required and optional course signup fields, purpose, storage in Google Forms, and removal/contact options.
- Cloudflare security headers are unchanged. No preview controls, test harness, or design explorations ship.

The before-launch website-check score measures the previously live site, not this redesign. Its missing pre-commit-hook warning is a linked-worktree detection limitation: `git rev-parse --git-path hooks/pre-commit` resolves to the existing executable hook in the main repository. Lighthouse was not run, so these results are not a Lighthouse performance score. No form response was submitted.
