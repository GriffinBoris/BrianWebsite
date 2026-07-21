# Brian Bakaj — Voice Actor

A portfolio site for **Brian Bakaj**, a voice actor working in commercial and
narration. It's built to do one job well: let someone **hear the demos in one
click** and reach Brian to book him.

It is a **hand-authored static site** (semantic HTML, modern CSS, dependency-free
JS) with **no build step**, so it hosts on GitHub Pages the moment it's pushed.
It's a few short, focused pages rather than one long scroller, and it's
structured to grow into a reactive static site later without throwing this work
away.

## Quick start

No tooling required. To preview locally:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## What's here

Three short pages sharing one header, footer, and design system:

- **Listen** (`index.html`) — the home page. A listen-first hero (name,
  positioning line, headshot, quick-listen chips, and a **waveform** that
  animates to Brian's actual voice while a demo plays), the two reels
  (`commercial-demo.mp3`, `narration-demo.mp3`) with a custom player and a
  **persistent play bar**, and a slim booking call-to-action.
- **About** (`about.html`) — a voice-focused bio, a voice-profile spec card, and
  a 3-up headshots gallery.
- **Contact** (`contact.html`) — the booking call-to-action plus links to Brian's
  [Backstage](https://www.backstage.com/u/brian-bakaj/),
  [LinkedIn](https://www.linkedin.com/in/brian-bakaj), and
  [Facebook](https://www.facebook.com/brian.bakaj/).
- **Light/dark theme**, responsive down to mobile, self-hosted fonts.

## Project structure

```
index.html         Listen (home): hero + demos + booking CTA
about.html         Bio, voice profile, headshots
contact.html       Booking + profile links
assets/
  css/     tokens.css · base.css · layout.css · components.css
  js/      theme.js (light/dark) · main.js (nav, year) · player.js (audio engine)
  fonts/   self-hosted Fraunces + Inter woff2 + fonts.css
  img/     headshot.jpg · brian-look-01/02.jpg · favicon.svg
  media/   commercial-demo.mp3 · narration-demo.mp3
  resume/  (reserved for a résumé PDF)
agents/            shared agent guidance source
.claude/           generated Claude guidance (committed)
.github/workflows/pages.yml
```

## Design notes

- **One bold idea, grounded in the subject.** The signature is the audio
  waveform; the palette's signature color is the **oxblood** of Brian's own
  headshot wardrobe. Everything else stays quiet and legible.
- **Type:** Fraunces (display) + Inter (UI), self-hosted for speed and privacy.
- **Usable, not a maze.** No scroll-triggered reveals and no endless scroll —
  content is split into short, focused pages with explicit navigation.

## Things for Brian to fill in

Search the HTML for `TODO(Brian)`:

- Booking email (currently a `mailto:` placeholder in `contact.html`)
- Optionally: training, representation, notable clients (add to `about.html`)

To personalize demos or images, drop replacements into `assets/media/` and
`assets/img/` using the same filenames.

## Hosting on GitHub Pages

1. Push to the default branch (`main`).
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The `Deploy static site to GitHub Pages` workflow publishes on each push to
   `main`; the live URL appears in the workflow's `deploy` step.

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

This will become a reactive static site. When that happens, the house stack is
Vue 3 + Vite + Tailwind (see `GriffinBoris/WebTemplate`), and the design system
here carries over intact.

## License

[MIT](./LICENSE)
