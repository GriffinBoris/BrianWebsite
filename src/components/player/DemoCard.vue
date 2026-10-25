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
    <div class="demo-row__progress">
      <span>{{ currentLabel }}</span>
      <AudioSeek
        :value="active ? progress : 0"
        :disabled="!active || !duration"
        :label="`Seek in ${track.title.toLowerCase()}`"
        :value-text="`${currentLabel} of ${durationLabel(track)}`"
        @seek="seekToPercent"
      />
      <span>{{ durationLabel(track) }}</span>
    </div>
    <AppButton
      tone="link"
      icon="download"
      label="Download"
      :href="track.src"
      :download="track.downloadName"
      :aria-label="`Download ${track.title.toLowerCase()} as MP3`"
      root-class="demo-row__download"
    />
  </article>
</template>

<script setup lang="ts">
  import AppButton from "@/components/ui/AppButton.vue";
  import AppIconButton from "@/components/ui/AppIconButton.vue";
  import AudioSeek from "@/components/player/AudioSeek.vue";
  import { usePlayer } from "@/composables/usePlayer";
  import type { DemoTrack } from "@/data/demos";
  import { computed } from "vue";

  const props = defineProps<{ track: DemoTrack }>();
  const { isPlaying, progress, currentTime, duration, toggleTrack, seekToPercent, isCurrent, durationLabel, formatTime } = usePlayer();
  const active = computed(() => isCurrent(props.track));
  const currentLabel = computed(() => (active.value ? formatTime(currentTime.value) : "0:00"));
</script>

<style scoped>
  .demo-row {
    display: grid;
    grid-template-columns: 48px minmax(180px, 230px) minmax(0, 1fr) auto;
    grid-template-areas: "play title progress download";
    align-items: center;
    column-gap: var(--space-6);
    min-height: 80px;
    border-bottom: 1px solid rgb(var(--color-line));
  }

  .demo-row:last-child {
    border-bottom: 0;
  }

  .demo-row__play {
    grid-area: play;
    height: 48px;
    width: 48px;
  }

  .demo-row__title {
    grid-area: title;
    font-size: 18px;
    line-height: 1.35;
    font-weight: 500;
    letter-spacing: -0.02em;
  }

  .demo-row__download {
    grid-area: download;
    min-height: 44px;
    padding-inline: var(--space-2);
    margin-right: calc(-1 * var(--space-2));
    gap: var(--space-3);
    color: rgb(var(--color-accent));
  }

  .demo-row__progress {
    grid-area: progress;
    display: flex;
    min-width: 0;
    align-items: center;
    gap: var(--space-4);
    color: rgb(var(--color-secondary));
    font-size: 13px;
    line-height: 1.3;
    font-variant-numeric: tabular-nums;
  }

  .demo-row__progress > span {
    flex: none;
    min-width: 2.1rem;
    text-align: center;
  }

  @media (max-width: 900px) {
    .demo-row {
      grid-template-columns: 48px minmax(0, 1fr) auto;
      grid-template-areas: "play title download" "play progress download";
      gap: 0 var(--space-4);
      padding-block: var(--space-3);
    }
    .demo-row__title {
      align-self: end;
      font-size: 17px;
    }
    .demo-row__progress {
      gap: var(--space-2);
    }
    .demo-row__progress :deep(input) {
      height: 44px;
    }
    .demo-row__download {
      gap: var(--space-2);
    }
  }

  @media (max-width: 420px) {
    .demo-row {
      grid-template-columns: 44px minmax(0, 1fr) auto;
      column-gap: var(--space-3);
    }
    .demo-row__play {
      width: 44px;
      height: 44px;
    }
    .demo-row__title {
      font-size: 16px;
    }
    .demo-row__download {
      gap: 5px;
      font-size: 13px;
    }
    .demo-row__progress {
      gap: 4px;
      font-size: 12px;
    }
    .demo-row__progress > span {
      min-width: 1.75rem;
    }
  }
</style>
