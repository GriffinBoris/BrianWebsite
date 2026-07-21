<template>
  <div class="waveform" :class="{ 'is-active': isWaveActive }" aria-hidden="true">
    <span
      v-for="(bar, index) in bars"
      :key="index"
      class="waveform__bar"
      :style="{
        '--h': `${isWaveActive ? waveHeights[index] : bar.idle}%`,
        '--delay': `${bar.delay}ms`,
      }"
    />
  </div>
</template>

<script setup lang="ts">
  import { usePlayer, WAVE_BAR_COUNT } from "@/composables/usePlayer";

  const { isWaveActive, waveHeights } = usePlayer();

  // Varied idle heights and delays so the resting animation reads as an organic
  // voice rather than a metronome.
  const bars = Array.from({ length: WAVE_BAR_COUNT }, (_, index) => ({
    idle: 30 + Math.round(Math.abs(Math.sin(index * 1.7)) * 55),
    delay: (index * 55) % 1400,
  }));
</script>

<style scoped>
  .waveform {
    margin-top: 2.5rem;
    display: flex;
    align-items: flex-end;
    gap: clamp(2px, 0.5vw, 4px);
    height: 68px;
    width: 100%;
    max-width: 34rem;
  }

  .waveform__bar {
    flex: 1 1 auto;
    min-width: 2px;
    border-radius: 999px;
    background: linear-gradient(to top, rgb(var(--color-accent) / 0.35), rgb(var(--color-accent)));
    height: var(--h, 30%);
    transform-origin: bottom;
    transition: height 120ms linear;
  }

  /* Idle: a slow, calm breathing motion so it reads as "voice, at rest". */
  .waveform:not(.is-active) .waveform__bar {
    animation: wave-idle 2.6s var(--ease) infinite;
    animation-delay: var(--delay, 0ms);
  }

  @keyframes wave-idle {
    0%,
    100% {
      transform: scaleY(0.5);
      opacity: 0.65;
    }
    50% {
      transform: scaleY(1);
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .waveform:not(.is-active) .waveform__bar {
      animation: none;
      transform: scaleY(0.7);
    }
    .waveform__bar {
      transition: none;
    }
  }
</style>
