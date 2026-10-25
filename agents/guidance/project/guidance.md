---
id: project-guidance
title: Brian Bakaj Website Project Guidance
description: Repository-specific guidance for Brian Bakaj's voice actor portfolio — a Vue 3 + Vite + Tailwind reactive static site hosted on GitHub Pages.
kind: guidance
scope: project
name: project
tags:
  - project
  - vue
  - vite
  - tailwind
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

- Maintain a professional portfolio site for **Brian Bakaj, voice actor**. Voice acting is his
  current focus, as confirmed by the owner. Public copy, page titles, social previews, and structured
  metadata should reflect that focus. Make it easy to hear his demos, review his profile, and contact
  him for voiceover bookings. Do not position the site around screen acting.
- The site is a **reactive static site** built on the house stack — **Vue 3 + Vite + Tailwind v4**,
  TypeScript, `vue-router` (HTML5 history) — that compiles to fully static assets. GitHub Actions runs
  the Vite build and publishes `dist/` to GitHub Pages; there is no backend, database, or API.
- It was migrated from an earlier hand-authored no-build site. The framework and Vue guidance in
  `agents/` now applies; the design system (tokens, sapphire accent, Inter type,
  voice-focused positioning) carried over intact.

## Design Intent

The design follows the frontend-design principle of **spending boldness in one place** and grounding
every choice in the subject.

- **Focused demo presentation:** the “Voice Over Demos” section contains its heading and demo cards.
  Do not add a waveform, audio visualizer, or supporting paragraph beneath the heading.
  The homepage has no “Listen to demos” button; the demo section itself provides playback and downloads.
  Home uses a single static original portrait (`headshot.jpg`), with no carousel. About keeps its
  static three-photo gallery. Keep the version-two AI portrait in the repository without active site references.
- **Palette is warm and personal:** paper-like ivory surfaces and natural ink in light mode,
  warm charcoal in dark mode, with a quiet blue accent. Keep original photography prominent,
  use restrained borders and shadows, and favor an editorial rhythm over floating dashboard cards.
  The accent is reserved for actions, focus, and active state; reading text stays on neutral tokens.
- **Type is one clean sans:** **Inter** across the whole site — headings and body alike — self-hosted
  (see below). Hierarchy comes from size, weight, and spacing, not a decorative display face. Keep it
  clean and professional; do not reintroduce an ornamental serif.
- **Usable, not a maze.** No scroll-triggered reveals or content hidden until scrolled into view.
  Everything is visible and reachable; navigation is explicit. Prefer clarity and findability over
  scroll spectacle.
- **Focused pages, not one long scroller.** The site is split into a few short pages, each doing one
  job (home, About, Contact). Keep each page tight and purposeful rather than stacking every
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

- `index.html` (root) — the Vite entry: meta tags, the anti-FOUC theme snippet, the `#app` mount, and
  the `/src/main.ts` module. It is a shell, not page content.
- `src/main.ts` — creates the app, installs the router, runs `initTheme()`, mounts `#app`.
- `src/App.vue` — the shared shell: `SiteHeader`, `<RouterView>`, `SiteFooter`, and the persistent
  `AudioBar` (which survives route changes so playback keeps going as you navigate).
- `src/router/index.ts` — `vue-router` on **HTML5 history**. GitHub Pages deep links use
  `public/404.html` and the restoration script in `index.html`; old hash links remain supported.
  Routes: `home` (`/`), `about`, `contact`. Route metadata updates client-side; social previews
  read the shared metadata in `index.html`.
- `src/views/<Name>/<Name>View.vue` — one folder per route. `HomeView` (hero, reels, booking CTA),
  `AboutView` (bio, casting-profile spec card, headshots gallery), `ContactView` (booking CTA plus
  external profile links). The current route drives the nav highlight (sapphire underline); `RouterLink` sets `aria-current` automatically.
- `src/components/` — `layout/` (`SiteHeader` with inline navigation, `SiteFooter`),
  `page/` (`PageHero` intro band), `player/` (`DemoCard`,
  `AudioBar`), `ui/` (the app-owned PrimeVue wrappers: `AppButton`, `AppIconButton`, `AppSurface`,
  `AppIcon`, `ThemeToggle`, plus `appIcons.ts` and `AppTooltip.ts`).
- `src/utils/className.ts` — `cn()` (clsx + tailwind-merge), the class combiner used by the wrappers.
- `src/composables/` — `useTheme.ts` (light/dark singleton driving `html[data-theme]`) and
  `usePlayer.ts` (the audio engine: one `Audio` element drives demo cards and the
  persistent bar; it stamps each demo's real length and
  keeps every control for the current track in sync; playback failures show a retry message).
- `src/data/demos.ts` — the demo-track list (id, title, imported `src`, download filename,
  fallback duration): the single source for reels, ordered video games, commercial, narration.
- `src/assets/` — `base.css` (Tailwind entry + `@config` + design tokens + resets + shared
  `.site-container`/`.eyebrow`/`.lead` primitives), self-hosted Inter `woff2` subsets under
  `fonts/`, `img/` (headshot + looks), and `media/` (the demo mp3s). Fonts/images/media are imported
  so Vite hashes them and rewrites URLs for the Pages base path.
- `tailwind.config.js` — maps the CSS-variable tokens onto semantic Tailwind names (`bg-surface`,
  `text-body`, `text-accent`, `rounded-lg`, `shadow-md`, …). `darkMode` keys off `[data-theme="dark"]`.
- `public/` — assets served verbatim at the site root: `favicon.svg`, `og-image.jpg` (social crawlers
  need a static URL), and `resume/` (reserved for a résumé PDF).
- `vite.config.ts` — Vue + Tailwind plugins, `@` → `src` alias, and `base: '/BrianWebsite/'` in
  production for the GitHub Pages project subpath.
- `.github/workflows/pages.yml` — installs deps, runs `npm run build`, and publishes `dist/` to Pages.

## Conventions

- **Reactive static, house stack.** Vue 3 `<script setup lang="ts">` SFCs, `vue-router`, Tailwind v4,
  and **PrimeVue in unstyled mode** — all bundled by Vite into `dist/`, so the site stays fully static
  and self-hosted (no CDN, no runtime external requests). No pinia/axios/backend — this is a brochure
  site, so keep dependencies minimal (YAGNI) and reach for a composable before a store.
- **App-owned wrappers around PrimeVue.** Route views and route-local components never import
  `primevue/*` directly. They use the app-owned wrappers under `src/components/ui/` — `AppButton`,
  `AppIconButton`, `AppSurface`, `AppIcon`, `ThemeToggle` — which own the `unstyled` `pt` maps, tones,
  sizes, focus rings, and icons (per `agents/.../vue-app-owned-wrapper-component.md`). Callers pass
  semantic props (`tone`, `size`, `icon`, `label`, `to`/`href`). `cn()` (`src/utils/className.ts`)
  merges classes; icons come from Lucide via `src/components/ui/appIcons.ts` + `AppIcon`, not inline
  SVG. The bespoke audio UI and the responsive nav shell stay custom by design.
- **Design tokens first.** Never hard-code a raw color, radius, or shadow. Use the semantic Tailwind
  utilities (`text-accent`, `bg-surface`, `border-line`, `rounded-lg`, `shadow-md`) or the CSS
  variables in `base.css`. Add a token before introducing a one-off value.
- **Tailwind-first, small components layer.** Style with Tailwind utilities in templates; the only
  shared CSS classes are the cross-cutting primitives in `base.css` (`.site-container`, `.eyebrow`,
  `.lead`, `.btn`) and component-scoped `<style>` where a pure-utility expression would be unreadable
  (the nav dropdown and the scrub range).
- **One audio engine.** All playback goes through `usePlayer`. Any new play control calls
  `toggleTrack(track)`; any new demo lives in `src/data/demos.ts`. Only one demo plays at a time and
  every control for the current track stays in sync through the shared reactive state. Do not add a
  second `Audio` element or a bespoke player.
- **Accessibility & semantics.** Landmarks, meaningful `alt`, visible focus, `aria-pressed` on
  toggles, `prefers-reduced-motion` respected.
- **Theming.** Light and dark via `html[data-theme]`; every color resolves from a token so both
  themes stay correct. The anti-FOUC snippet in `index.html` sets the theme before the app mounts.
- **Honesty in copy.** Do not fabricate credits, clients, representation, or stats. Confident,
  voice-focused prose is fine; unverified specifics (location, exact voice age, booking email)
  must be confirmed by Brian before publication.
- **Public wording.** Use plain, specific copy and natural sentences. Do not use decorative dot
  separators between words, including in the header, footer, casting profile, or page titles.
  Use words such as "and" or separate lines. Keep the header to Brian’s name and navigation. Demo reels show titles, playback controls, progress, and explicit MP3 download links, with no category labels or descriptions.
- **Performance.** Optimized images, `loading="lazy"` below the fold, self-hosted fonts, route-level
  code splitting via lazy `import()` in the router.

## Known Facts (from Brian's Backstage profile)

- Voice actor. Austin, TX. Playing age 18–27. Nonunion. English and
  **Albanian**. Records on a **Shure SM7B** in a dedicated home studio. Movement: dance. Holds a
  driver's license and passport (travel-ready). These are reflected in the About copy and the
  casting-profile card — keep them accurate, and do not invent credits he can't back up.

## Content The Owner Supplies Or Confirms Later

- **Booking email:** `brianbakaj@icloud.com`, confirmed by the owner. Keep the button and visible
  address in `ContactView.vue` in sync.
- Real training, representation, and specific credits/clients can be added to About when he has
  details he can back up. Do not invent them.
- External profiles are linked on the **Contact** page (Backstage, LinkedIn, Facebook). These
  are gated to automated fetching, so their content is linked, not scraped.

## Future Direction

- The reactive migration is done. Keep parity with the `GriffinBoris/WebTemplate` house stack as it
  evolves (Tailwind v4, Vue 3, Vite). If real cross-route or async state ever appears, introduce a
  route-local composable or a small pinia store then — not speculatively.

## Verification

- `npm run build` must pass (it runs `vue-tsc` type-check, then the Vite production build).
- No test suite. Before committing, run `npm run dev` (or `npm run preview` for the production base
  path) and confirm in a browser: both themes render, fonts load locally with no external/network
  errors, all three routes resolve, inline navigation and its active-page highlight work, the
  About headshots and the static original homepage portrait render correctly, no carousel appears, pressing a demo plays
  audio and drives the persistent bar, only one demo plays at a time, the mobile seek
  control works, and the layout is responsive with no console errors. There is no configured linter.
