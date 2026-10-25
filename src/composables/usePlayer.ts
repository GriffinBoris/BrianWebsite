import { computed, reactive, ref } from "vue";

import type { DemoTrack } from "@/data/demos";

// Shared playback survives route changes. Web Audio only enhances the waveform.

export const WAVE_BAR_COUNT = 64;

const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

const currentTrack = ref<DemoTrack | null>(null);
const isPlaying = ref(false);
const isBuffering = ref(false);
let waveVisible = false;
const playbackError = ref("");
const currentTime = ref(0);
const duration = ref(0);
const isWaveActive = ref(false);
const waveHeights = ref<number[]>(new Array(WAVE_BAR_COUNT).fill(8));
const durations = reactive<Record<string, string>>({});

const progress = computed(() => {
  if (!duration.value || !Number.isFinite(duration.value)) {
    return 0;
  }
  return (currentTime.value / duration.value) * 100;
});

// Engine singletons, created lazily so nothing touches the Web Audio API until
// the visitor presses play.
let audio: HTMLAudioElement | null = null;
let audioContext: AudioContext | null = null;
let analyser: AnalyserNode | null = null;
let frequencyData: Uint8Array<ArrayBuffer> | null = null;
let rafId: number | null = null;
let lastWaveTime = 0;
let frequencyBands: { start: number; end: number }[] = [];

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
  audio.addEventListener("waiting", () => {
    isBuffering.value = true;
    stopWave();
  });
  audio.addEventListener("playing", () => {
    isBuffering.value = false;
    startWave();
  });
  audio.addEventListener("pause", () => {
    isPlaying.value = false;
    isBuffering.value = false;
    stopWave();
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
    isBuffering.value = false;
    stopWave();
  });
  audio.addEventListener("error", reportPlaybackError);

  return audio;
}

function reportPlaybackError() {
  playbackError.value = "Couldn’t play this reel. Please try again.";
  isPlaying.value = false;
  isBuffering.value = false;
  stopWave();
}

function setupAnalyser() {
  if (analyser || motionPreference.matches || !audio) {
    return;
  }

  const AudioContextClass = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) {
    return;
  }

  // The Web Audio graph is a progressive enhancement; if the browser refuses to
  // wire it up, the waveform keeps its CSS idle animation.
  try {
    audioContext = new AudioContextClass();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.65;
    // Logarithmic bands give the voice range room to move, instead of spending
    // most of the display on nearly silent high frequencies.
    const binWidth = audioContext.sampleRate / analyser.fftSize;
    const maxFrequency = Math.min(10000, audioContext.sampleRate / 2);
    frequencyBands = Array.from({ length: WAVE_BAR_COUNT / 2 }, (_, index) => ({
      start: Math.max(1, Math.floor((90 * Math.pow(maxFrequency / 90, index / (WAVE_BAR_COUNT / 2))) / binWidth)),
      end: Math.min(analyser!.frequencyBinCount, Math.ceil((90 * Math.pow(maxFrequency / 90, (index + 1) / (WAVE_BAR_COUNT / 2))) / binWidth)),
    }));
    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    frequencyData = new Uint8Array(analyser.frequencyBinCount);
  } catch (error) {
    console.warn("Waveform analyser unavailable; falling back to idle animation.", error);
    analyser = null;
  }
}

function renderWave(timestamp = 0) {
  if (!analyser || !frequencyData) return;

  // About 30 updates per second; transforms handle the motion between samples.
  if (!lastWaveTime || timestamp - lastWaveTime >= 32) {
    const elapsed = lastWaveTime ? Math.min(timestamp - lastWaveTime, 100) : 33;
    lastWaveTime = timestamp;
    analyser.getByteFrequencyData(frequencyData);
    const next = new Array<number>(WAVE_BAR_COUNT);
    for (let i = 0; i < WAVE_BAR_COUNT / 2; i++) {
      const band = frequencyBands[WAVE_BAR_COUNT / 2 - 1 - i]!;
      let energy = 0;
      for (let bin = band.start; bin < band.end; bin++) {
        energy += Math.pow(frequencyData[bin]! / 255, 2);
      }
      const amplitude = Math.sqrt(energy / Math.max(1, band.end - band.start));
      const envelope = 0.4 + 0.6 * Math.sin((Math.PI * (i + 0.5)) / WAVE_BAR_COUNT);
      const target = 6 + Math.pow(amplitude, 0.8) * 94 * envelope;
      const previous = waveHeights.value[i] ?? 8;
      // Quick attack, slower release keeps quiet syllables fluid and readable.
      const smoothing = 1 - Math.exp(-elapsed / (target > previous ? 45 : 160));
      const height = previous + (target - previous) * smoothing;
      next[i] = height;
      next[WAVE_BAR_COUNT - 1 - i] = height;
    }
    waveHeights.value = next;
  }
  rafId = window.requestAnimationFrame(renderWave);
}

function startWave() {
  if (!analyser || !waveVisible || document.hidden || motionPreference.matches || !isPlaying.value || isBuffering.value) {
    return;
  }
  isWaveActive.value = true;
  if (rafId === null) {
    renderWave();
  }
}

function stopWave() {
  if (rafId !== null) {
    window.cancelAnimationFrame(rafId);
    rafId = null;
  }
  isWaveActive.value = false;
  lastWaveTime = 0;
}

function setWaveVisible(visible: boolean) {
  waveVisible = visible;
  if (visible) startWave();
  else stopWave();
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) stopWave();
  else startWave();
});
motionPreference.addEventListener("change", () => {
  if (motionPreference.matches) stopWave();
  else {
    setupAnalyser();
    startWave();
  }
});

function playTrack(track: DemoTrack) {
  const element = ensureAudio();
  playbackError.value = "";
  isBuffering.value = true;
  stopWave();

  if (currentTrack.value?.id !== track.id || element.error) {
    currentTrack.value = track;
    element.src = track.src;
    currentTime.value = 0;
    duration.value = 0;
  }

  setupAnalyser();
  if (audioContext?.state === "suspended") {
    void audioContext.resume();
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
    isBuffering.value = false;
    currentTime.value = 0;
    duration.value = 0;
    stopWave();
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
    isBuffering,
    playbackError,
    currentTime,
    duration,
    progress,
    isWaveActive,
    waveHeights,
    setWaveVisible,
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
