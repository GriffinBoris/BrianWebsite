<template>
  <footer class="theme-ink">
    <div class="site-container flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-8 text-sm">
      <p>
        <span class="font-semibold">Brian Bakaj</span>
        <a class="ml-3 text-secondary underline underline-offset-4 hover:text-body" :href="`mailto:${bookingEmail}`">{{ bookingEmail }}</a>
      </p>

      <div class="flex items-center gap-x-5">
        <ul class="flex items-center gap-x-5 text-secondary">
          <li v-for="profile in profiles" :key="profile.label">
            <a :href="profile.href" target="_blank" rel="noopener noreferrer" class="inline-flex min-h-11 items-center hover:text-body">
              {{ profile.label }}<span class="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        </ul>
        <ThemeToggle />
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
  import ThemeToggle from "@/components/ui/ThemeToggle.vue";
  import { bookingEmail, profiles } from "@/data/profiles";
</script>
