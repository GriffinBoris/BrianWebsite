import { computed, reactive, ref } from "vue";

import type { DemoTrack } from "@/data/demos";

// Shared playback survives route changes.

const currentTrack = ref<DemoTrack | null>(null);
const isPlaying = ref(false);
const playbackError = ref("");
const currentTime = ref(0);
const duration = ref(0);
const durations = reactive<Record<string, string>>({});

const progress = computed(() => {
  if (!duration.value || !Number.isFinite(duration.value)) {
    return 0;
  }
  return (currentTime.value / duration.value) * 100;
});

// Create the shared audio element lazily when a visitor presses play.
let audio: HTMLAudioElement | null = null;

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) {
    return "0:00";
  }
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${minutes}:${String(remainder).padStart(2, "0")}`;
}

function ensureAudio(): HTMLAudioElement {
  if (audio) {
    return audio;
  }

  audio = new Audio();
  audio.preload = "metadata";
  audio.addEventListener("play", () => {
    isPlaying.value = true;
  });
  audio.addEventListener("pause", () => {
    isPlaying.value = false;
  });
  audio.addEventListener("timeupdate", () => {
    currentTime.value = audio!.currentTime;
  });
  audio.addEventListener("loadedmetadata", () => {
    duration.value = audio!.duration;
  });
  audio.addEventListener("ended", () => {
    audio!.currentTime = 0;
    currentTime.value = 0;
    isPlaying.value = false;
  });
  audio.addEventListener("error", reportPlaybackError);

  return audio;
}

function reportPlaybackError() {
  playbackError.value = "Couldn’t play this reel. Please try again.";
  isPlaying.value = false;
}

function playTrack(track: DemoTrack) {
  const element = ensureAudio();
  playbackError.value = "";

  if (currentTrack.value?.id !== track.id || element.error) {
    currentTrack.value = track;
    element.src = track.src;
    currentTime.value = 0;
    duration.value = 0;
  }

  void element.play().catch((error: DOMException) => {
    // Switching tracks or closing the player intentionally aborts play().
    if (error.name !== "AbortError" && currentTrack.value?.id === track.id) {
      reportPlaybackError();
    }
  });
}

export function usePlayer() {
  function toggleTrack(track: DemoTrack) {
    if (currentTrack.value?.id === track.id && isPlaying.value) {
      audio?.pause();
      return;
    }
    playTrack(track);
  }

  function togglePlayback() {
    if (!currentTrack.value) {
      return;
    }
    if (isPlaying.value) {
      audio?.pause();
    } else {
      playTrack(currentTrack.value);
    }
  }

  function seekToPercent(percent: number) {
    if (!audio || !Number.isFinite(audio.duration)) {
      return;
    }
    audio.currentTime = (percent / 100) * audio.duration;
    currentTime.value = audio.currentTime;
  }

  function close() {
    if (audio) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    }
    currentTrack.value = null;
    playbackError.value = "";
    isPlaying.value = false;
    currentTime.value = 0;
    duration.value = 0;
  }

  // Read each demo's real length once and cache it, so the labels reflect the
  // audio file rather than a hand-typed fallback.
  function loadDurations(tracks: DemoTrack[]) {
    for (const track of tracks) {
      if (durations[track.id]) {
        continue;
      }
      const probe = new Audio();
      probe.preload = "metadata";
      probe.src = track.src;
      probe.addEventListener("loadedmetadata", () => {
        durations[track.id] = formatTime(probe.duration);
      });
    }
  }

  function isCurrent(track: DemoTrack): boolean {
    return currentTrack.value?.id === track.id;
  }

  function durationLabel(track: DemoTrack): string {
    return durations[track.id] ?? track.fallbackDuration;
  }

  return {
    currentTrack,
    isPlaying,
    playbackError,
    currentTime,
    duration,
    progress,
    toggleTrack,
    togglePlayback,
    seekToPercent,
    close,
    loadDurations,
    isCurrent,
    durationLabel,
    formatTime,
  };
}
