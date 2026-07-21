---
id: project-guidance
title: Brian Bakaj Website Project Guidance
description: Repository-specific guidance for Brian Bakaj's voice-actor portfolio — a hand-authored static site hosted on GitHub Pages.
kind: guidance
scope: project
name: project
tags:
  - project
  - static-site
  - portfolio
  - voice-actor
  - github-pages
applies_to:
  - project
status: active
order: 0
---

# Brian Bakaj Website Project Guidance

## Purpose

- Maintain a professional portfolio site for **Brian Bakaj, voice actor** (commercial and
  narration). The site's primary job is to let a casting director, producer, or agency **hear the
  demos in one click** and reach him quickly — it is a listen-first booking tool, not a scrapbook.
- The site is a hand-authored **static site** (semantic HTML, modern CSS, dependency-free JS) with
  **no build step**, so `git push` is the only deploy step and it hosts on GitHub Pages immediately.
- It is intended to grow into a reactive static site (see "Future Direction"). Keep the current
  structure clean and framework-agnostic so migration stays cheap.

## Design Intent

The design follows the frontend-design principle of **spending boldness in one place** and grounding
every choice in the subject.

- **Signature element:** the hero **waveform** (`#waveform`, driven by `player.js`). At rest it
  breathes slowly; while a demo plays it is animated by the Web Audio analyser, so the bars are
  literally Brian's voice. This is the one orchestrated motion moment — do not scatter other
  decorative animations across the page.
- **Palette is grounded in the subject:** the signature color is the **oxblood** of Brian's own
  headshot wardrobe (`--color-accent`), carried by warm bone paper and near-black ink. Avoid generic
  defaults (cream + terracotta, etc.). The accent is reserved for actions, focus, active state, and
  the waveform — reading text stays on neutral tokens.
- **Type is a deliberate pairing:** **Fraunces** (theatrical display serif, personality) with
  **Inter** (quiet UI/reading). Both are self-hosted (see below).
- **Usable, not a maze.** No scroll-triggered reveals or content hidden until scrolled into view.
  Everything is visible and reachable; navigation is explicit. Prefer clarity and findability over
  scroll spectacle.
- **Focused pages, not one long scroller.** The site is split into a few short pages, each doing one
  job (Listen, About, Contact). Keep each page tight and purposeful rather than stacking every
  section onto the home page.

## Source Of Truth

- Author project-specific guidance in this file. Do not edit generated files under `.claude/`,
  `.agents/`, `.codex/`, `.gemini/`, `.opencode/`, or `.github/copilot-instructions.md`.
- `agents/` contains shared authored source installed from `GriffinBoris/Agents`. The `task
  agents:*` workflow preserves this project guidance while refreshing upstream-owned source.
- After changing authored guidance, run `task agents:generate:claude` (or `task agents:generate`).
- The committed `.claude/` guidance is a generated build output kept in Git so guidance is present
  on a fresh clone and in Claude Code web sessions. Other harness outputs are gitignored.

## Repository Layout

- `index.html` — the **Listen** home page (hero, quick-listen chips, waveform, the two demo players,
  and a slim booking CTA), served at the site root by GitHub Pages.
- `about.html` — bio, voice-profile spec card, and the headshots gallery.
- `contact.html` — the booking call-to-action plus the "find Brian elsewhere" profile links
  (Backstage, LinkedIn, Facebook).
- The header/nav and footer are duplicated across the three pages by hand (no build step, no
  templating). The nav is `Listen · About · Contact`; the current page carries `aria-current="page"`.
  Only the home page includes the persistent audio bar and `player.js`.
- `assets/css/` — `tokens.css` (design tokens, light/dark `data-theme`, single source of truth),
  `base.css` (resets/typography), `layout.css` (shell, header, hero, page-hero, sections),
  `components.css` (buttons/link rows, waveform, demo players, persistent audio bar, voice profile,
  headshots, contact, booking CTA).
- `assets/js/` — dependency-free. `theme.js` (light/dark toggle), `main.js` (mobile nav + footer
  year), `player.js` (the audio engine: one `<audio>` drives the demo cards, hero quick-listen
  chips, persistent bottom bar, and the Web Audio waveform; it also stamps each demo's real length
  onto its card and matching hero chip, and no-ops on pages with no player).
- `assets/fonts/` — **self-hosted** Fraunces + Inter latin `woff2` subsets and `fonts.css`. No
  external font requests; keeps the site self-contained, fast, and CSP-friendly.
- `assets/img/` — `headshot.jpg` (primary), `brian-look-01/02.jpg`, `favicon.svg`.
- `assets/media/` — the demo audio (`commercial-demo.mp3`, `narration-demo.mp3`).
- `assets/resume/` — reserved for a résumé PDF if one is added later.
- `.github/workflows/pages.yml` — deploys the static site to GitHub Pages.

## Conventions

- **Static, no build.** Do not add a bundler, package manager, or Node dependency unless the
  reactive migration is explicitly requested.
- **Design tokens first.** Never hard-code a raw color or font size; reference the custom properties
  in `tokens.css`. Add a token before introducing a one-off value.
- **One audio engine.** All playback goes through `player.js`. Any new play control is a
  `[data-track]` element with `data-src`/`data-title`/`data-kicker`; any new demo card is a
  `[data-demo][data-src]`. Only one demo plays at a time and every control for the current track
  stays in sync. Do not add a second `<audio>` or bespoke player.
- **Accessibility & semantics.** Landmarks, meaningful `alt`, visible focus, `aria-pressed` on
  toggles, `prefers-reduced-motion` respected (waveform falls back to a static rest state).
- **Theming.** Light and dark via `html[data-theme]`; every color resolves from a token so both
  themes stay correct. The toggle degrades gracefully without JS.
- **Honesty in copy.** Do not fabricate credits, clients, representation, or stats. Confident,
  voice-focused prose is fine; unverified specifics (location, exact voice age, booking email) are
  marked with `TODO(Brian)` and/or the `.needs-detail` class for him to confirm.
- **Performance.** Optimized images, `loading="lazy"` below the fold, self-hosted fonts, deferred
  non-critical scripts.

## Known Facts (from Brian's Backstage profile)

- Austin, TX. Playing age 18–27. Nonunion. Voices in **English and Albanian**. Records on a
  **Shure SM7B** in a dedicated home studio. Additional skill: dance; has a driver's license and
  passport. These are reflected in the About copy and voice-profile spec card — keep them accurate.

## Content The Owner Supplies Or Confirms Later

- **Booking email** is still a `mailto:` placeholder (`TODO(Brian)` in `contact.html`) — the only
  remaining unknown. Replace it once Brian provides a real address.
- Real training, representation, and specific credits/clients can be added to About when he has
  details he can back up. Do not invent them.
- External profiles are linked on the **Contact** page (Backstage, LinkedIn, Facebook). These
  are gated to automated fetching, so their content is linked, not scraped.

## Future Direction

- The site is expected to become a **reactive static site**. When that migration is requested, the
  house stack is Vue 3 + Vite + Tailwind (see `GriffinBoris/WebTemplate`), and the framework/Vue
  guidance in `agents/` applies. The design system (tokens, oxblood signature, Fraunces/Inter,
  waveform, listen-first IA) should carry over intact.

## Verification

- No test suite. Before committing, serve the site (`python3 -m http.server`) and confirm in a
  browser: both themes render, fonts load locally with no external/network errors, the nav works
  (including the mobile menu), pressing a demo plays audio and drives the persistent bar + waveform,
  only one demo plays at a time, and the layout is responsive with no console errors.
- Validate that every referenced asset path exists.
