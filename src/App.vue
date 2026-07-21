<template>
  <div :class="{ 'pb-[var(--player-height)]': currentTrack }">
    <a
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-contrast"
      href="#main"
    >
      Skip to content
    </a>

    <SiteHeader />

    <main id="main">
      <RouterView />
    </main>

    <SiteFooter />
  </div>

  <AudioBar />
</template>

<script setup lang="ts">
  import SiteFooter from "@/components/layout/SiteFooter.vue";
  import SiteHeader from "@/components/layout/SiteHeader.vue";
  import AudioBar from "@/components/player/AudioBar.vue";
  import { usePlayer } from "@/composables/usePlayer";

  const { currentTrack } = usePlayer();
</script>
