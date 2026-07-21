<template>
  <Transition name="player">
    <div
      v-if="currentTrack"
      class="fixed inset-x-0 bottom-0 z-[60] border-t border-line bg-surface/95 backdrop-blur-md backdrop-saturate-150"
      role="region"
      aria-label="Audio player"
    >
      <div class="mx-auto flex h-[var(--player-height)] max-w-container items-center gap-4 px-4 sm:px-10">
        <AppIconButton
          size="md"
          tone="accent"
          :icon="isPlaying ? 'pause' : 'play'"
          :label="`${isPlaying ? 'Pause' : 'Play'} ${currentTrack.title.toLowerCase()}`"
          :show-tooltip="false"
          root-class="h-11 w-11 flex-none"
          @click="togglePlayback"
        />

        <div class="w-[clamp(7rem,22vw,13rem)] min-w-0 flex-none max-[620px]:w-auto max-[620px]:flex-1">
          <div class="text-[0.72rem] uppercase tracking-[0.12em] text-accent">{{ currentTrack.kicker }}</div>
          <div class="truncate text-[0.95rem] font-semibold">{{ currentTrack.title }}</div>
        </div>

        <div class="flex flex-1 items-center gap-[0.7rem] max-[620px]:hidden">
          <span class="min-w-[2.6rem] text-center text-[0.8rem] tabular-nums text-secondary">{{ formatTime(currentTime) }}</span>
          <input
            class="player__range flex-1"
            type="range"
            min="0"
            max="100"
            step="0.1"
            :value="progress"
            :style="{ '--p': `${progress}%` }"
            aria-label="Seek"
            @input="onSeek"
          />
          <span class="min-w-[2.6rem] text-center text-[0.8rem] tabular-nums text-secondary">{{ formatTime(duration) }}</span>
        </div>

        <AppIconButton size="sm" tone="ghost" icon="close" label="Close player" root-class="flex-none" @click="close" />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  import AppIconButton from "@/components/ui/AppIconButton.vue";
  import { usePlayer } from "@/composables/usePlayer";

  const { currentTrack, isPlaying, currentTime, duration, progress, togglePlayback, seekToPercent, close, formatTime } = usePlayer();

  function onSeek(event: Event) {
    seekToPercent(Number((event.target as HTMLInputElement).value));
  }
</script>

<style scoped>
  .player-enter-active,
  .player-leave-active {
    transition:
      transform var(--duration) var(--ease),
      opacity var(--duration) var(--ease);
  }

  .player-enter-from,
  .player-leave-to {
    transform: translateY(110%);
    opacity: 0;
  }

  .player__range {
    appearance: none;
    height: 6px;
    border-radius: 999px;
    background: linear-gradient(to right, rgb(var(--color-accent)) var(--p, 0%), rgb(var(--color-line)) var(--p, 0%));
    cursor: pointer;
  }

  .player__range::-webkit-slider-thumb {
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 999px;
    background: rgb(var(--color-accent));
    border: 2px solid rgb(var(--color-surface));
    box-shadow: var(--shadow-sm);
  }

  .player__range::-moz-range-thumb {
    width: 15px;
    height: 15px;
    border: 2px solid rgb(var(--color-surface));
    border-radius: 999px;
    background: rgb(var(--color-accent));
  }
</style>
