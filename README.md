# Brian Bakaj — Actor

A portfolio site for **Brian Bakaj**, an actor working **on screen and in
voiceover**. It positions him as an actor first, with his voice reels as one
prominent part of his range, and makes it easy to size him up: see the face and
the casting profile, **hear the reels in one click**, and reach him to book.

It is a **reactive static site** built on the house stack — **Vue 3 + Vite +
Tailwind v4** with TypeScript — that compiles to fully static assets and hosts on
GitHub Pages. It's a few short, focused routes rather than one long scroller, and
the design system (sapphire signature, Inter type, the voice waveform) is shared
across them.

## Quick start

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check + production build to dist/
npm run preview   # preview the production build (GitHub Pages base path)
```

## What's here

Three short routes sharing one shell, design system, and audio engine:

- **Home** (`/`) — an actor-positioned hero (name, positioning line, headshot,
  quick-listen chips, and a **waveform** that animates to Brian's actual voice
  while a demo plays), the two voice reels (`commercial-demo.mp3`,
  `narration-demo.mp3`) with a custom player and a **persistent play bar**, and a
  slim booking call-to-action.
- **About** (`/about`) — an actor bio, a casting-profile spec card, and a 3-up
  headshots gallery.
- **Contact** (`/contact`) — the booking call-to-action plus links to Brian's
  [Backstage](https://www.backstage.com/u/brian-bakaj/),
  [LinkedIn](https://www.linkedin.com/in/brian-bakaj), and
  [Facebook](https://www.facebook.com/brian.bakaj/).
- **Light/dark theme**, responsive down to mobile, self-hosted fonts.

## Project structure

```
index.html            Vite entry: meta, anti-FOUC theme snippet, #app mount
vite.config.ts         Vue + Tailwind plugins, @ alias, Pages base path
tailwind.config.js     token → semantic-utility mapping, data-theme dark mode
src/
  main.ts              app bootstrap (router + theme + mount)
  App.vue              shell: header, router view, footer, persistent audio bar
  router/              vue-router, hash history (Pages-friendly)
  views/               HomeView · AboutView · ContactView (one folder each)
  components/          layout/ · page/ · player/ · ui/(icons)
  composables/         useTheme.ts · usePlayer.ts (the audio engine)
  data/demos.ts        the demo-track list (single source of truth)
  assets/              base.css (tokens + Tailwind entry) · fonts · img · media
public/                favicon.svg · og-image.jpg · resume/ (reserved)
agents/                shared agent guidance source
.claude/               generated Claude guidance (committed)
.github/workflows/pages.yml
```

## Design notes

- **One bold idea.** The signature is the audio waveform; the palette is a
  cinematic, cool charcoal-and-off-white system with a single confident
  **sapphire** accent. Everything else stays quiet and legible.
- **Type:** Inter throughout (headings and body), self-hosted for speed and
  privacy. Hierarchy from size and weight, not a decorative face.
- **Usable, not a maze.** No scroll-triggered reveals and no endless scroll —
  content is split into short, focused pages with explicit navigation.

## Things for Brian to fill in

Search the source for `TODO(Brian)`:

- Booking email (currently a `mailto:` placeholder in `src/views/Contact/ContactView.vue`)
- Optionally: training, representation, notable clients (add to `AboutView.vue`)

To personalize demos or images, drop replacements into `src/assets/media/` and
`src/assets/img/` using the same filenames.

## Hosting on GitHub Pages

1. Push to the default branch (`main`).
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The Pages workflow runs `npm run build` and publishes `dist/` on each push to
   `main`; the live URL appears in the workflow's `deploy` step. The site is
   served under the `/BrianWebsite/` project subpath (set in `vite.config.ts`).

## Agent guidance

Shared coding guidance is installed from
[`GriffinBoris/Agents`](https://github.com/GriffinBoris/Agents) under `agents/`,
generated into `.claude/` (committed). Project-specific guidance lives in
`agents/guidance/project/guidance.md`.

```bash
task agents:generate:claude    # rebuild the Claude target after editing guidance
task agents:generate           # rebuild every harness
task agents:check              # validate all guidance builds
```

## Future direction

The site tracks the `GriffinBoris/WebTemplate` house stack (Vue 3 + Vite +
Tailwind v4). It deliberately skips app-infrastructure (pinia, PrimeVue, axios,
a backend) it doesn't need; add those only if real cross-route or async state
appears.

## License

[MIT](./LICENSE)
