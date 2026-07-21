<template>
  <div :class="{ 'pb-[var(--player-height)]': currentTrack }">
    <a
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-contrast"
      href="#main"
    >
      Skip to content
    </a>

    <SiteHeader />

    <main id="main" tabindex="-1" class="outline-none">
      <RouterView />
    </main>

    <SiteFooter />
  </div>

  <AudioBar />

  <!-- Announces route changes to assistive tech, since an SPA does not reload the page. -->
  <span class="sr-only" role="status" aria-live="polite">{{ routeAnnouncement }}</span>
</template>

<script setup lang="ts">
  import SiteFooter from "@/components/layout/SiteFooter.vue";
  import SiteHeader from "@/components/layout/SiteHeader.vue";
  import AudioBar from "@/components/player/AudioBar.vue";
  import { usePlayer } from "@/composables/usePlayer";
  import { ref, watch } from "vue";
  import { useRoute } from "vue-router";

  const { currentTrack } = usePlayer();

  const route = useRoute();
  const routeAnnouncement = ref("");

  const pageNames: Record<string, string> = { home: "Home", about: "About", contact: "Contact" };

  watch(
    () => route.name,
    (name) => {
      const page = pageNames[String(name)];
      routeAnnouncement.value = page ? `${page} page` : "";
    },
  );
</script>
