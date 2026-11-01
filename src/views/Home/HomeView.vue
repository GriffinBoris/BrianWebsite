<template>
  <div class="site-container one-sheet">
    <section class="intro" aria-labelledby="hero-title">
      <img class="intro__photo" :src="headshot" alt="Brian Bakaj, outdoor headshot" width="565" height="476" fetchpriority="high" />
      <div class="intro__text">
        <h1 id="hero-title" class="text-h1">Brian Bakaj</h1>
        <p class="mt-1 text-secondary">Voice actor in English and Albanian</p>
      </div>
      <div class="intro__actions">
        <AppButton tone="accent" size="lg" :href="auditionRequestHref" root-class="w-full">Request an audition</AppButton>
        <a class="intro__email" :href="`mailto:${bookingEmail}`">{{ bookingEmail }}</a>
      </div>
    </section>

    <div class="main">
      <section id="demos" aria-labelledby="demos-title">
        <h2 id="demos-title" class="text-h2">Demos</h2>
        <div class="demos__list">
          <DemoRow v-for="track in demoTracks" :key="track.id" :track="track" />
        </div>
      </section>

      <section class="bio" aria-labelledby="bio-title">
        <h2 id="bio-title" class="text-h2">About</h2>
        <p class="mt-3">
          I’m Brian, a voice actor based in Austin, Texas, working in English and Albanian. I record from a dedicated home studio with a
          Shure SM7B, and I hold a passport and driver’s license for projects that involve travel.
        </p>
      </section>
    </div>

    <section class="facts" aria-labelledby="facts-title">
      <h2 id="facts-title" class="sr-only">Casting profile</h2>
      <dl>
        <div v-for="fact in facts" :key="fact.label" class="facts__row">
          <dt>{{ fact.label }}</dt>
          <dd>{{ fact.value }}</dd>
        </div>
      </dl>
      <AppButton tone="link" :to="{ name: 'about' }" root-class="mt-2">
        <span>Full profile and headshots</span>
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
  import { auditionRequestHref, bookingEmail } from "@/data/profiles";
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
  /* A talent one-sheet: profile on the left, demos on the right, both above the fold. */
  .one-sheet {
    display: grid;
    grid-template-columns: minmax(16rem, 20rem) minmax(0, 1fr);
    grid-template-areas: "intro main" "facts main";
    grid-template-rows: auto 1fr;
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

  .intro__actions {
    margin-top: 1.25rem;
  }

  .intro__email {
    display: inline-flex;
    align-items: center;
    min-height: 2.75rem;
    font-size: 0.875rem;
    color: rgb(var(--color-secondary));
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  .intro__email:hover {
    color: rgb(var(--color-body));
  }

  .main {
    grid-area: main;
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

  .bio {
    max-width: 40rem;
    margin-top: 3rem;
    line-height: 1.7;
  }

  .facts {
    grid-area: facts;
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
      grid-template-areas: "intro" "main" "facts";
      grid-template-rows: auto;
    }

    .intro {
      display: grid;
      grid-template-columns: 5.5rem minmax(0, 1fr);
      grid-template-areas: "photo text" "actions actions";
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

    .intro__actions {
      grid-area: actions;
    }
  }
</style>
