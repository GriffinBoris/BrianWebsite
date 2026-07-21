---
id: project-guidance
title: Brian Website Project Guidance
description: Repository-specific guidance for Brian's actor portfolio — a hand-authored static site hosted on GitHub Pages.
kind: guidance
scope: project
name: project
tags:
  - project
  - static-site
  - portfolio
  - github-pages
applies_to:
  - project
status: active
order: 0
---

# Brian Website Project Guidance

## Purpose

- Maintain a professional actor résumé / portfolio site for Brian: a place to showcase demo reels,
  headshots and gallery images, biography, résumé, and contact information.
- The site is currently a hand-authored **static site** (semantic HTML, modern CSS, a little
  vanilla JS) with **no build step**, so it can be hosted on GitHub Pages immediately.
- The site is intended to grow into a reactive static site (see "Future Direction"). Keep the
  current structure clean and framework-agnostic so that migration stays cheap.

## Source Of Truth

- Author project-specific guidance in this file. Do not edit generated files under `.claude/`,
  `.agents/`, `.codex/`, `.gemini/`, `.opencode/`, or `.github/copilot-instructions.md`.
- `agents/` contains shared authored source installed from `GriffinBoris/Agents`. The `task
  agents:*` workflow preserves this project guidance while refreshing upstream-owned source.
- After changing authored guidance, run `task agents:generate:claude` (or `task agents:generate`
  for every harness) to rebuild integrations.
- The committed `.claude/` guidance is a generated build output kept in Git so the guidance is
  present on a fresh clone and in Claude Code web sessions. Other harness outputs
  (`.codex/`, `.gemini/`, `.opencode/`, root `AGENTS.md`/`GEMINI.md`/`opencode.json`,
  `.github/copilot-instructions.md`) are ignored by Git; regenerate them on demand.

## Repository Layout

- `index.html` — the single-page site entrypoint, served at the site root by GitHub Pages.
- `assets/css/` — stylesheets, split by concern:
  - `tokens.css` — design tokens (color, type scale, spacing) with light/dark `data-theme`
    variants. This is the single source of truth for the visual system; adapted from the
    `GriffinBoris/WebTemplate` frontend theme.
  - `base.css` — element resets and base typography.
  - `layout.css` — page shell, sections, containers, responsive rules.
  - `components.css` — buttons, cards, nav, gallery, and other reusable pieces.
- `assets/js/` — small, dependency-free scripts. `theme.js` owns the light/dark toggle
  (localStorage + `prefers-color-scheme`); `main.js` owns nav and progressive enhancement.
- `assets/img/` — headshots, gallery images, and Open Graph art. Uploaded later by the owner.
- `assets/media/` — demo reels / video (or links to external hosting for large files).
- `assets/resume/` — the downloadable résumé PDF. Uploaded later by the owner.
- `.github/workflows/pages.yml` — builds and deploys the static site to GitHub Pages.

## Conventions

- **Static, no build.** Do not introduce a bundler, package manager, or Node dependency unless
  the migration to a reactive stack is explicitly requested. Keep everything servable as plain
  files so `git push` is the only deploy step.
- **Design tokens first.** Never hard-code a raw color or font size in a component. Reference the
  CSS custom properties in `tokens.css`. Add a token before adding a one-off value.
- **Theming.** Support light and dark via `html[data-theme="…"]`. Every color must resolve from a
  token so both themes stay correct. The toggle must degrade gracefully with JS disabled.
- **Accessibility & semantics.** Use landmark elements (`header`, `nav`, `main`, `section`,
  `footer`), meaningful `alt` text, visible focus states, and sufficient contrast in both themes.
- **Performance.** Prefer optimized/responsive images, lazy-load below-the-fold media, and avoid
  blocking scripts. This is a portfolio; first impression and load speed matter.
- **Prose & tone.** Copy should read as a professional, confident actor's site — warm, concise,
  free of filler. Placeholder copy is clearly marked so the owner can replace it.
- **Content the owner supplies later** (résumé, headshots, reel) lives under `assets/` in the
  folders above. Wire the markup to those paths now; use lightweight placeholders until real
  assets land.

## Future Direction

- The site is expected to become a **reactive static site**. When that migration is requested,
  Vue 3 + Vite + Tailwind is the house stack (see `GriffinBoris/WebTemplate`), and the framework
  and Vue guidance packages in `agents/guidance/` apply. Until then, treat the Python, Django,
  and Vue guidance as reference for the eventual stack, not as active constraints on the current
  hand-authored HTML/CSS.

## Verification

- There is no test suite yet. Before committing, sanity-check the site by opening `index.html`
  in a browser (or `python3 -m http.server`) and confirm: both themes render correctly, the nav
  works, layout is responsive, and no console errors appear.
- Validate that all asset paths referenced in the markup exist (or are intentional placeholders).
