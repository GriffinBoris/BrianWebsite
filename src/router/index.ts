import { applyRouteMeta } from "@/utils/pageMeta";
import { createRouter, createWebHistory } from "vue-router";

// GitHub Pages has no server-side SPA fallback, so public/404.html stashes
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
        title: "Brian Bakaj, Voice Actor",
        description:
          "Brian Bakaj is a voice actor based in Austin, Texas, working in English and Albanian. Listen to his voice demos and contact him for bookings.",
      },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/About/AboutView.vue"),
      meta: {
        title: "About Brian Bakaj",
        description:
          "Learn about Brian Bakaj, a voice actor in Austin, Texas. View his casting profile and headshots.",
      },
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("@/views/Contact/ContactView.vue"),
      meta: {
        title: "Contact Brian Bakaj",
        description:
          "Contact Brian Bakaj about voiceover bookings, auditions, and project availability.",
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
