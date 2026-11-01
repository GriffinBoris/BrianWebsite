<template>
  <footer class="border-t border-line">
    <div class="site-container flex flex-wrap items-center justify-between gap-x-8 gap-y-4 py-8 text-sm text-secondary">
      <div>
        <RouterLink class="text-base font-bold tracking-[-0.03em] text-body" :to="{ name: 'home' }">Brian Bakaj</RouterLink>
        <p class="mt-1">Voice actor based in Austin, Texas.</p>
      </div>

      <div class="flex flex-wrap items-center gap-x-5 gap-y-2">
        <a
          v-for="profile in profiles"
          :key="profile.label"
          :href="profile.href"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex min-h-11 items-center hover:text-accent"
        >
          {{ profile.label }}<span class="sr-only"> (opens in a new tab)</span>
        </a>
        <ThemeToggle />
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
  import ThemeToggle from "@/components/ui/ThemeToggle.vue";
  import { profiles } from "@/data/profiles";
  import { RouterLink } from "vue-router";
</script>
