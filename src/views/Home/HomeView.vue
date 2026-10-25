<template>
  <section class="relative overflow-hidden py-[clamp(3.5rem,9vw,7rem)]" aria-labelledby="hero-title">
    <div class="site-container">
      <div class="grid items-center gap-[clamp(2rem,5vw,4rem)] min-[861px]:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p class="eyebrow mb-4">Screen and voice actor</p>
          <h1 id="hero-title" class="text-display">Brian Bakaj</h1>
          <p class="lead mt-6 max-w-[40ch]">I’m based in Austin, Texas, and perform in English and Albanian.</p>

          <div class="mt-8 flex flex-wrap gap-3.5">
            <AppButton tone="accent" label="Listen to demos" icon="play" href="#reels" />
            <AppButton tone="ghost" label="Contact Brian" :to="{ name: 'contact' }" />
          </div>
        </div>

        <HeroCarousel />
      </div>
    </div>
  </section>

  <section id="reels" class="section section--muted" aria-labelledby="demos-title">
    <div class="site-container">
      <div class="mb-[clamp(2rem,4vw,3.25rem)] max-w-container-narrow">
        <h2 id="demos-title" class="text-h2">Voice demos</h2>
        <p class="lead mt-4">Listen to the demos below.</p>
      </div>

      <WaveformDisplay class="mb-[clamp(1.75rem,4vw,2.75rem)]" />

      <div class="grid grid-cols-1 gap-5">
        <DemoCard v-for="track in demoTracks" :key="track.id" :track="track" />
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="book-title">
    <div class="site-container site-container--narrow text-center">
      <h2 id="book-title" class="text-h2">Bookings and auditions</h2>
      <p class="lead mx-auto mt-4 max-w-[42ch]">Tell me about your project, the role, and your timeline.</p>
      <div class="mt-7 flex flex-wrap justify-center gap-3.5">
        <AppButton tone="accent" label="Contact Brian" :to="{ name: 'contact' }" />
        <AppButton tone="ghost" label="About Brian" :to="{ name: 'about' }" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import HeroCarousel from "@/views/Home/HeroCarousel.vue";
  import AppButton from "@/components/ui/AppButton.vue";
  import DemoCard from "@/components/player/DemoCard.vue";
  import WaveformDisplay from "@/components/player/WaveformDisplay.vue";
  import { usePlayer } from "@/composables/usePlayer";
  import { demoTracks } from "@/data/demos";
  import { onMounted } from "vue";

  const { loadDurations } = usePlayer();

  onMounted(() => loadDurations(demoTracks));
</script>
