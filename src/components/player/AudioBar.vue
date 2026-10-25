<template>
  <Transition name="player">
    <div
      v-if="currentTrack"
      class="fixed inset-x-0 bottom-0 z-[60] border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md backdrop-saturate-150"
      role="region"
      aria-label="Audio player"
    >
      <div class="mx-auto flex h-[calc(var(--player-height)-env(safe-area-inset-bottom,0px))] max-w-container items-center gap-x-4 gap-y-0 px-4 sm:px-10 max-[620px]:flex-wrap max-[620px]:py-2">
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
          <div class="truncate text-[0.95rem] font-semibold">{{ currentTrack.title }}</div>
        </div>

        <div class="flex min-w-0 flex-1 items-center gap-[0.7rem] max-[620px]:order-last max-[620px]:basis-full">
          <span class="min-w-[2.6rem] text-center text-[0.8rem] tabular-nums text-secondary">{{ formatTime(currentTime) }}</span>
          <input
            class="player__range flex-1"
            type="range"
            min="0"
            max="100"
            step="0.1"
            :value="progress"
            :style="{ '--p': `${progress}%` }"
            :disabled="!duration"
            :aria-label="`Seek in ${currentTrack.title.toLowerCase()}`"
            :aria-valuetext="`${formatTime(currentTime)} of ${formatTime(duration)}`"
            @input="onSeek"
          />
          <span class="min-w-[2.6rem] text-center text-[0.8rem] tabular-nums text-secondary">{{ formatTime(duration) }}</span>
        </div>

        <AppIconButton size="sm" tone="ghost" icon="close" label="Close player" root-class="flex-none" @click="close" />
      </div>

      <div v-if="playbackError" class="absolute inset-x-0 bottom-full border-y border-line bg-surface px-4 py-3 text-center text-sm" role="alert">
        {{ playbackError }}
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  import AppIconButton from "@/components/ui/AppIconButton.vue";
  import { usePlayer } from "@/composables/usePlayer";

  const { currentTrack, isPlaying, playbackError, currentTime, duration, progress, togglePlayback, seekToPercent, close, formatTime } = usePlayer();

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
    min-width: 0;
    height: 44px;
    background: transparent;
    cursor: pointer;
  }

  .player__range::-webkit-slider-runnable-track {
    height: 6px;
    border-radius: var(--radius-pill);
    background: linear-gradient(to right, rgb(var(--color-accent)) var(--p, 0%), rgb(var(--color-line)) var(--p, 0%));
  }

  .player__range::-webkit-slider-thumb {
    appearance: none;
    margin-top: -4.5px;
    width: 15px;
    height: 15px;
    border-radius: var(--radius-pill);
    background: rgb(var(--color-accent));
    border: 2px solid rgb(var(--color-surface));
    box-shadow: var(--shadow-sm);
  }

  .player__range::-moz-range-track {
    height: 6px;
    border-radius: var(--radius-pill);
    background: linear-gradient(to right, rgb(var(--color-accent)) var(--p, 0%), rgb(var(--color-line)) var(--p, 0%));
  }

  .player__range::-moz-range-thumb {
    width: 15px;
    height: 15px;
    border: 2px solid rgb(var(--color-surface));
    border-radius: var(--radius-pill);
    background: rgb(var(--color-accent));
  }
</style>
