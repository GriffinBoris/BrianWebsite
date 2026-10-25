<template>
  <div ref="display" class="visualizer" :class="{ 'is-active': isWaveActive, 'is-visible': isVisible }">
    <div class="visualizer__stage" aria-hidden="true">
      <div class="visualizer__halo" />
      <div class="visualizer__axis" />
      <div class="visualizer__bars">
        <span v-for="(bar, index) in bars" :key="index" class="visualizer__slot">
          <span
            class="visualizer__bar"
            :style="{
              '--scale': isWaveActive ? (waveHeights[index] ?? 8) / 100 : bar.height,
              '--delay': `${-index * 95}ms`,
            }"
          />
        </span>
      </div>
    </div>
    <div class="visualizer__caption">
      <span class="visualizer__status"><span class="visualizer__indicator" aria-hidden="true" />{{ status }}</span>
      <span class="visualizer__hint">{{ isBuffering ? 'One moment' : isPlaying ? 'Now playing' : 'Choose a demo below' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, onUnmounted, ref, useTemplateRef } from "vue";
  import { usePlayer, WAVE_BAR_COUNT } from "@/composables/usePlayer";

  const { currentTrack, isPlaying, isBuffering, isWaveActive, waveHeights, setWaveVisible } = usePlayer();
  const display = useTemplateRef<HTMLElement>("display");
  const isVisible = ref(false);
  let observer: IntersectionObserver | undefined;

  const status = computed(() => {
    if (isBuffering.value) return 'Loading audio';
    if (isPlaying.value && currentTrack.value) return currentTrack.value.title;
    if (currentTrack.value) return 'Paused';
    return 'Ready when you are';
  });

  // A tapered silhouette with a traveling ripple, even before a reel is chosen.
  const bars = Array.from({ length: WAVE_BAR_COUNT }, (_, index) => ({
    height: 0.12 + Math.pow(Math.sin((Math.PI * (index + 0.5)) / WAVE_BAR_COUNT), 1.5) * 0.44,
  }));

  onMounted(() => {
    observer = new IntersectionObserver(([entry]) => {
      isVisible.value = entry?.isIntersecting ?? false;
      setWaveVisible(isVisible.value);
    });
    if (display.value) observer.observe(display.value);
  });

  onUnmounted(() => {
    observer?.disconnect();
    setWaveVisible(false);
  });
</script>

<style scoped>
  .visualizer {
    width: 100%;
  }

  .visualizer__stage {
    position: relative;
    display: grid;
    align-items: center;
    height: clamp(100px, 15vw, 136px);
    isolation: isolate;
  }

  .visualizer__halo {
    position: absolute;
    inset: 8% 8%;
    z-index: -1;
    background: radial-gradient(ellipse, rgb(var(--color-accent) / 0.12), transparent 68%);
    opacity: 0.5;
    transition: opacity 600ms var(--ease);
  }

  .visualizer__axis {
    position: absolute;
    inset-inline: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgb(var(--color-accent) / 0.2), transparent);
  }

  .visualizer__bars {
    display: flex;
    align-items: center;
    gap: clamp(2px, 0.45vw, 5px);
    height: 100%;
  }

  .visualizer__slot {
    display: flex;
    align-items: center;
    flex: 1;
    height: 100%;
    min-width: 0;
  }

  .visualizer__bar {
    width: 100%;
    height: 100%;
    border-radius: var(--radius-pill);
    background: linear-gradient(180deg, rgb(var(--color-accent) / 0.45), rgb(var(--color-accent)) 45%, rgb(var(--color-accent) / 0.45));
    transform: scaleY(var(--scale));
    opacity: 0.7;
    animation: idle-ripple 4.8s ease-in-out infinite;
    animation-delay: var(--delay);
    animation-play-state: paused;
  }

  .is-visible .visualizer__bar {
    animation-play-state: running;
  }

  .is-active .visualizer__bar {
    animation: none;
    opacity: 1;
    transition: transform 70ms linear;
  }

  .is-active .visualizer__halo {
    opacity: 1;
  }

  .visualizer__caption {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin-top: 0.5rem;
    color: rgb(var(--color-secondary));
    font-size: 0.75rem;
    line-height: 1.5;
  }

  .visualizer__status {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .visualizer__indicator {
    width: 5px;
    height: 5px;
    flex: none;
    border-radius: var(--radius-pill);
    background: rgb(var(--color-accent));
    opacity: 0.55;
  }

  .is-active .visualizer__indicator {
    opacity: 1;
    box-shadow: 0 0 8px rgb(var(--color-accent) / 0.4);
  }

  @keyframes idle-ripple {
    0%, 100% { transform: scaleY(calc(var(--scale) * 0.45)); opacity: 0.45; }
    45% { transform: scaleY(var(--scale)); opacity: 0.85; }
    65% { transform: scaleY(calc(var(--scale) * 0.72)); opacity: 0.65; }
  }

  @media (max-width: 420px) {
    .visualizer__hint { display: none; }
  }

  @media (prefers-reduced-motion: reduce) {
    .visualizer__bar { animation: none; }
    .visualizer__bar, .visualizer__halo { transition: none; }
  }
</style>
