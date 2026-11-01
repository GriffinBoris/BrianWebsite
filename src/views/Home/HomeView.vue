<template>
  <div class="site-container one-sheet">
    <section class="intro" aria-labelledby="hero-title">
      <img class="intro__photo" :src="headshot" alt="Brian Bakaj, outdoor headshot" width="565" height="476" fetchpriority="high" />
      <div class="intro__text">
        <h1 id="hero-title" class="text-h1">Brian Bakaj</h1>
        <p class="mt-1 text-secondary">Voice actor in English and Albanian</p>
        <AppButton tone="link" :to="{ name: 'about' }" root-class="mt-2">
          <span>Casting profile</span>
          <AppIcon icon="arrowRight" class="h-4 w-4" />
        </AppButton>
      </div>
    </section>

    <section id="demos" class="demos" aria-labelledby="demos-title">
      <h2 id="demos-title" class="text-h2">Demos</h2>
      <div class="demos__list">
        <DemoRow v-for="track in demoTracks" :key="track.id" :track="track" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import headshot from "@/assets/img/headshot.jpg";
  import DemoRow from "@/components/player/DemoRow.vue";
  import AppButton from "@/components/ui/AppButton.vue";
  import AppIcon from "@/components/ui/AppIcon.vue";
  import { usePlayer } from "@/composables/usePlayer";
  import { demoTracks } from "@/data/demos";
  import { onMounted } from "vue";

  const { loadDurations } = usePlayer();
  onMounted(() => loadDurations(demoTracks));
</script>

<style scoped>
  /* A talent one-sheet: photo and name on the left, demos on the right. */
  .one-sheet {
    display: grid;
    grid-template-columns: minmax(16rem, 20rem) minmax(0, 1fr);
    grid-template-areas: "intro demos";
    align-items: start;
    gap: 2rem clamp(2rem, 5vw, 4rem);
    padding-block: clamp(2rem, 5vw, 3.5rem) var(--space-section);
  }

  .intro {
    grid-area: intro;
  }

  .intro__photo {
    width: 100%;
    border-radius: var(--radius-lg);
  }

  .intro__text {
    margin-top: 1.25rem;
  }

  .demos {
    grid-area: demos;
    min-width: 0;
  }

  .demos__list {
    container-type: inline-size;
    margin-top: 1rem;
    overflow: hidden;
    border: 1px solid rgb(var(--color-line));
    border-radius: var(--radius-lg);
    background: rgb(var(--color-surface));
  }

  /* On narrow screens: compact identity row, then demos straight away. */
  @media (max-width: 860px) {
    .one-sheet {
      grid-template-columns: minmax(0, 1fr);
      grid-template-areas: "intro" "demos";
    }

    .intro {
      display: grid;
      grid-template-columns: 5.5rem minmax(0, 1fr);
      grid-template-areas: "photo text";
      align-items: center;
      column-gap: 1rem;
    }

    .intro__photo {
      grid-area: photo;
      aspect-ratio: 1;
      object-fit: cover;
    }

    .intro__text {
      grid-area: text;
      margin-top: 0;
    }

  }
</style>
