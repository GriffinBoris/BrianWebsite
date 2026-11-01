<template>
  <article class="demo-row" :class="{ 'is-active': active }">
    <AppIconButton
      size="lg"
      :tone="active ? 'accent' : 'outline'"
      :icon="playing ? 'pause' : 'play'"
      :label="`${playing ? 'Pause' : 'Play'} ${track.title.toLowerCase()}`"
      :aria-pressed="playing"
      root-class="demo-row__play"
      @click="toggleTrack(track)"
    />

    <h3 class="demo-row__title">{{ track.title }}</h3>

    <div class="demo-row__progress">
      <span>{{ currentLabel }}</span>
      <AudioSeek
        :waveform="track.waveform"
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
      label="MP3"
      :href="track.src"
      :download="track.downloadName"
      :aria-label="`Download ${track.title.toLowerCase()} as MP3`"
      root-class="demo-row__download"
    />
  </article>
</template>

<script setup lang="ts">
  import AudioSeek from "@/components/player/AudioSeek.vue";
  import AppButton from "@/components/ui/AppButton.vue";
  import AppIconButton from "@/components/ui/AppIconButton.vue";
  import { usePlayer } from "@/composables/usePlayer";
  import type { DemoTrack } from "@/data/demos";
  import { computed } from "vue";

  const props = defineProps<{ track: DemoTrack }>();
  const { isPlaying, progress, currentTime, duration, toggleTrack, seekToPercent, isCurrent, durationLabel, formatTime } = usePlayer();
  const active = computed(() => isCurrent(props.track));
  const playing = computed(() => active.value && isPlaying.value);
  const currentLabel = computed(() => (active.value ? formatTime(currentTime.value) : "0:00"));
</script>

<style scoped>
  /* Sized by its list container, so the same row works in the one-sheet column and on phones. */
  .demo-row {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    grid-template-areas: "play title download" "play progress progress";
    align-items: center;
    column-gap: 1rem;
    padding: 1rem 1.25rem;
    border-top: 1px solid rgb(var(--color-line));
    transition: background-color var(--duration) var(--ease);
  }

  .demo-row:first-child {
    border-top: 0;
  }

  .demo-row.is-active {
    background: rgb(var(--color-accent-soft));
  }

  .demo-row__play {
    grid-area: play;
  }

  .demo-row__title {
    grid-area: title;
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  .demo-row__download {
    grid-area: download;
    min-height: 2rem;
  }

  .demo-row__progress {
    grid-area: progress;
    display: flex;
    min-width: 0;
    align-items: center;
    gap: 0.625rem;
    color: rgb(var(--color-secondary));
    font-size: 0.75rem;
    font-variant-numeric: tabular-nums;
  }

  .demo-row__progress > span {
    flex: none;
    min-width: 2rem;
    text-align: center;
  }

  @container (max-width: 26rem) {
    .demo-row {
      grid-template-areas: "play title download" "progress progress progress";
      row-gap: 0.25rem;
      padding-inline: 1rem;
    }
  }
</style>
