# Brian Bakaj — Voice Actor

Voice actor portfolio for Brian Bakaj, based in Austin, Texas, working
in English and Albanian.

**Website:** https://griffinboris.github.io/BrianWebsite/

## Development

Vue 3, TypeScript, Vite, Tailwind v4, and PrimeVue in unstyled mode. The site
builds to static assets; it has no backend or database.

```bash
npm ci
npm run dev       # development server
npm run build     # TypeScript check + production build
npm run preview   # production preview at /BrianWebsite/
```

## Pages

- **Home** (`/`): introduction with a static original portrait, voice demos, and booking links. Demo order:
  video games, commercial, narration. Each reel supports playback;
  the shared audio bar keeps playing across pages and supports seeking on mobile.
- **About** (`/about`): bio, casting profile, and headshots.
- **Contact** (`/contact`): booking email (`brianbakaj@icloud.com`) and external profiles.

Light and dark themes use shared CSS tokens. Fonts are self-hosted. The Voice Over Demos
section contains only its heading and demo cards, with no visualizer or supporting text.
Home shows the original outdoor portrait as a static image. About retains the three-photo gallery.

## Source layout

```text
src/
  App.vue             shared header, route outlet, footer, and audio bar
  router/             Home, About, Contact; HTML5 history
  views/              page components
  components/         layout, page, player, and app-owned UI wrappers
  composables/        shared audio engine and theme preference
  data/demos.ts       demo order, labels, asset imports, and durations
  assets/             design tokens, fonts, images, and MP3s
  utils/              class merging and route metadata
public/               favicon, social image, sitemap, robots.txt, Pages fallback
```

## Updating content

- Add or reorder reels in `src/data/demos.ts`. Import audio from
  `src/assets/media/` so Vite generates the production URL.
- Booking links and the visible email live in `src/views/Contact/ContactView.vue`.
- Update the bio and casting profile in `src/views/About/AboutView.vue`.
- Keep credits, representation, and client claims limited to confirmed facts.

## GitHub Pages

Set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**.
Pushes to `main` build and deploy `dist/` through `.github/workflows/pages.yml`.
The production base path is `/BrianWebsite/` in `vite.config.ts`.

Routes use clean URLs. GitHub Pages deep links pass through `public/404.html`,
which redirects to the app root; `index.html` restores the path before Vue boots.
Old hash links remain supported. This is a client-rendered site: route metadata
updates during navigation, but social previews read the shared HTML metadata.

Before shipping, run the production build and check all three routes in both
themes, narrow and wide layouts, the About gallery, demo playback, seeking,
playback across route changes, and the booking links. There is no
configured linter or automated test suite.

## Agent guidance

Shared guidance comes from [GriffinBoris/Agents](https://github.com/GriffinBoris/Agents).
Project-specific source is `agents/guidance/project/guidance.md`. Generated
Claude guidance under `.claude/` is committed; edit the source and regenerate:

```bash
task agents:generate:claude
task agents:check
```

## License

[MIT](./LICENSE)
