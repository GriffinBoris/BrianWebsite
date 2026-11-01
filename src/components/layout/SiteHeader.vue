<template>
  <header class="sticky top-0 z-50 border-b border-line/70 bg-background/85 backdrop-blur-md">
    <nav class="site-container flex h-[var(--header-height)] items-center justify-between gap-4" aria-label="Primary">
      <RouterLink class="font-display text-[1.75rem] leading-none tracking-[-0.01em] whitespace-nowrap max-[380px]:text-2xl" :to="{ name: 'home' }">
        Brian Bakaj
      </RouterLink>

      <ul class="flex items-center gap-1 sm:gap-2">
        <li>
          <RouterLink :to="{ name: 'home', hash: '#demos' }" class="nav-link" exact-active-class="">Demos</RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'about' }" class="nav-link">About</RouterLink>
        </li>
        <li>
          <RouterLink
            :to="{ name: 'contact' }"
            class="ml-1 inline-flex min-h-10 items-center rounded-pill bg-body px-4 text-sm font-medium text-background transition-colors duration-[180ms] hover:bg-accent hover:text-accent-contrast sm:ml-2 sm:px-5"
            active-class="!bg-accent !text-accent-contrast"
          >
            Contact
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
  import { RouterLink } from "vue-router";
</script>

<style scoped>
  .nav-link {
    position: relative;
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding-inline: 0.625rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: rgb(var(--color-secondary));
    transition: color var(--duration) var(--ease);
  }

  .nav-link:hover,
  .nav-link.router-link-exact-active {
    color: rgb(var(--color-body));
  }

  /* The current page gets the red recording light under its label. */
  .nav-link.router-link-exact-active::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 4px;
    width: 5px;
    height: 5px;
    border-radius: 999px;
    background: rgb(var(--color-accent));
    transform: translateX(-50%);
  }
</style>
