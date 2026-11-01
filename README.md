# Brian Bakaj — Voice Actor

Voice actor portfolio for Brian Bakaj, based in Austin, Texas, working
in English and Albanian.

**Website:** https://griffinboris.github.io/BrianWebsite/

## Development

Vue 3, TypeScript, Vite, and Tailwind v4. The site
builds to static assets; it has no backend or database.

```bash
npm ci
npm run dev       # development server
npm run build     # TypeScript check + production build
npm run preview   # production preview at /BrianWebsite/
```

## Pages

- **Home** (`/`): a talent one-sheet. Headshot and name on the left; the demos
  (video game, commercial, narration, each with playback, seeking, and MP3
  download) and a booking prompt on the right. The bottom
  audio bar keeps playing across pages.
- **About** (`/about`): short bio, casting profile, and headshots.
- **Contact** (`/contact`): booking email (`brianbakaj@icloud.com`), what to
  include in an inquiry, and external profiles.

The design is deliberately plain: white page, near-black text, one solid indigo
accent, and Inter only. Light and dark themes are supported.

## Source layout

```text
src/
  App.vue             shared header, route outlet, footer, and audio bar
  router/             Home, About, Contact; HTML5 history
  views/              page components
  components/         layout, player, and app-owned UI wrappers
  composables/        shared audio engine and theme preference
  data/demos.ts       demo order, labels, asset imports, and durations
  data/profiles.ts    booking email and external profile links
  assets/             design tokens, fonts, images, and MP3s
  utils/              class merging and route metadata
public/               favicon, social image, sitemap, robots.txt, Pages fallback
```

## Updating content

- Add or reorder reels in `src/data/demos.ts`. Import audio from
  `src/assets/media/` so Vite generates the production URL.
- The booking email and profile links live in `src/data/profiles.ts`.
- The bio and casting profile are in `src/views/About/AboutView.vue`.
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

### Demo waveforms

Audio timelines use real RMS envelopes extracted from each demo MP3. After replacing recordings, run `npm run waveforms:generate` with Python 3 and FFmpeg installed, then commit `src/data/demo-waveforms.json` alongside the audio. The generated file includes source SHA-256 hashes. Waveforms render immediately without downloading or decoding full audio in the browser; the normal site build does not require FFmpeg.
