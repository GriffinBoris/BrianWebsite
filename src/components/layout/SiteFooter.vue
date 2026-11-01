<template>
  <footer class="theme-ink">
    <div class="site-container grid gap-8 py-12 sm:grid-cols-[1fr_auto] sm:items-end">
      <div>
        <p class="text-lg font-semibold tracking-[-0.02em]">Available for auditions and bookings</p>
        <a class="mt-2 inline-flex min-h-11 items-center text-secondary underline underline-offset-4 hover:text-body" :href="`mailto:${bookingEmail}`">
          {{ bookingEmail }}
        </a>
      </div>

      <div class="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-secondary">
        <a
          v-for="profile in profiles"
          :key="profile.label"
          :href="profile.href"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex min-h-11 items-center hover:text-body"
        >
          {{ profile.label }}<span class="sr-only"> (opens in a new tab)</span>
        </a>
        <ThemeToggle />
      </div>
    </div>
    <div class="border-t border-line">
      <p class="site-container py-5 text-sm text-secondary">Brian Bakaj, voice actor based in Austin, Texas.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
  import ThemeToggle from "@/components/ui/ThemeToggle.vue";
  import { bookingEmail, profiles } from "@/data/profiles";
</script>
