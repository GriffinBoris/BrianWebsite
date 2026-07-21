# Brian Website

An actor's résumé and portfolio site — a place for Brian to showcase demo reels,
headshots, a gallery, biography, résumé, and contact information.

It is currently a **hand-authored static site** (semantic HTML, modern CSS, a
little vanilla JS) with **no build step**, so it can be hosted on GitHub Pages as
soon as it's pushed. It's structured to grow into a reactive static site later
without throwing this work away.

## Quick start

No tooling required. To preview locally, serve the folder with anything:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Or just open `index.html` in a browser.

## Project structure

```
index.html                 # single-page site entrypoint
assets/
  css/
    tokens.css             # design tokens: color, type, spacing (light + dark)
    base.css               # resets and base typography
    layout.css             # page shell, header, hero, sections
    components.css         # buttons, cards, gallery, résumé, contact
  js/
    theme.js               # light/dark toggle (localStorage + prefers-color-scheme)
    main.js                # reveal-on-scroll and small enhancements
  img/                     # headshots, gallery images, og-cover.jpg  (upload here)
  media/                   # demo reel video, or link out to Vimeo/YouTube (upload here)
  resume/                  # brian-resume.pdf                          (upload here)
agents/                    # shared agent guidance source (see below)
.claude/                   # generated Claude guidance (committed)
.github/workflows/pages.yml  # GitHub Pages deploy
```

## Adding content

Everything the owner uploads later has a home already wired into `index.html`:

- **Headshot** — add `assets/img/headshot.jpg`, then replace the hero placeholder
  with an `<img>`.
- **Gallery** — drop images in `assets/img/` and swap each gallery `<figure>`
  placeholder for an `<img>`.
- **Demo reel** — embed a video or link to Vimeo/YouTube in the Reel section
  (or add files under `assets/media/`).
- **Résumé PDF** — add `assets/resume/brian-resume.pdf`; the download button
  already points there.
- **Text** — search `index.html` for `TODO(owner)` to find name, bio, facts,
  contact, and social links to personalize.

## Theming

Light and dark are driven by `html[data-theme="…"]` and CSS custom properties in
`tokens.css`. The toggle remembers the choice (localStorage) and otherwise
follows the operating system preference. This system is adapted from the
`GriffinBoris/WebTemplate` frontend theme.

## Hosting on GitHub Pages

1. Push to the default branch (`main`).
2. In the repo, go to **Settings → Pages → Build and deployment** and set
   **Source: GitHub Actions**.
3. The `Deploy static site to GitHub Pages` workflow publishes the site on each
   push to `main`. The live URL appears in the workflow's `deploy` step.

## Agent guidance

Shared coding guidance is installed from
[`GriffinBoris/Agents`](https://github.com/GriffinBoris/Agents) under `agents/`,
and the Claude integration is generated into `.claude/` (committed so it's
present on a fresh clone). Project-specific guidance lives in
`agents/guidance/project/guidance.md`.

Regenerate integrations after editing guidance:

```bash
task agents:generate           # rebuild every harness
task agents:generate:claude    # just the Claude target
task agents:check              # validate all guidance builds
```

(Requires [go-task](https://taskfile.dev) and Python 3. Only the `.claude/`
output is committed; other harness outputs are gitignored and regenerated on
demand.)

## Future direction

This will become a reactive static site. When that migration happens, the house
stack is Vue 3 + Vite + Tailwind (see `GriffinBoris/WebTemplate`), and the
framework/Vue guidance under `agents/` applies.

## License

[MIT](./LICENSE)
