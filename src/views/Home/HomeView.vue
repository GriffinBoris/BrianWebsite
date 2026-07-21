<template>
  <!-- Hero -->
  <section class="relative overflow-hidden py-[clamp(3.5rem,9vw,7rem)]" aria-labelledby="hero-title">
    <div class="site-container">
      <div class="grid items-center gap-[clamp(2rem,5vw,4rem)] min-[861px]:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p class="eyebrow mb-4">Actor · Austin, TX</p>
          <h1 id="hero-title" class="text-display">Brian Bakaj</h1>
          <p class="lead mt-6 max-w-[38ch]">Screen and voice actor in Austin. On camera and on the mic, in English and Albanian.</p>

          <div class="mt-8 flex flex-wrap items-center gap-3">
            <span class="mr-1 text-[0.8rem] uppercase tracking-[0.12em] text-secondary">Listen</span>
            <ListenChip v-for="track in demoTracks" :key="track.id" :track="track" />
          </div>

          <WaveformDisplay />
        </div>

        <figure class="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface-muted shadow-lg max-[860px]:order-first max-[860px]:mx-auto max-[860px]:max-w-[20rem]">
          <img :src="headshot" alt="Brian Bakaj, headshot" width="565" height="476" class="h-full w-full object-cover object-[center_30%]" />
        </figure>
      </div>
    </div>
  </section>

  <!-- Voice reels -->
  <section class="section section--muted" aria-labelledby="demos-title">
    <div class="site-container">
      <div class="mb-[clamp(2rem,4vw,3.25rem)] max-w-container-narrow">
        <p class="eyebrow mb-4">Voice</p>
        <h2 id="demos-title" class="text-h2">Hear the reels</h2>
        <p class="lead mt-4">Two reels, commercial and narration. Press play.</p>
      </div>

      <div class="grid gap-5">
        <DemoCard v-for="track in demoTracks" :key="track.id" :track="track" />
      </div>
    </div>
  </section>

  <!-- Booking CTA -->
  <section class="section" aria-labelledby="book-title">
    <div class="site-container site-container--narrow text-center">
      <p class="eyebrow mb-4">Booking</p>
      <h2 id="book-title" class="mt-1 text-h2">Casting something?</h2>
      <p class="lead mx-auto mt-4 max-w-[42ch]">Commercial, narrative, explainer, and corporate. On camera or voice only, remote on request.</p>
      <div class="mt-7 flex flex-wrap justify-center gap-3.5">
        <AppButton tone="accent" label="Get in touch" :to="{ name: 'contact' }" />
        <AppButton tone="ghost" label="More about Brian" :to="{ name: 'about' }" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import headshot from "@/assets/img/headshot.jpg";
  import AppButton from "@/components/ui/AppButton.vue";
  import DemoCard from "@/components/player/DemoCard.vue";
  import ListenChip from "@/components/player/ListenChip.vue";
  import WaveformDisplay from "@/components/player/WaveformDisplay.vue";
  import { usePlayer } from "@/composables/usePlayer";
  import { demoTracks } from "@/data/demos";
  import { onMounted } from "vue";

  const { loadDurations } = usePlayer();

  onMounted(() => loadDurations(demoTracks));
</script>
