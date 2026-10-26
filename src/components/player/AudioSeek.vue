<template>
  <div ref="root" class="audio-timeline" :style="{ '--seek-progress': `${value}%` }">
    <svg class="audio-timeline__wave" :viewBox="`0 0 ${barCount * 4} 44`" preserveAspectRatio="none" aria-hidden="true">
      <path :d="waveformPath" />
    </svg>
    <svg class="audio-timeline__wave audio-timeline__wave--played" :viewBox="`0 0 ${barCount * 4} 44`" preserveAspectRatio="none" aria-hidden="true">
      <path :d="waveformPath" />
    </svg>
    <input
      class="audio-seek"
      type="range"
      min="0"
      max="100"
      step="0.1"
      :value="value"
      :disabled="disabled"
      :aria-label="label"
      :aria-valuetext="valueText"
      @input="emit('seek', Number(($event.target as HTMLInputElement).value))"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed, onBeforeUnmount, onMounted, ref } from "vue";

  const props = defineProps<{ value: number; disabled: boolean; label: string; valueText: string; waveform: number[] }>();
  const emit = defineEmits<{ seek: [percent: number] }>();
  const root = ref<HTMLElement | null>(null);
  const width = ref(0);
  const barCount = computed(() => Math.max(1, Math.min(props.waveform.length, Math.floor(width.value / 4))));
  const waveformPath = computed(() => {
    const count = barCount.value;
    return Array.from({ length: count }, (_, index) => {
      const start = Math.floor(index * props.waveform.length / count);
      const end = Math.floor((index + 1) * props.waveform.length / count);
      const energy = props.waveform.slice(start, end).reduce((sum, level) => sum + level * level, 0);
      const height = Math.max(2, Math.sqrt(energy / (end - start)) * 32);
      return `M${index * 4 + 2},${22 - height / 2}v${height}`;
    }).join(" ");
  });
  const observer = new ResizeObserver(([entry]) => {
    width.value = entry.contentRect.width;
  });

  onMounted(() => observer.observe(root.value!));
  onBeforeUnmount(() => observer.disconnect());
</script>

<style scoped>
  .audio-timeline {
    position: relative;
    flex: 1;
    min-width: 0;
    height: 44px;
  }

  .audio-timeline__wave {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 44px;
    fill: none;
    stroke: rgb(var(--color-control-track));
    stroke-width: 2;
    stroke-linecap: round;
    pointer-events: none;
  }

  .audio-timeline__wave--played {
    stroke: rgb(var(--color-accent));
    clip-path: inset(0 calc(100% - var(--seek-progress)) 0 0);
  }

  .audio-seek {
    position: relative;
    display: block;
    appearance: none;
    width: 100%;
    height: 44px;
    margin: 0;
    background: transparent;
    cursor: pointer;
  }

  .audio-seek:disabled {
    cursor: default;
  }

  .audio-seek::-webkit-slider-runnable-track {
    height: 3px;
    background: transparent;
  }

  .audio-seek::-webkit-slider-thumb {
    appearance: none;
    margin-top: -14.5px;
    width: 2px;
    height: 32px;
    border-radius: var(--radius-pill);
    background: rgb(var(--color-accent));
  }

  .audio-seek:disabled::-webkit-slider-thumb {
    background: transparent;
  }

  .audio-seek::-moz-range-track,
  .audio-seek::-moz-range-progress {
    height: 3px;
    background: transparent;
  }

  .audio-seek::-moz-range-thumb {
    width: 2px;
    height: 32px;
    border: 0;
    border-radius: var(--radius-pill);
    background: rgb(var(--color-accent));
  }

  .audio-seek:disabled::-moz-range-thumb {
    background: transparent;
  }
</style>
