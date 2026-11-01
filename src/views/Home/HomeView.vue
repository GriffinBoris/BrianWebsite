<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="site-container hero__layout">
      <div>
        <p class="eyebrow">Voice actor based in Austin, Texas</p>
        <h1 id="hero-title" class="hero__name">
          <span class="block">Brian</span>
          <span class="block italic text-accent">Bakaj</span>
        </h1>
        <p class="lead mt-8 max-w-[34rem]">
          Voiceover for video games, commercials, and narration in English and Albanian, recorded in a dedicated home studio.
        </p>
        <div class="mt-10 flex flex-wrap gap-3">
          <AppButton tone="accent" size="lg" :aria-pressed="featuredPlaying" @click="toggleTrack(featuredTrack)">
            <AppIcon :icon="featuredPlaying ? 'pause' : 'play'" class="h-5 w-5 fill-current" />
            <span>{{ featuredPlaying ? "Pause demo" : "Play demo" }}</span>
            <span class="tabular-nums opacity-75">{{ durationLabel(featuredTrack) }}</span>
          </AppButton>
          <AppButton tone="outline" size="lg" :to="{ name: 'contact' }">
            <span>Book Brian</span>
            <AppIcon icon="arrowRight" class="h-5 w-5" />
          </AppButton>
        </div>
      </div>

      <figure class="hero__portrait">
        <img :src="headshot" alt="Brian Bakaj, outdoor headshot" width="565" height="476" fetchpriority="high" />
      </figure>
    </div>
  </section>

  <section id="demos" class="theme-studio section" aria-labelledby="demos-title">
    <div class="site-container">
      <div class="mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
        <div>
          <p class="eyebrow">Voiceover demos</p>
          <h2 id="demos-title" class="mt-4 font-display text-h2">Press <em>play.</em></h2>
        </div>
        <p class="max-w-[22rem] text-secondary">Each reel streams here and downloads as an MP3 for your casting files.</p>
      </div>

      <div>
        <DemoRow v-for="(track, index) in demoTracks" :key="track.id" :track="track" :number="index + 1" />
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="profile-title">
    <div class="site-container">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <h2 id="profile-title" class="eyebrow">At a glance</h2>
        <AppButton tone="link" :to="{ name: 'about' }">
          <span>Full profile</span>
          <AppIcon icon="arrowRight" class="h-4 w-4" />
        </AppButton>
      </div>
      <dl class="facts">
        <div v-for="fact in facts" :key="fact.label" class="facts__item">
          <dt>{{ fact.label }}</dt>
          <dd>{{ fact.value }}</dd>
        </div>
      </dl>
    </div>
  </section>

  <section class="pb-[var(--space-section)]" aria-labelledby="book-title">
    <div class="site-container">
      <div class="booking">
        <p class="eyebrow">Bookings and auditions</p>
        <h2 id="book-title" class="mt-5 font-display text-h1">Have a script? <em class="text-accent">Let’s talk.</em></h2>
        <p class="lead mt-6 max-w-[34rem]">Tell me about your project, the role, and your timeline.</p>
        <div class="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <AppButton tone="solid" size="lg" :href="`mailto:${bookingEmail}`">
            <AppIcon icon="mail" class="h-5 w-5" />
            <span>Email Brian</span>
          </AppButton>
          <a class="booking__email" :href="`mailto:${bookingEmail}`">{{ bookingEmail }}</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import headshot from "@/assets/img/headshot.jpg";
  import DemoRow from "@/components/player/DemoRow.vue";
  import AppButton from "@/components/ui/AppButton.vue";
  import AppIcon from "@/components/ui/AppIcon.vue";
  import { usePlayer } from "@/composables/usePlayer";
  import { demoTracks } from "@/data/demos";
  import { bookingEmail } from "@/data/profiles";
  import { computed, onMounted } from "vue";

  const { isPlaying, isCurrent, toggleTrack, loadDurations, durationLabel } = usePlayer();
  onMounted(() => loadDurations(demoTracks));

  // The hero button plays the first reel in the list.
  const featuredTrack = demoTracks[0];
  const featuredPlaying = computed(() => isCurrent(featuredTrack) && isPlaying.value);

  const facts = [
    { label: "Languages", value: "English and Albanian" },
    { label: "Studio", value: "Shure SM7B home studio" },
    { label: "Based in", value: "Austin, Texas" },
    { label: "Playing age", value: "18–27" },
  ];
</script>

<style scoped>
  .hero__layout {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.85fr);
    align-items: center;
    gap: clamp(2.5rem, 6vw, 5rem);
    padding-block: clamp(3rem, 8vw, 6.5rem);
  }

  .hero__name {
    margin-top: 1.5rem;
    margin-left: -0.04em;
    font-family: var(--font-display);
    font-size: var(--font-size-display);
    line-height: 0.86;
    letter-spacing: -0.02em;
  }

  /* An offset block of the accent colour frames the portrait like a studio light. */
  .hero__portrait {
    position: relative;
    margin: 0 1.25rem 1.25rem 0;
  }

  .hero__portrait::before {
    content: "";
    position: absolute;
    inset: 1.25rem -1.25rem -1.25rem 1.25rem;
    border-radius: var(--radius-lg);
    background: rgb(var(--color-accent));
  }

  .hero__portrait img {
    position: relative;
    width: 100%;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-photo);
  }

  .facts {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    margin-top: 1.5rem;
    border-top: 1px solid rgb(var(--color-body));
  }

  .facts__item {
    padding: 1.5rem 1.5rem 0 0;
  }

  .facts__item + .facts__item {
    padding-left: 1.5rem;
    border-left: 1px solid rgb(var(--color-line));
  }

  .facts dt {
    font-size: 0.8125rem;
    color: rgb(var(--color-secondary));
  }

  .facts dd {
    margin-top: 0.5rem;
    font-family: var(--font-display);
    font-size: clamp(1.625rem, 2.6vw, 2.125rem);
    line-height: 1.05;
  }

  .booking {
    padding: clamp(2rem, 6vw, 4.5rem);
    border-radius: var(--radius-lg);
    background: rgb(var(--color-surface-muted));
  }

  .booking__email {
    font-size: 1.0625rem;
    font-weight: 500;
    text-decoration: underline;
    text-decoration-color: rgb(var(--color-body) / 0.3);
    text-underline-offset: 0.3em;
    overflow-wrap: anywhere;
    transition:
      color var(--duration) var(--ease),
      text-decoration-color var(--duration) var(--ease);
  }

  .booking__email:hover {
    color: rgb(var(--color-accent));
    text-decoration-color: currentColor;
  }

  @media (max-width: 900px) {
    .hero__layout {
      grid-template-columns: 1fr;
    }
    .hero__portrait {
      max-width: 30rem;
    }
    .facts {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .facts__item:nth-child(3) {
      padding-left: 0;
      border-left: 0;
    }
  }

  @media (max-width: 480px) {
    .facts {
      grid-template-columns: 1fr;
    }
    .facts__item,
    .facts__item + .facts__item {
      padding: 1.25rem 0;
      border-left: 0;
      border-bottom: 1px solid rgb(var(--color-line));
    }
  }
</style>
