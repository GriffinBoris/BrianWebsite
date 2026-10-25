<template>
  <input
    class="audio-seek"
    type="range"
    min="0"
    max="100"
    step="0.1"
    :value="value"
    :style="{ '--seek-progress': `${value}%` }"
    :disabled="disabled"
    :aria-label="label"
    :aria-valuetext="valueText"
    @input="emit('seek', Number(($event.target as HTMLInputElement).value))"
  />
</template>

<script setup lang="ts">
  defineProps<{ value: number; disabled: boolean; label: string; valueText: string }>();
  const emit = defineEmits<{ seek: [percent: number] }>();
</script>

<style scoped>
  .audio-seek {
    appearance: none;
    min-width: 0;
    width: 100%;
    height: 44px;
    background: transparent;
    cursor: pointer;
  }

  .audio-seek:disabled {
    cursor: default;
  }

  .audio-seek::-webkit-slider-runnable-track {
    height: 3px;
    border-radius: var(--radius-pill);
    background: linear-gradient(to right, rgb(var(--color-accent)) var(--seek-progress), rgb(var(--color-control-track)) var(--seek-progress));
  }

  .audio-seek::-webkit-slider-thumb {
    appearance: none;
    margin-top: -4.5px;
    width: 12px;
    height: 12px;
    border-radius: var(--radius-pill);
    background: rgb(var(--color-accent));
  }

  .audio-seek:disabled::-webkit-slider-thumb {
    background: rgb(var(--color-control-track));
  }

  .audio-seek::-moz-range-track {
    height: 3px;
    border-radius: var(--radius-pill);
    background: rgb(var(--color-control-track));
  }

  .audio-seek::-moz-range-progress {
    height: 3px;
    border-radius: var(--radius-pill);
    background: rgb(var(--color-accent));
  }

  .audio-seek::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border: 0;
    border-radius: var(--radius-pill);
    background: rgb(var(--color-accent));
  }

  .audio-seek:disabled::-moz-range-thumb {
    background: rgb(var(--color-control-track));
  }
</style>
