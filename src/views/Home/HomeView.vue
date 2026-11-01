<template>
  <div class="site-container one-sheet">
    <section class="intro" aria-labelledby="hero-title">
      <img class="intro__photo" :src="headshot" alt="Brian Bakaj, outdoor headshot" width="565" height="476" fetchpriority="high" />
      <div class="intro__text">
        <h1 id="hero-title" class="text-h1">Brian Bakaj</h1>
        <p class="mt-1 text-secondary">Voice actor in English and Albanian</p>
      </div>
    </section>

    <section id="demos" class="demos" aria-labelledby="demos-title">
      <h2 id="demos-title" class="text-h2">Demos</h2>
      <div class="demos__list">
        <DemoRow v-for="track in demoTracks" :key="track.id" :track="track" />
      </div>

      <div class="booking">
        <div>
          <h2 class="text-h3">Bookings and auditions</h2>
          <p class="mt-1 text-sm text-secondary">Send the project, the role, your dates, and a script or brief.</p>
        </div>
        <AppButton tone="accent" :href="auditionRequestHref">Request an audition</AppButton>
      </div>
    </section>

    <section class="facts" aria-labelledby="facts-title">
      <h2 id="facts-title" class="text-h3">Casting profile</h2>
      <dl>
        <div v-for="fact in facts" :key="fact.label" class="facts__row">
          <dt>{{ fact.label }}</dt>
          <dd>{{ fact.value }}</dd>
        </div>
      </dl>
      <AppButton tone="link" :to="{ name: 'about' }" root-class="mt-2">
        <span>Bio and headshots</span>
        <AppIcon icon="arrowRight" class="h-4 w-4" />
      </AppButton>
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
  import { auditionRequestHref } from "@/data/profiles";
  import { onMounted } from "vue";

  const { loadDurations } = usePlayer();
  onMounted(() => loadDurations(demoTracks));

  const facts = [
    { label: "Languages", value: "English and Albanian" },
    { label: "Based in", value: "Austin, Texas" },
    { label: "Playing age", value: "18–27" },
    { label: "Union status", value: "Nonunion" },
    { label: "Studio", value: "Home studio, Shure SM7B" },
  ];
</script>

<style scoped>
  /* A talent one-sheet (comp-card style): photo and specs on the left, demos on the right. */
  .one-sheet {
    display: grid;
    grid-template-columns: minmax(16rem, 20rem) minmax(0, 1fr);
    grid-template-areas: "intro demos" "facts demos";
    grid-template-rows: auto 1fr;
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

  .booking {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 1rem 2rem;
    margin-top: 1.5rem;
    padding: 1.5rem;
    border-radius: var(--radius-lg);
    background: rgb(var(--color-surface-muted));
  }

  .facts {
    grid-area: facts;
  }

  .facts dl {
    margin-top: 0.75rem;
  }

  .facts__row {
    display: grid;
    grid-template-columns: 7rem minmax(0, 1fr);
    gap: 1rem;
    padding-block: 0.625rem;
    border-top: 1px solid rgb(var(--color-line));
    font-size: 0.875rem;
  }

  .facts__row:last-child {
    border-bottom: 1px solid rgb(var(--color-line));
  }

  .facts dt {
    color: rgb(var(--color-secondary));
  }

  .facts dd {
    font-weight: 500;
  }

  /* On narrow screens: compact identity row, then demos straight away, then the profile. */
  @media (max-width: 860px) {
    .one-sheet {
      grid-template-columns: minmax(0, 1fr);
      grid-template-areas: "intro" "demos" "facts";
      grid-template-rows: auto;
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
