<template>
  <header class="sticky top-0 z-50 border-b border-line bg-background/95 backdrop-blur">
    <nav class="site-container flex h-[var(--header-height)] items-center justify-between gap-4" aria-label="Primary">
      <RouterLink class="flex items-baseline gap-2 whitespace-nowrap" :to="{ name: 'home' }">
        <span class="text-[1.0625rem] font-bold tracking-[-0.02em]">Brian Bakaj</span>
        <span class="text-sm text-secondary max-[480px]:hidden">Voice actor</span>
      </RouterLink>

      <div class="flex items-center gap-1 sm:gap-3">
        <ul class="flex items-center">
          <li v-for="item in items" :key="item.label">
            <RouterLink :to="item.to" class="nav-link" :exact-active-class="item.to.hash ? '' : undefined">{{ item.label }}</RouterLink>
          </li>
        </ul>
        <AppButton tone="accent" :to="{ name: 'contact' }">Contact</AppButton>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
  import AppButton from "@/components/ui/AppButton.vue";
  import { RouterLink } from "vue-router";

  const items = [
    { label: "Demos", to: { name: "home", hash: "#demos" } },
    { label: "About", to: { name: "about" } },
  ];
</script>

<style scoped>
  .nav-link {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding-inline: 0.625rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: rgb(var(--color-secondary));
    transition: color var(--duration) var(--ease);
  }

  .nav-link:hover {
    color: rgb(var(--color-body));
  }

  .nav-link.router-link-exact-active {
    color: rgb(var(--color-body));
    text-decoration: underline;
    text-decoration-color: rgb(var(--color-accent));
    text-decoration-thickness: 2px;
    text-underline-offset: 0.5rem;
  }
</style>
