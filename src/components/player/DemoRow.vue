<template>
  <article class="demo-row" :class="{ 'is-active': active }">
    <AppIconButton
      size="xl"
      :tone="active ? 'accent' : 'outline'"
      :icon="playing ? 'pause' : 'play'"
      :label="`${playing ? 'Pause' : 'Play'} ${track.title.toLowerCase()}`"
      :show-tooltip="false"
      :aria-pressed="playing"
      root-class="demo-row__play"
      @click="toggleTrack(track)"
    />

    <div class="demo-row__heading">
      <p class="demo-row__status" aria-hidden="true">
        <template v-if="playing">
          <span class="equalizer"><span /><span /><span /></span>
          Now playing
        </template>
        <template v-else>{{ String(number).padStart(2, "0") }}</template>
      </p>
      <h3 class="demo-row__title">{{ track.title }}</h3>
    </div>

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

  const props = defineProps<{ track: DemoTrack; number: number }>();
  const { isPlaying, progress, currentTime, duration, toggleTrack, seekToPercent, isCurrent, durationLabel, formatTime } = usePlayer();
  const active = computed(() => isCurrent(props.track));
  const playing = computed(() => active.value && isPlaying.value);
  const currentLabel = computed(() => (active.value ? formatTime(currentTime.value) : "0:00"));
</script>

<style scoped>
  .demo-row {
    position: relative;
    display: grid;
    grid-template-columns: auto minmax(13rem, 17rem) minmax(0, 1fr) auto;
    grid-template-areas: "play heading progress download";
    align-items: center;
    column-gap: clamp(1rem, 2.5vw, 2rem);
    padding: 1.5rem clamp(0.75rem, 2vw, 1.5rem);
    border-radius: var(--radius-lg);
    transition: background-color var(--duration) var(--ease);
  }

  /* A hairline between rows; hidden where it would touch a highlighted row. */
  .demo-row + .demo-row::before {
    content: "";
    position: absolute;
    top: 0;
    inset-inline: clamp(0.75rem, 2vw, 1.5rem);
    height: 1px;
    background: rgb(var(--color-line));
  }

  .demo-row:hover,
  .demo-row.is-active {
    background: rgb(var(--color-surface));
  }

  .demo-row:hover::before,
  .demo-row.is-active::before,
  .demo-row:hover + .demo-row::before,
  .demo-row.is-active + .demo-row::before {
    opacity: 0;
  }

  .demo-row__play {
    grid-area: play;
  }

  .demo-row__heading {
    grid-area: heading;
    min-width: 0;
  }

  .demo-row__status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    height: 1.25rem;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-variant-numeric: tabular-nums;
    color: rgb(var(--color-secondary));
  }

  .demo-row.is-active .demo-row__status {
    color: rgb(var(--color-accent));
  }

  .demo-row__title {
    margin-top: 0.25rem;
    font-family: var(--font-display);
    font-size: clamp(1.75rem, 2.6vw, 2.25rem);
    line-height: 1;
  }

  .demo-row__progress {
    grid-area: progress;
    display: flex;
    min-width: 0;
    align-items: center;
    gap: 0.875rem;
    color: rgb(var(--color-secondary));
    font-size: 0.8125rem;
    font-variant-numeric: tabular-nums;
  }

  .demo-row__progress > span {
    flex: none;
    min-width: 2.25rem;
    text-align: center;
  }

  .demo-row__download {
    grid-area: download;
    padding-inline: 0.5rem;
  }

  .equalizer {
    display: inline-flex;
    align-items: flex-end;
    gap: 2px;
    height: 0.75rem;
  }

  .equalizer span {
    width: 3px;
    height: 100%;
    border-radius: 1px;
    background: currentColor;
    transform-origin: bottom;
    animation: equalize 0.9s ease-in-out infinite alternate;
  }

  .equalizer span:nth-child(2) {
    animation-delay: -0.45s;
  }

  .equalizer span:nth-child(3) {
    animation-delay: -0.2s;
  }

  @keyframes equalize {
    from {
      transform: scaleY(0.25);
    }
    to {
      transform: scaleY(1);
    }
  }

  @media (max-width: 860px) {
    .demo-row {
      grid-template-columns: auto minmax(0, 1fr) auto;
      grid-template-areas: "play heading download" "progress progress progress";
      row-gap: 0.75rem;
      padding-block: 1.25rem;
    }
  }

  @media (max-width: 420px) {
    .demo-row__progress {
      gap: 0.375rem;
      font-size: 0.75rem;
    }
    .demo-row__progress > span {
      min-width: 2rem;
    }
  }
</style>
