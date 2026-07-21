import { applyRouteMeta } from "@/utils/pageMeta";
import { createRouter, createWebHistory } from "vue-router";

// Clean history URLs (/about, /contact) so every route is a real, crawlable
// page. GitHub Pages has no server-side SPA fallback, so public/404.html stashes
// deep links and index.html restores them before the router boots.

// Preserve links shared under the old hash URLs (/#/about) after the switch.
if (window.location.hash.startsWith("#/")) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  window.history.replaceState(null, "", base + window.location.hash.slice(1));
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 };
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home/HomeView.vue"),
      meta: {
        title: "Brian Bakaj, Actor",
        description:
          "Brian Bakaj, screen and voice actor in Austin, Texas. On camera and on mic, in English and Albanian. Hear the reels and get in touch.",
      },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/About/AboutView.vue"),
      meta: {
        title: "About · Brian Bakaj",
        description:
          "About Brian Bakaj, an Austin screen and voice actor working on camera and on mic in English and Albanian. Casting profile, range, and recent headshots.",
      },
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("@/views/Contact/ContactView.vue"),
      meta: {
        title: "Contact · Brian Bakaj",
        description:
          "Book Brian Bakaj for commercial, narrative, explainer, and corporate work. Screen and voice, based in Austin, TX and remote-ready.",
      },
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: "home" },
    },
  ],
});

router.afterEach((to) => applyRouteMeta(to));

export default router;
