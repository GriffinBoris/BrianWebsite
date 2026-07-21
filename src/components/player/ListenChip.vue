<template>
  <AppButton
    tone="secondary"
    :root-class="cn('min-h-0 gap-2.5 rounded-pill py-2 pl-2.5 pr-4 text-[0.92rem]', active && 'border-accent')"
    :aria-label="`Play ${track.title.toLowerCase()}`"
    @click="toggleTrack(track)"
  >
    <span class="grid h-8 w-8 place-items-center rounded-pill bg-accent text-accent-contrast">
      <AppIcon :icon="active && isPlaying ? 'pause' : 'play'" class="h-4 w-4" />
    </span>
    {{ track.kicker }}
    <span class="text-[0.85rem] tabular-nums text-secondary">{{ durationLabel(track) }}</span>
  </AppButton>
</template>

<script setup lang="ts">
  import AppButton from "@/components/ui/AppButton.vue";
  import AppIcon from "@/components/ui/AppIcon.vue";
  import { usePlayer } from "@/composables/usePlayer";
  import type { DemoTrack } from "@/data/demos";
  import { cn } from "@/utils/className";
  import { computed } from "vue";

  const props = defineProps<{ track: DemoTrack }>();

  const { isPlaying, toggleTrack, isCurrent, durationLabel } = usePlayer();

  const active = computed(() => isCurrent(props.track));
</script>
