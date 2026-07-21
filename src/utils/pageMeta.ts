import type { RouteLocationNormalized } from "vue-router";

// Canonical production origin (GitHub Pages project site). Keep in step with the
// vite base, robots.txt, and sitemap.xml.
const SITE_URL = "https://griffinboris.github.io/BrianWebsite";
const DEFAULT_TITLE = "Brian Bakaj, Actor";
const DEFAULT_DESCRIPTION =
  "Brian Bakaj, screen and voice actor in Austin, Texas. On camera and on mic, in English and Albanian. Hear the reels and get in touch.";

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }
  element.href = href;
}

// Keep title, description, canonical, and Open Graph URL in step with the active
// route so each page presents distinct, crawlable metadata in a client-rendered SPA.
export function applyRouteMeta(route: RouteLocationNormalized) {
  const title = typeof route.meta.title === "string" ? route.meta.title : DEFAULT_TITLE;
  const description = typeof route.meta.description === "string" ? route.meta.description : DEFAULT_DESCRIPTION;
  const canonical = route.path === "/" ? `${SITE_URL}/` : SITE_URL + route.path;

  document.title = title;
  upsertMeta("name", "description", description);
  upsertMeta("property", "og:title", title);
  upsertMeta("property", "og:description", description);
  upsertMeta("property", "og:url", canonical);
  upsertMeta("name", "twitter:title", title);
  upsertMeta("name", "twitter:description", description);
  upsertCanonical(canonical);
}
