<template>
  <figure
    class="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-surface-muted shadow-lg max-[860px]:order-first max-[860px]:mx-auto max-[860px]:max-w-[20rem]"
    aria-roledescription="carousel"
    aria-label="Headshots of Brian Bakaj"
    @pointerenter="pause"
    @pointerleave="resume"
    @focusin="pause"
    @focusout="resume"
  >
    <img
      v-for="(shot, index) in shots"
      :key="shot.src"
      :src="shot.src"
      :alt="shot.alt"
      width="640"
      height="800"
      :loading="index === 0 ? 'eager' : 'lazy'"
      :fetchpriority="index === 0 ? 'high' : undefined"
      :aria-hidden="index === activeIndex ? undefined : 'true'"
      class="absolute inset-0 h-full w-full object-cover object-[center_30%] transition-opacity duration-700 ease-smooth motion-reduce:transition-none"
      :class="index === activeIndex ? 'opacity-100' : 'opacity-0'"
    />

    <div class="absolute inset-x-0 bottom-3.5 flex justify-center gap-2">
      <button
        v-for="(shot, index) in shots"
        :key="shot.src"
        type="button"
        class="h-2 rounded-pill shadow-sm outline-none transition-all duration-300 ease-smooth focus-visible:ring-2 focus-visible:ring-white/90"
        :class="index === activeIndex ? 'w-5 bg-white' : 'w-2 bg-white/55 hover:bg-white/80'"
        :aria-label="`Show headshot ${index + 1} of ${shots.length}`"
        :aria-current="index === activeIndex ? 'true' : undefined"
        @click="select(index)"
      />
    </div>
  </figure>
</template>

<script setup lang="ts">
  import look01 from "@/assets/img/brian-look-01.jpg";
  import look02 from "@/assets/img/brian-look-02.jpg";
  import headshot from "@/assets/img/headshot.jpg";
  import { onMounted, onUnmounted, ref } from "vue";

  // The hero photo rotates through Brian's recent looks so the first thing a
  // visitor sees quietly shows range. This is the second orchestrated motion
  // moment after the waveform; keep it a slow crossfade, nothing louder.
  const shots = [
    { src: headshot, alt: "Brian Bakaj, headshot" },
    { src: look01, alt: "Brian Bakaj, portrait" },
    { src: look02, alt: "Brian Bakaj, portrait" },
  ];

  const intervalMs = 5000;
  const activeIndex = ref(0);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let timer: number | undefined;

  function advance() {
    activeIndex.value = (activeIndex.value + 1) % shots.length;
  }

  function start() {
    if (reduceMotion || timer) {
      return;
    }
    timer = window.setInterval(advance, intervalMs);
  }

  function stop() {
    window.clearInterval(timer);
    timer = undefined;
  }

  function select(index: number) {
    activeIndex.value = index;
    stop();
    start();
  }

  const pause = stop;
  const resume = start;

  function onVisibilityChange() {
    document.hidden ? stop() : start();
  }

  onMounted(() => {
    start();
    document.addEventListener("visibilitychange", onVisibilityChange);
  });

  onUnmounted(() => {
    stop();
    document.removeEventListener("visibilitychange", onVisibilityChange);
  });
</script>
