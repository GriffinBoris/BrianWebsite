import { computed, reactive, ref } from "vue";

import type { DemoTrack } from "@/data/demos";

// One <audio> element backs everything: the demo cards, the hero quick-listen
// chips, and the persistent bar. Only one demo plays at a time, and every
// control that points at the current track stays in sync through shared state.
//
// The hero waveform is the site's one bold moment. While a demo plays it is
// driven by the Web Audio analyser, so the bars are literally Brian's voice. If
// the browser can't provide that, the bars keep their calm idle animation.

export const WAVE_BAR_COUNT = 48;

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const currentTrack = ref<DemoTrack | null>(null);
const isPlaying = ref(false);
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
    startWave();
  });
  audio.addEventListener("pause", () => {
    isPlaying.value = false;
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
    stopWave();
  });

  return audio;
}

function setupAnalyser() {
  if (analyser || prefersReducedMotion || !audio) {
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
    analyser.fftSize = 128;
    analyser.smoothingTimeConstant = 0.8;
    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    frequencyData = new Uint8Array(analyser.frequencyBinCount);
  } catch (error) {
    console.warn("Waveform analyser unavailable; falling back to idle animation.", error);
    analyser = null;
  }
}

function renderWave() {
  if (!analyser || !frequencyData) {
    return;
  }

  analyser.getByteFrequencyData(frequencyData);
  const bins = frequencyData.length;
  const next = new Array<number>(WAVE_BAR_COUNT);
  for (let i = 0; i < WAVE_BAR_COUNT; i++) {
    const index = Math.floor((i / WAVE_BAR_COUNT) * bins);
    next[i] = Math.max(8, (frequencyData[index] / 255) * 100);
  }
  waveHeights.value = next;

  rafId = window.requestAnimationFrame(renderWave);
}

function startWave() {
  if (!analyser) {
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
}

function playTrack(track: DemoTrack) {
  const element = ensureAudio();

  if (currentTrack.value?.id !== track.id) {
    currentTrack.value = track;
    element.src = track.src;
    currentTime.value = 0;
    duration.value = 0;
  }

  setupAnalyser();
  if (audioContext?.state === "suspended") {
    void audioContext.resume();
  }
  void element.play();
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
    isPlaying.value = false;
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
    currentTime,
    duration,
    progress,
    isWaveActive,
    waveHeights,
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
