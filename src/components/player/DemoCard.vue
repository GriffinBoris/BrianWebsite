<template>
  <AppSurface :root-class="active ? 'border-accent shadow-md' : ''">
    <div class="flex items-center gap-4 sm:gap-[1.1rem]">
      <AppIconButton
        size="lg"
        tone="accent"
        :icon="active && isPlaying ? 'pause' : 'play'"
        :label="`${active && isPlaying ? 'Pause' : 'Play'} ${track.title.toLowerCase()}`"
        :show-tooltip="false"
        root-class="flex-none"
        @click="toggleTrack(track)"
      />

      <h3 class="min-w-0 flex-1 text-[1.35rem]">{{ track.title }}</h3>
    </div>

    <div class="mt-[1.1rem] flex items-center gap-3">
      <span class="min-w-[2.6rem] text-center text-[0.82rem] tabular-nums text-secondary">{{ currentLabel }}</span>
      <div class="relative h-1.5 flex-1 overflow-hidden rounded-pill bg-line">
        <span class="absolute inset-y-0 left-0 rounded-pill bg-accent" :style="{ width: `${active ? progress : 0}%` }" />
      </div>
      <span class="min-w-[2.6rem] text-center text-[0.82rem] tabular-nums text-secondary">{{ durationLabel(track) }}</span>
    </div>
  </AppSurface>
</template>

<script setup lang="ts">
  import AppIconButton from "@/components/ui/AppIconButton.vue";
  import AppSurface from "@/components/ui/AppSurface.vue";
  import { usePlayer } from "@/composables/usePlayer";
  import type { DemoTrack } from "@/data/demos";
  import { computed } from "vue";

  const props = defineProps<{ track: DemoTrack }>();

  const { isPlaying, progress, currentTime, toggleTrack, isCurrent, durationLabel, formatTime } = usePlayer();

  const active = computed(() => isCurrent(props.track));
  const currentLabel = computed(() => (active.value ? formatTime(currentTime.value) : "0:00"));
</script>
