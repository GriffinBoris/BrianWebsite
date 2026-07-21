<template>
  <footer class="border-t border-line py-8 text-[0.9rem] text-secondary">
    <div class="site-container flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
      <RouterLink class="font-semibold text-body transition-colors hover:text-accent" :to="{ name: 'home' }">
        Brian Bakaj
      </RouterLink>
      <div class="flex items-center gap-4">
        <p>Austin, TX &middot; Screen &amp; voice &middot; Remote-ready</p>
        <ThemeToggle />
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
  import ThemeToggle from "@/components/ui/ThemeToggle.vue";
  import { RouterLink } from "vue-router";
</script>
