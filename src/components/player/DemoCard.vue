<template>
  <article class="demo-row" :class="{ 'is-active': active }">
    <AppIconButton
      size="lg"
      tone="accent"
      :icon="active && isPlaying ? 'pause' : 'play'"
      :label="`${active && isPlaying ? 'Pause' : 'Play'} ${track.title.toLowerCase()}`"
      :show-tooltip="false"
      :aria-pressed="active && isPlaying"
      root-class="demo-row__play"
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
    display: grid;
    grid-template-columns: 44px minmax(0, 1fr) auto;
    grid-template-areas: "play title download" "play progress download";
    align-items: center;
    gap: 5px 12px;
    padding-block: 14px;
    border-bottom: 1px solid rgb(var(--color-line));
  }

  .demo-row__play {
    grid-area: play;
  }

  .demo-row__title {
    grid-area: title;
    font-size: 16px;
    line-height: 1.35;
    font-weight: 600;
    letter-spacing: -0.015em;
  }

  .demo-row__download {
    grid-area: download;
    min-height: 44px;
    padding-inline: 4px;
  }

  .demo-row__progress {
    grid-area: progress;
    display: flex;
    align-items: center;
    gap: 8px;
    color: rgb(var(--color-secondary));
    font-size: 12px;
    line-height: 1.3;
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

  @media (max-width: 360px) {
    .demo-row {
      column-gap: 10px;
    }
    .demo-row__title {
      font-size: 15px;
    }
    .demo-row__download {
      gap: 4px;
      font-size: 13px;
    }
  }
</style>
