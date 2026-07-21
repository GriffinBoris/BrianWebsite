<template>
  <header class="sticky top-0 z-50 border-b border-line bg-background/85 backdrop-blur-md backdrop-saturate-150">
    <div class="site-container">
      <nav ref="navRef" class="nav" aria-label="Primary">
        <RouterLink class="brand" :to="{ name: 'home' }">Brian Bakaj <span>Actor</span></RouterLink>

        <ul id="nav-links" class="nav__links" :data-open="menuOpen">
          <li v-for="item in items" :key="item.name">
            <RouterLink :to="{ name: item.name }" :class="{ 'is-active': route.name === item.name }" @click="menuOpen = false">
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>

        <div class="flex items-center gap-2.5">
          <button
            class="nav__toggle"
            type="button"
            aria-controls="nav-links"
            :aria-expanded="menuOpen"
            aria-label="Toggle menu"
            @click="menuOpen = !menuOpen"
          >
            <AppIcon icon="menu" class="h-5 w-5" />
          </button>

          <ThemeToggle />
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
  import AppIcon from "@/components/ui/AppIcon.vue";
  import ThemeToggle from "@/components/ui/ThemeToggle.vue";
  import { onBeforeUnmount, ref, watch } from "vue";
  import { useRoute } from "vue-router";

  const route = useRoute();
  const menuOpen = ref(false);
  const navRef = ref<HTMLElement | null>(null);

  const items = [
    { name: "about", label: "About" },
    { name: "contact", label: "Contact" },
  ] as const;

  // Close the mobile menu on outside clicks, the Escape key, and route changes.
  function handleClickOutside(event: MouseEvent) {
    if (menuOpen.value && navRef.value && !navRef.value.contains(event.target as Node)) {
      menuOpen.value = false;
    }
  }

  function handleEscape(event: KeyboardEvent) {
    if (event.key === "Escape") {
      menuOpen.value = false;
    }
  }

  watch(menuOpen, (open) => {
    if (open) {
      document.addEventListener("click", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    } else {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    }
  });

  watch(() => route.fullPath, () => (menuOpen.value = false));

  onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside);
    document.removeEventListener("keydown", handleEscape);
  });
</script>

<style scoped>
  .nav {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    height: 4.25rem;
  }

  .brand {
    display: inline-flex;
    align-items: baseline;
    gap: 0.5rem;
    font-size: 1.2rem;
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  .brand span {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgb(var(--color-accent));
  }

  .nav__links {
    display: flex;
    align-items: center;
    gap: clamp(1rem, 2.4vw, 2rem);
  }

  .nav__links a {
    font-size: 0.95rem;
    color: rgb(var(--color-secondary));
    transition: color var(--duration) var(--ease);
  }

  .nav__links a:hover {
    color: rgb(var(--color-body));
  }

  .nav__links a.is-active {
    color: rgb(var(--color-body));
    font-weight: 600;
  }

  .nav__toggle {
    display: none;
  }

  /* Desktop: an accent underline marks the current page. */
  @media (min-width: 640px) {
    .nav__links a {
      position: relative;
    }
    .nav__links a.is-active::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: -0.55rem;
      height: 2px;
      border-radius: 2px;
      background: rgb(var(--color-accent));
    }
  }

  /* Mobile: a contained floating card anchored under the toggle. */
  @media (max-width: 639px) {
    .nav__links {
      position: absolute;
      top: calc(100% + 0.6rem);
      right: 0;
      left: auto;
      min-width: 12rem;
      flex-direction: column;
      align-items: stretch;
      gap: 0.2rem;
      padding: 0.4rem;
      background: rgb(var(--color-surface));
      border: 1px solid rgb(var(--color-line));
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-lg);
      opacity: 0;
      visibility: hidden;
      transform: translateY(-0.4rem) scale(0.98);
      transform-origin: top right;
      transition:
        opacity var(--duration) var(--ease),
        transform var(--duration) var(--ease),
        visibility var(--duration) var(--ease);
    }

    .nav__links[data-open="true"] {
      opacity: 1;
      visibility: visible;
      transform: translateY(0) scale(1);
    }

    .nav__links a {
      padding: 0.65rem 0.85rem;
      border-radius: var(--radius-sm);
      color: rgb(var(--color-body));
    }

    .nav__links a:hover {
      background: rgb(var(--color-surface-muted));
    }

    .nav__links a.is-active {
      background: rgb(var(--color-accent) / 0.12);
      color: rgb(var(--color-accent));
    }

    .nav__toggle {
      display: inline-grid;
      place-items: center;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: var(--radius-pill);
      border: 1px solid rgb(var(--color-line));
      background: rgb(var(--color-surface));
      color: rgb(var(--color-body));
    }
  }
</style>
