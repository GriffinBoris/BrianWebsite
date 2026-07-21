<template>
  <button
    type="button"
    class="group inline-flex items-center gap-2.5 rounded-pill border border-line bg-surface py-2.5 pl-2.5 pr-4 text-[0.92rem] font-medium text-body transition duration-[240ms] ease-smooth hover:-translate-y-px hover:border-accent"
    :class="{ 'border-accent': active }"
    :aria-pressed="active && isPlaying"
    :aria-label="`Play ${track.title.toLowerCase()}`"
    @click="toggleTrack(track)"
  >
    <span class="grid h-8 w-8 place-items-center rounded-pill bg-accent text-accent-contrast">
      <PauseIcon v-if="active && isPlaying" class="h-3.5 w-3.5" />
      <PlayIcon v-else class="h-4 w-4" />
    </span>
    {{ track.kicker }}
    <span class="text-[0.85rem] tabular-nums text-secondary">{{ durationLabel(track) }}</span>
  </button>
</template>

<script setup lang="ts">
  import { usePlayer } from "@/composables/usePlayer";
  import PauseIcon from "@/components/ui/icons/PauseIcon.vue";
  import PlayIcon from "@/components/ui/icons/PlayIcon.vue";
  import type { DemoTrack } from "@/data/demos";
  import { computed } from "vue";

  const props = defineProps<{ track: DemoTrack }>();

  const { isPlaying, toggleTrack, isCurrent, durationLabel } = usePlayer();

  const active = computed(() => isCurrent(props.track));
</script>
