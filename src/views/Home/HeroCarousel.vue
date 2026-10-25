<template>
  <figure
    ref="carousel"
    class="relative aspect-[4/5] w-full touch-pan-y overflow-hidden rounded-lg bg-surface-muted shadow-lg max-[860px]:order-first max-[860px]:mx-auto max-[860px]:max-w-[20rem]"
    aria-roledescription="carousel"
    aria-label="Headshots of Brian Bakaj"
    @focusin="stopOnFocus"
    @pointerdown="onPointerDown"
    @pointerup="onPointerUp"
    @pointercancel="swipeStart = null"
    @keydown.left.prevent="select(activeIndex - 1)"
    @keydown.right.prevent="select(activeIndex + 1)"
  >
    <img
      v-for="(shot, index) in shots"
      :key="shot.src"
      :src="shot.src"
      :alt="shot.alt"
      width="640"
      height="800"
      draggable="false"
      :loading="index === 0 ? 'eager' : 'lazy'"
      :fetchpriority="index === 0 ? 'high' : undefined"
      :aria-hidden="index === activeIndex ? undefined : 'true'"
      class="absolute inset-0 h-full w-full object-cover object-[center_30%] transition-opacity duration-700 ease-smooth motion-reduce:transition-none"
      :class="index === activeIndex ? 'opacity-100' : 'opacity-0'"
    />

    <AppIconButton
      icon="chevronLeft"
      label="Previous headshot"
      :show-tooltip="false"
      root-class="absolute left-3 top-1/2 h-11 w-11 -translate-y-1/2 border-0 bg-photo-overlay/80 text-photo-contrast hover:-translate-y-1/2 hover:bg-photo-overlay hover:text-photo-contrast focus-visible:ring-photo-contrast"
      @click="select(activeIndex - 1)"
    />
    <AppIconButton
      icon="chevronRight"
      label="Next headshot"
      :show-tooltip="false"
      root-class="absolute right-3 top-1/2 h-11 w-11 -translate-y-1/2 border-0 bg-photo-overlay/80 text-photo-contrast hover:-translate-y-1/2 hover:bg-photo-overlay hover:text-photo-contrast focus-visible:ring-photo-contrast"
      @click="select(activeIndex + 1)"
    />

    <div class="absolute inset-x-0 bottom-3 flex justify-center">
      <div class="flex items-center rounded-pill bg-photo-overlay/80 p-1">
        <AppButton
          :icon="rotationEnabled ? 'pause' : 'play'"
          :aria-label="rotationEnabled ? 'Pause headshot rotation' : 'Start headshot rotation'"
          tone="ghost"
          root-class="h-11 w-11 min-h-0 rounded-pill border-0 p-0 text-photo-contrast hover:translate-y-0 hover:bg-photo-contrast/15 hover:text-photo-contrast focus-visible:ring-photo-contrast"
          @click="rotationEnabled = !rotationEnabled"
        />
        <AppButton
          v-for="(shot, index) in shots"
          :key="shot.src"
          tone="ghost"
          root-class="h-11 w-11 min-h-0 rounded-pill border-0 p-0 hover:translate-y-0 hover:bg-photo-contrast/15 focus-visible:ring-photo-contrast"
          :aria-label="`Show headshot ${index + 1} of ${shots.length}`"
          :aria-current="index === activeIndex ? 'true' : undefined"
          @click="select(index)"
        >
          <span class="h-2 rounded-pill bg-photo-contrast" :class="index === activeIndex ? 'w-5' : 'w-2 opacity-60'" />
        </AppButton>
      </div>
    </div>
    <figcaption class="sr-only" :aria-live="rotationEnabled ? 'off' : 'polite'" aria-atomic="true">
      Headshot {{ activeIndex + 1 }} of {{ shots.length }}
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
  import look01 from "@/assets/img/brian-look-01.jpg";
  import look02 from "@/assets/img/brian-look-02.jpg";
  import headshot from "@/assets/img/headshot.jpg";
  import AppButton from "@/components/ui/AppButton.vue";
  import AppIconButton from "@/components/ui/AppIconButton.vue";
  import { onMounted, onUnmounted, ref, useTemplateRef, watch } from "vue";

  const shots = [
    { src: headshot, alt: "Brian Bakaj, headshot" },
    { src: look01, alt: "Brian Bakaj, portrait" },
    { src: look02, alt: "Brian Bakaj, portrait" },
  ];

  const activeIndex = ref(0);
  const carousel = useTemplateRef<HTMLElement>("carousel");
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const rotationEnabled = ref(!motionPreference.matches);

  let timer: number | undefined;
  let swipeStart: { x: number; y: number } | null = null;

  function onPointerDown(event: PointerEvent) {
    if (!event.isPrimary || event.button !== 0 || (event.target as HTMLElement).closest("button, a")) {
      return;
    }
    swipeStart = { x: event.clientX, y: event.clientY };
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  }

  function onPointerUp(event: PointerEvent) {
    if (!swipeStart || !event.isPrimary) {
      return;
    }
    const deltaX = event.clientX - swipeStart.x;
    const deltaY = event.clientY - swipeStart.y;
    swipeStart = null;
    // Leave vertical gestures to page scrolling; short taps do not change photos.
    if (Math.abs(deltaX) >= 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      select(activeIndex.value + (deltaX < 0 ? 1 : -1));
    }
  }

  function stop() {
    window.clearInterval(timer);
    timer = undefined;
  }

  function select(index: number) {
    activeIndex.value = (index + shots.length) % shots.length;
    rotationEnabled.value = false;
  }

  // Pause when keyboard focus enters, then require an explicit restart.
  // Moving between its controls must not cancel the user's Start action.
  function stopOnFocus(event: FocusEvent) {
    const enteredFromOutside = !(event.currentTarget as HTMLElement).contains(event.relatedTarget as Node | null);
    if (enteredFromOutside && (event.target as HTMLElement).matches(":focus-visible")) {
      rotationEnabled.value = false;
    }
  }

  function onMotionChange() {
    if (motionPreference.matches) {
      rotationEnabled.value = false;
    }
  }

  watch(
    rotationEnabled,
    (enabled) => {
      stop();
      if (enabled) {
        timer = window.setInterval(() => {
          if (!document.hidden && !carousel.value?.matches(":hover")) {
            activeIndex.value = (activeIndex.value + 1) % shots.length;
          }
        }, 5000);
      }
    },
    { immediate: true },
  );

  onMounted(() => {
    motionPreference.addEventListener("change", onMotionChange);
  });

  onUnmounted(() => {
    stop();
    motionPreference.removeEventListener("change", onMotionChange);
  });
</script>
