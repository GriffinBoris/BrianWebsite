<template>
  <section aria-labelledby="hero-title">
    <div class="site-container hero">
      <div>
        <p class="eyebrow">Voice actor</p>
        <h1 id="hero-title" class="mt-5 text-display font-extrabold">Brian Bakaj</h1>
        <p class="lead mt-6 max-w-[34rem]">
          English and Albanian voiceover for video games, commercials, and narration. Based in Austin, Texas, recording from a dedicated home studio.
        </p>
        <div class="mt-9 flex flex-wrap gap-3">
          <AppButton tone="accent" size="lg" :aria-pressed="featuredPlaying" @click="toggleTrack(featuredTrack)">
            <AppIcon :icon="featuredPlaying ? 'pause' : 'play'" class="h-5 w-5 fill-current" />
            <span>{{ featuredPlaying ? "Pause demo" : "Play demo" }}</span>
          </AppButton>
          <AppButton tone="outline" size="lg" :to="{ name: 'contact' }">
            <span>Book Brian</span>
            <AppIcon icon="arrowRight" class="h-5 w-5" />
          </AppButton>
        </div>
      </div>

      <img class="hero__portrait" :src="headshot" alt="Brian Bakaj, outdoor headshot" width="565" height="476" fetchpriority="high" />
    </div>
  </section>

  <section id="demos" class="theme-studio section" aria-labelledby="demos-title">
    <div class="site-container">
      <h2 id="demos-title" class="mb-8 text-h2">Demos</h2>
      <DemoRow v-for="(track, index) in demoTracks" :key="track.id" :track="track" :number="index + 1" />
    </div>
  </section>

  <section class="section" aria-labelledby="profile-title">
    <div class="site-container">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <h2 id="profile-title" class="text-h2">Profile</h2>
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
        <div>
          <h2 id="book-title" class="text-h2">Book Brian</h2>
          <p class="mt-3 text-secondary">Send the project, the role, and your timeline.</p>
        </div>
        <div class="flex flex-wrap items-center gap-x-6 gap-y-3">
          <a class="booking__email" :href="`mailto:${bookingEmail}`">{{ bookingEmail }}</a>
          <AppButton tone="accent" size="lg" :href="`mailto:${bookingEmail}`">
            <AppIcon icon="mail" class="h-5 w-5" />
            <span>Email Brian</span>
          </AppButton>
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

  const { isPlaying, isCurrent, toggleTrack, loadDurations } = usePlayer();
  onMounted(() => loadDurations(demoTracks));

  // The hero button plays the first reel in the list.
  const featuredTrack = demoTracks[0];
  const featuredPlaying = computed(() => isCurrent(featuredTrack) && isPlaying.value);

  const facts = [
    { label: "Languages", value: "English and Albanian" },
    { label: "Playing age", value: "18–27" },
    { label: "Based in", value: "Austin, Texas" },
    { label: "Studio", value: "Shure SM7B home studio" },
  ];
</script>

<style scoped>
  .hero {
    display: grid;
    grid-template-columns: minmax(0, 1.3fr) minmax(0, 0.8fr);
    align-items: center;
    gap: clamp(2.5rem, 6vw, 5rem);
    padding-block: clamp(3rem, 8vw, 6rem);
  }

  .hero__portrait {
    width: 100%;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-photo);
  }

  .facts {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1rem;
    margin-top: 2rem;
  }

  .facts__item {
    padding: 1.25rem;
    border: 1px solid rgb(var(--color-line));
    border-radius: var(--radius-md);
    background: rgb(var(--color-surface));
  }

  .facts dt {
    font-size: 0.8125rem;
    color: rgb(var(--color-secondary));
  }

  .facts dd {
    margin-top: 0.375rem;
    font-size: 1.0625rem;
    font-weight: 600;
    letter-spacing: -0.015em;
  }

  .booking {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem 3rem;
    padding: clamp(1.75rem, 5vw, 3rem);
    border-radius: var(--radius-lg);
    background: rgb(var(--color-surface-muted));
  }

  .booking__email {
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
    .hero {
      grid-template-columns: 1fr;
    }
    .hero__portrait {
      max-width: 30rem;
    }
    .facts {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 480px) {
    .facts {
      grid-template-columns: 1fr;
    }
  }
</style>
