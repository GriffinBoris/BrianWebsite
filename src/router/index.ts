import { createRouter, createWebHashHistory } from "vue-router";

// Hash history keeps the site a single deployable file, so GitHub Pages serves
// every route without a server-side SPA fallback.
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 };
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home/HomeView.vue"),
      meta: { title: "Brian Bakaj, Actor" },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/About/AboutView.vue"),
      meta: { title: "About · Brian Bakaj" },
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("@/views/Contact/ContactView.vue"),
      meta: { title: "Contact · Brian Bakaj" },
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: "home" },
    },
  ],
});

router.afterEach((to) => {
  const title = to.meta.title;
  if (typeof title === "string") {
    document.title = title;
  }
});

export default router;
