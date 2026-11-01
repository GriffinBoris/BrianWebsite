<template>
  <Transition name="player">
    <div
      v-if="currentTrack"
      class="theme-studio fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] z-[60] mx-auto max-w-[60rem] rounded-lg border border-line shadow-float"
      role="region"
      aria-label="Audio player"
    >
      <div class="flex min-h-[calc(var(--player-height)-env(safe-area-inset-bottom,0px)-0.75rem)] items-center gap-x-4 px-3 py-2 sm:px-4 max-[620px]:flex-wrap">
        <AppIconButton
          size="lg"
          tone="accent"
          :icon="isPlaying ? 'pause' : 'play'"
          :label="`${isPlaying ? 'Pause' : 'Play'} ${currentTrack.title.toLowerCase()}`"
          :show-tooltip="false"
          :aria-pressed="isPlaying"
          @click="togglePlayback"
        />

        <div class="w-[clamp(8rem,20vw,12rem)] min-w-0 flex-none max-[620px]:w-auto max-[620px]:flex-1">
          <p class="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-accent">{{ isPlaying ? "Now playing" : "Paused" }}</p>
          <p class="truncate font-semibold leading-tight">{{ currentTrack.title }}</p>
        </div>

        <div class="flex min-w-0 flex-1 items-center gap-3 max-[620px]:order-last max-[620px]:basis-full">
          <span class="min-w-[2.6rem] text-center text-[0.8rem] tabular-nums text-secondary">{{ formatTime(currentTime) }}</span>
          <AudioSeek
            :waveform="currentTrack.waveform"
            :value="progress"
            :disabled="!duration"
            :label="`Seek in ${currentTrack.title.toLowerCase()}`"
            :value-text="`${formatTime(currentTime)} of ${formatTime(duration)}`"
            @seek="seekToPercent"
          />
          <span class="min-w-[2.6rem] text-center text-[0.8rem] tabular-nums text-secondary">{{ formatTime(duration) }}</span>
        </div>

        <AppIconButton tone="ghost" icon="close" label="Close player" @click="close" />
      </div>

      <div v-if="playbackError" class="absolute inset-x-0 bottom-full mb-2 rounded-md border border-line bg-surface px-4 py-3 text-center text-sm" role="alert">
        {{ playbackError }}
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  import AudioSeek from "@/components/player/AudioSeek.vue";
  import AppIconButton from "@/components/ui/AppIconButton.vue";
  import { usePlayer } from "@/composables/usePlayer";

  const { currentTrack, isPlaying, playbackError, currentTime, duration, progress, togglePlayback, seekToPercent, close, formatTime } = usePlayer();
</script>

<style scoped>
  .player-enter-active,
  .player-leave-active {
    transition:
      transform 280ms var(--ease),
      opacity 280ms var(--ease);
  }

  .player-enter-from,
  .player-leave-to {
    transform: translateY(calc(100% + 1rem));
    opacity: 0;
  }
</style>
