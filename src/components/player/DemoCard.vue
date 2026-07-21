<template>
  <article
    class="rounded-lg border border-line bg-surface p-5 shadow-sm transition duration-[240ms] ease-smooth sm:p-7"
    :class="{ 'border-accent shadow-md': active }"
  >
    <div class="flex items-center gap-[1.1rem] max-[560px]:flex-wrap">
      <button
        type="button"
        class="grid h-[3.4rem] w-[3.4rem] flex-none place-items-center rounded-pill bg-accent text-accent-contrast transition duration-[240ms] ease-smooth hover:scale-[1.04] hover:bg-accent-strong"
        :aria-pressed="active && isPlaying"
        :aria-label="`Play ${track.title.toLowerCase()}`"
        @click="toggleTrack(track)"
      >
        <PauseIcon v-if="active && isPlaying" class="h-5 w-5" />
        <PlayIcon v-else class="h-[22px] w-[22px]" />
      </button>

      <div class="min-w-0 flex-1">
        <span class="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-accent">{{ track.kicker }}</span>
        <h3 class="mt-0.5 text-[1.35rem]">{{ track.title }}</h3>
        <p class="mt-1.5 text-[0.98rem] leading-[1.5] text-secondary">{{ track.description }}</p>
      </div>

      <a
        class="inline-flex flex-none items-center gap-1.5 self-start rounded-sm border border-transparent px-2.5 py-1.5 text-[0.85rem] text-secondary transition duration-[240ms] ease-smooth hover:border-line hover:text-accent max-[560px]:order-3 max-[560px]:ml-[calc(3.4rem+1.1rem)]"
        :href="track.src"
        :download="track.downloadName"
      >
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16" />
        </svg>
        Download
      </a>
    </div>

    <div class="mt-[1.1rem] flex items-center gap-3">
      <span class="min-w-[2.6rem] text-center text-[0.82rem] tabular-nums text-secondary">{{ currentLabel }}</span>
      <div class="relative h-1.5 flex-1 overflow-hidden rounded-pill bg-line">
        <span class="absolute inset-y-0 left-0 rounded-pill bg-accent" :style="{ width: `${active ? progress : 0}%` }" />
      </div>
      <span class="min-w-[2.6rem] text-center text-[0.82rem] tabular-nums text-secondary">{{ durationLabel(track) }}</span>
    </div>
  </article>
</template>

<script setup lang="ts">
  import { usePlayer } from "@/composables/usePlayer";
  import PauseIcon from "@/components/ui/icons/PauseIcon.vue";
  import PlayIcon from "@/components/ui/icons/PlayIcon.vue";
  import type { DemoTrack } from "@/data/demos";
  import { computed } from "vue";

  const props = defineProps<{ track: DemoTrack }>();

  const { isPlaying, progress, currentTime, toggleTrack, isCurrent, durationLabel, formatTime } = usePlayer();

  const active = computed(() => isCurrent(props.track));
  const currentLabel = computed(() => (active.value ? formatTime(currentTime.value) : "0:00"));
</script>
