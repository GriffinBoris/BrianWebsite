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
  `agents/` now applies. The visual design was later replaced by the one-sheet redesign described below.

## Design Intent

The design follows the frontend-design principle of **spending boldness in one place** and grounding
every choice in the subject.

- **Purpose: a professional, hirable talent page for agents and casting.** The layout follows
  voiceover-industry practice researched from VO coaches and working voice-actor sites: demos play
  instantly above the fold, contact is reachable from every page, and the site reads as a real
  business rather than a design showcase. No taglines, wordplay headings, gradients, glows,
  ornamental animation, or filler copy. Headings are plain ("Demos", "About", "Casting profile",
  "Headshots", "Bookings and auditions").
- **Home is a talent one-sheet.** Left column: headshot, name, "Voice actor in English and
  Albanian", a "Request an audition" button (mailto with an "Audition request" subject), the email,
  and a short casting-profile list. Right column: the Demos list (stacked, labelled players with
  waveform, times, and MP3 download), then a short About paragraph. On phones: compact photo and
  name row, the CTA, then demos immediately.
- **Contact everywhere.** The header carries "Request an audition" (hidden on narrow screens, where
  Contact remains in the nav). The black footer repeats the email and profile links.
- **Colour: Brian's favourites, used with restraint.** White page, near-black ink, one solid indigo
  accent (blue-purple) for buttons, links, the active demo, and focus. Black footer
  (`.theme-ink`). Dark theme is near-black with a light indigo accent. Small radii; round buttons
  only for audio controls.
- **Type: Inter only** (one self-hosted variable file), semibold headings at modest sizes. No
  serif, italic emphasis, or display faces; the owner asked for normal, good fonts.
- **Do not invent credibility.** Industry sites often show client logos, testimonials, agent
  representation, and remote-session tools (Source-Connect, ipDTL). Add these only when Brian
  supplies real ones.
- No carousel. About keeps its static three-photo gallery. Keep the version-two AI portrait in the
  repository without active site references.
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
- `src/views/<Name>/<Name>View.vue` — one folder per route. `HomeView` (one-sheet: profile column, demos, short bio),
  `AboutView` (bio, casting-profile spec card, headshots gallery), `ContactView` (email, what to
  include, profile links). The header shows Demos (a `#demos` anchor on home), About, Contact, and a
  "Request an audition" button; the current page gets an accent underline.
- `src/components/` — `layout/` (`SiteHeader` with inline navigation, `SiteFooter`),
  `player/` (`DemoRow`,
  `AudioBar`, and the shared `AudioSeek` range), `ui/` (the app-owned PrimeVue wrappers: `AppButton`, `AppIconButton`,
  `AppIcon`, `ThemeToggle`, plus `appIcons.ts` and `AppTooltip.ts`).
- `src/utils/className.ts` — `cn()` (clsx + tailwind-merge), the class combiner used by the wrappers.
- `src/composables/` — `useTheme.ts` (light/dark singleton driving `html[data-theme]`) and
  `usePlayer.ts` (the audio engine: one `Audio` element drives the demo rows and the
  persistent bar; it stamps each demo's real length and
  keeps every control for the current track in sync; playback failures show a retry message).
- `src/data/demos.ts` — the demo-track list (id, title, imported `src`, download filename,
  fallback duration): the single source for reels, ordered video games, commercial, narration.
  `src/data/profiles.ts` holds the booking email and external profile links used by the footer,
  home, and Contact.
- `src/assets/` — `base.css` (Tailwind entry + `@config` + design tokens + resets + shared
  `.site-container`/`.eyebrow`/`.lead` primitives, and the `.theme-ink` scope for the black footer), the self-hosted Inter
  variable `woff2` under `fonts/`, `img/` (headshot + looks), and `media/` (the demo mp3s). Fonts/images/media are imported
  so Vite hashes them and rewrites URLs for the Pages base path.
- `tailwind.config.js` — maps the CSS-variable tokens onto semantic Tailwind names (`bg-surface`,
  `text-body`, `text-accent`, `rounded-lg`, …). `darkMode` keys off `[data-theme="dark"]`.
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
  `AppIconButton`, `AppIcon`, `ThemeToggle` — which own the `unstyled` `pt` maps, tones,
  sizes, focus rings, and icons (per `agents/.../vue-app-owned-wrapper-component.md`). Callers pass
  semantic props (`tone`, `size`, `icon`, `label`, `to`/`href`). `cn()` (`src/utils/className.ts`)
  merges classes; icons come from Lucide via `src/components/ui/appIcons.ts` + `AppIcon`, not inline
  SVG. Buttons are solid with small radii and tones `accent`, `outline`, and `link`;
  icon buttons are round audio controls; play and pause icons are filled and press motion respects reduced-motion preferences. The bespoke audio UI
  and the responsive nav shell stay custom by design.
- **Design tokens first.** Never hard-code a raw color, radius, or shadow. Use the semantic Tailwind
  utilities (`text-accent`, `bg-surface`, `border-line`, `rounded-lg`) or the CSS
  variables in `base.css`. Add a token before introducing a one-off value. For a black section,
  add `.theme-ink`; it redefines the base tokens so components inside need no special cases.
  Scoped `<style>` blocks cannot call `theme()`; use the CSS variables there.
- **Tailwind-first, small components layer.** Style with Tailwind utilities in templates; the only
  shared CSS classes are the cross-cutting primitives in `base.css` (`.site-container`, `.section`,
  `.lead`, `.theme-ink`) and component-scoped `<style>` where a pure-utility
  expression would be unreadable (grid layouts, the nav underline, the demo rows, and the scrub range). Demo rows use a
  container query so they fit both the one-sheet column and phones.
- **One audio engine.** All playback goes through `usePlayer`. Any new play control calls
  `toggleTrack(track)`; any new demo lives in `src/data/demos.ts`. Only one demo plays at a time and
  every control for the current track stays in sync through the shared reactive state. Do not add a
  second `Audio` element or a bespoke player. Reuse `AudioSeek` for the inline and persistent
  scrub controls. Inline seeking is enabled only for the current loaded reel; keep its target 44px
  tall and give active control tracks their own contrast token rather than the decorative divider token.
  Timeline envelopes come from the actual MP3 files via `npm run waveforms:generate` (Python 3 and
  FFmpeg, needed only when recordings change). Commit `src/data/demo-waveforms.json` with the audio;
  it contains 512 normalized RMS samples and a source SHA-256 for each track. `AudioSeek` groups
  those samples to fit its width, shows played progress, and retains the native keyboard/touch range.
- **Accessibility & semantics.** Landmarks, meaningful `alt`, visible focus, `aria-pressed` on
  toggles, `prefers-reduced-motion` respected.
- **Theming.** Light and dark via `html[data-theme]`; every color resolves from a token so both
  themes stay correct. The anti-FOUC snippet in `index.html` sets the theme before the app mounts.
- **Honesty in copy.** Do not fabricate credits, clients, representation, or stats. Confident,
  voice-focused prose is fine; unverified specifics (location, exact voice age, booking email)
  must be confirmed by Brian before publication.
- **Public wording.** Use plain, specific copy and natural sentences. Do not use decorative dot
  separators between words, including in the header, footer, casting profile, or page titles.
  Use words such as "and" or separate lines. Keep the header to Brian’s name and navigation. Demo reels show a title, playback control, progress, and an explicit MP3 download link, with no category labels or per-reel descriptions.
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
  errors, all three routes resolve, navigation, the Demos anchor, and the active-page dot work, the
  About headshots and the homepage portrait render correctly, each demo row plays audio and
  drives the bottom player, only one demo plays at a time, the mobile seek
  control works, and the layout is responsive with no console errors. There is no configured linter.
