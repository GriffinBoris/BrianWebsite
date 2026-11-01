<template>
  <Transition name="player">
    <div
      v-if="currentTrack"
      class="fixed inset-x-0 bottom-0 z-[60] border-t border-line bg-surface pb-[env(safe-area-inset-bottom)]"
      role="region"
      aria-label="Audio player"
    >
      <div class="site-container flex h-[calc(var(--player-height)-env(safe-area-inset-bottom,0px))] items-center gap-x-4 max-[620px]:flex-wrap max-[620px]:content-center max-[620px]:gap-y-1">
        <AppIconButton
          tone="accent"
          :icon="isPlaying ? 'pause' : 'play'"
          :label="`${isPlaying ? 'Pause' : 'Play'} ${currentTrack.title.toLowerCase()}`"
          :show-tooltip="false"
          :aria-pressed="isPlaying"
          @click="togglePlayback"
        />

        <p class="w-[clamp(8rem,18vw,11rem)] min-w-0 flex-none truncate text-sm font-semibold max-[620px]:w-auto max-[620px]:flex-1">{{ currentTrack.title }}</p>

        <div class="flex min-w-0 flex-1 items-center gap-3 max-[620px]:order-last max-[620px]:basis-full">
          <span class="min-w-[2.4rem] text-center text-xs tabular-nums text-secondary">{{ formatTime(currentTime) }}</span>
          <AudioSeek
            :waveform="currentTrack.waveform"
            :value="progress"
            :disabled="!duration"
            :label="`Seek in ${currentTrack.title.toLowerCase()}`"
            :value-text="`${formatTime(currentTime)} of ${formatTime(duration)}`"
            @seek="seekToPercent"
          />
          <span class="min-w-[2.4rem] text-center text-xs tabular-nums text-secondary">{{ formatTime(duration) }}</span>
        </div>

        <AppIconButton tone="ghost" icon="close" label="Close player" @click="close" />
      </div>

      <div v-if="playbackError" class="absolute inset-x-0 bottom-full border-y border-line bg-surface px-4 py-3 text-center text-sm" role="alert">
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
    transition: transform 200ms var(--ease);
  }

  .player-enter-from,
  .player-leave-to {
    transform: translateY(100%);
  }
</style>
