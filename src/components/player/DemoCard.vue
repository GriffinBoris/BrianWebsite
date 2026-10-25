<template>
  <article class="demo-row" :class="{ 'is-active': active }">
    <div class="demo-row__heading">
      <AppIconButton
        size="lg"
        :tone="active && isPlaying ? 'accent' : 'default'"
        :icon="active && isPlaying ? 'pause' : 'play'"
        :label="`${active && isPlaying ? 'Pause' : 'Play'} ${track.title.toLowerCase()}`"
        :show-tooltip="false"
        :aria-pressed="active && isPlaying"
        root-class="flex-none"
        @click="toggleTrack(track)"
      />
      <h3 class="demo-row__title">{{ track.title }}</h3>
      <AppButton
        tone="link"
        icon="download"
        label="Download"
        :href="track.src"
        :download="track.downloadName"
        :aria-label="`Download ${track.title.toLowerCase()} as MP3`"
        root-class="demo-row__download"
      />
    </div>
    <div class="demo-row__progress">
      <span>{{ currentLabel }}</span>
      <div class="demo-row__track" aria-hidden="true"><span :style="{ width: `${active ? progress : 0}%` }" /></div>
      <span>{{ durationLabel(track) }}</span>
    </div>
  </article>
</template>

<script setup lang="ts">
  import AppButton from "@/components/ui/AppButton.vue";
  import AppIconButton from "@/components/ui/AppIconButton.vue";
  import { usePlayer } from "@/composables/usePlayer";
  import type { DemoTrack } from "@/data/demos";
  import { computed } from "vue";

  const props = defineProps<{ track: DemoTrack }>();
  const { isPlaying, progress, currentTime, toggleTrack, isCurrent, durationLabel, formatTime } = usePlayer();
  const active = computed(() => isCurrent(props.track));
  const currentLabel = computed(() => (active.value ? formatTime(currentTime.value) : "0:00"));
</script>

<style scoped>
  .demo-row {
    padding: clamp(1.25rem, 3vw, 1.75rem);
    border-bottom: 1px solid rgb(var(--color-line));
    transition: background-color var(--duration) var(--ease);
  }

  .demo-row:last-child {
    border-bottom: 0;
  }

  .demo-row.is-active {
    background: rgb(var(--color-surface-muted) / 0.7);
  }

  .demo-row__heading {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: 1.25rem;
  }

  .demo-row__title {
    font-size: clamp(1.1rem, 2vw, 1.35rem);
    font-weight: 500;
    letter-spacing: -0.03em;
  }

  .demo-row__download {
    min-height: 44px;
    padding-inline: 0.5rem;
  }

  .demo-row__progress {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-left: 4.65rem;
    margin-top: 0.8rem;
    color: rgb(var(--color-secondary));
    font-size: 0.75rem;
    font-variant-numeric: tabular-nums;
  }

  .demo-row__track {
    position: relative;
    flex: 1;
    height: 3px;
    overflow: hidden;
    border-radius: var(--radius-pill);
    background: rgb(var(--color-line));
  }

  .demo-row__track span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: rgb(var(--color-accent));
  }

  @media (max-width: 520px) {
    .demo-row__heading {
      grid-template-columns: auto minmax(0, 1fr);
      gap: 0.85rem;
    }
    .demo-row__download {
      grid-column: 2;
      justify-self: start;
      margin-top: -0.5rem;
      padding-left: 0;
    }
    .demo-row__progress {
      padding-left: 0;
      gap: 0.65rem;
      margin-top: 0.65rem;
    }
  }
</style>
