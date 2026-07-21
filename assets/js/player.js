/*
 * Audio engine for the voice demos.
 *
 * One <audio> element backs everything: the demo cards, the hero quick-listen
 * chips, and the persistent bar at the bottom of the page. Only one demo plays
 * at a time, and every control that points at the current track stays in sync.
 *
 * The hero waveform is the site's one bold moment. While a demo plays it is
 * driven by the Web Audio analyser — the bars are literally Brian's voice. If
 * the browser can't provide that, the bars keep their calm idle animation.
 */
(function () {
  "use strict";

  var audio = new Audio();
  audio.preload = "metadata";

  var current = null; // { src, title, kicker }

  // ---- DOM ----
  var triggers = Array.prototype.slice.call(document.querySelectorAll("[data-track]"));
  var demos = Array.prototype.slice.call(document.querySelectorAll("[data-demo]"));
  var bar = document.getElementById("player");
  if (!bar) return; // no audio on this page

  var barToggle = bar.querySelector("[data-player-toggle]");
  var barTitle = bar.querySelector("[data-player-title]");
  var barKicker = bar.querySelector("[data-player-kicker]");
  var barRange = bar.querySelector("[data-player-range]");
  var barCurrent = bar.querySelector("[data-player-current]");
  var barDuration = bar.querySelector("[data-player-duration]");
  var barClose = bar.querySelector("[data-player-close]");
  var waveform = document.getElementById("waveform");
  var waveBars = buildWaveBars(waveform, 48);

  // Render the waveform bars once, with varied idle timing so the resting
  // animation reads as an organic voice rather than a metronome.
  function buildWaveBars(container, count) {
    if (!container) return [];
    var bars = [];
    for (var i = 0; i < count; i++) {
      var bar = document.createElement("span");
      bar.className = "waveform__bar";
      var idle = 30 + Math.round(Math.abs(Math.sin(i * 1.7)) * 55);
      bar.style.setProperty("--h", idle + "%");
      bar.style.setProperty("--delay", (i * 55) % 1400 + "ms");
      container.appendChild(bar);
      bars.push(bar);
    }
    return bars;
  }

  function formatTime(seconds) {
    if (!isFinite(seconds)) return "0:00";
    var m = Math.floor(seconds / 60);
    var s = Math.floor(seconds % 60);
    return m + ":" + String(s).padStart(2, "0");
  }

  function srcMatches(el) {
    return current && el.getAttribute("data-src") === current.src;
  }

  // ---- Playback control ----
  function playTrack(src, title, kicker) {
    var sameTrack = current && current.src === src;
    if (!sameTrack) {
      current = { src: src, title: title, kicker: kicker };
      audio.src = src;
      barTitle.textContent = title;
      barKicker.textContent = kicker;
      barRange.value = 0;
    }
    setupAnalyser();
    if (audioContext && audioContext.state === "suspended") {
      audioContext.resume();
    }
    audio.play();
  }

  function toggleTrack(src, title, kicker) {
    if (current && current.src === src && !audio.paused) {
      audio.pause();
      return;
    }
    playTrack(src, title, kicker);
  }

  triggers.forEach(function (el) {
    el.addEventListener("click", function () {
      toggleTrack(
        el.getAttribute("data-src"),
        el.getAttribute("data-title"),
        el.getAttribute("data-kicker")
      );
    });
  });

  barToggle.addEventListener("click", function () {
    if (!current) return;
    if (audio.paused) {
      playTrack(current.src, current.title, current.kicker);
    } else {
      audio.pause();
    }
  });

  barClose.addEventListener("click", function () {
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
    current = null;
    document.body.classList.remove("player-active");
    bar.classList.remove("is-active");
    stopWave();
    syncControls();
  });

  barRange.addEventListener("input", function () {
    if (!current || !isFinite(audio.duration)) return;
    audio.currentTime = (Number(barRange.value) / 100) * audio.duration;
    updateProgress();
  });

  // ---- Duration labels ----
  // Read each demo's real length once and stamp it on every label pointing at
  // that file: the card total and any hero chip marked [data-dur]. The audio
  // file is the single source of truth, so the static markup is only a fallback.
  demos.forEach(function (demo) {
    var src = demo.getAttribute("data-src");
    var probe = new Audio();
    probe.preload = "metadata";
    probe.src = src;
    probe.addEventListener("loadedmetadata", function () {
      var label = formatTime(probe.duration);
      var total = demo.querySelector("[data-total]");
      if (total) total.textContent = label;
      document.querySelectorAll('[data-dur="' + src + '"]').forEach(function (el) {
        el.textContent = label;
      });
    });
  });

  // ---- UI sync ----
  function playIconState(el, playing) {
    el.classList.toggle("is-playing", playing);
    if (el.hasAttribute("aria-pressed")) {
      el.setAttribute("aria-pressed", String(playing));
    }
  }

  function syncControls() {
    var playing = current && !audio.paused;

    triggers.forEach(function (el) {
      playIconState(el, Boolean(srcMatches(el) && playing));
    });

    demos.forEach(function (demo) {
      var active = Boolean(srcMatches(demo));
      demo.classList.toggle("is-active", active);
      if (!active) {
        var fill = demo.querySelector("[data-fill]");
        var cur = demo.querySelector("[data-current]");
        if (fill) fill.style.setProperty("--p", "0%");
        if (cur) cur.textContent = "0:00";
      }
    });

    playIconState(barToggle, Boolean(playing));
    document.body.classList.toggle("player-active", Boolean(current));
    bar.classList.toggle("is-active", Boolean(current));
  }

  function updateProgress() {
    if (!current || !isFinite(audio.duration)) return;
    var pct = (audio.currentTime / audio.duration) * 100;

    barRange.value = String(pct);
    barRange.style.setProperty("--p", pct + "%");
    barCurrent.textContent = formatTime(audio.currentTime);
    barDuration.textContent = formatTime(audio.duration);

    demos.forEach(function (demo) {
      if (!srcMatches(demo)) return;
      var fill = demo.querySelector("[data-fill]");
      var cur = demo.querySelector("[data-current]");
      if (fill) fill.style.setProperty("--p", pct + "%");
      if (cur) cur.textContent = formatTime(audio.currentTime);
    });
  }

  audio.addEventListener("play", function () {
    syncControls();
    startWave();
  });
  audio.addEventListener("pause", function () {
    syncControls();
    stopWave();
  });
  audio.addEventListener("timeupdate", updateProgress);
  audio.addEventListener("loadedmetadata", updateProgress);
  audio.addEventListener("ended", function () {
    audio.currentTime = 0;
    syncControls();
    updateProgress();
    stopWave();
  });

  // ---- Waveform via Web Audio (progressive enhancement) ----
  var audioContext = null;
  var analyser = null;
  var sourceNode = null;
  var freqData = null;
  var rafId = null;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setupAnalyser() {
    if (analyser || reduceMotion || waveBars.length === 0) return;
    var Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    try {
      audioContext = new Ctx();
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 128;
      analyser.smoothingTimeConstant = 0.8;
      sourceNode = audioContext.createMediaElementSource(audio);
      sourceNode.connect(analyser);
      analyser.connect(audioContext.destination);
      freqData = new Uint8Array(analyser.frequencyBinCount);
    } catch (e) {
      analyser = null; // fall back to idle animation
    }
  }

  function renderWave() {
    if (!analyser) return;
    analyser.getByteFrequencyData(freqData);
    var bins = freqData.length;
    for (var i = 0; i < waveBars.length; i++) {
      var idx = Math.floor((i / waveBars.length) * bins);
      var value = freqData[idx] / 255; // 0..1
      var height = Math.max(0.08, value) * 100;
      waveBars[i].style.setProperty("--h", height + "%");
    }
    rafId = window.requestAnimationFrame(renderWave);
  }

  function startWave() {
    if (!waveform || !analyser) return;
    waveform.classList.add("is-active");
    if (rafId === null) renderWave();
  }

  function stopWave() {
    if (rafId !== null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
    if (waveform) waveform.classList.remove("is-active");
    waveBars.forEach(function (b) {
      b.style.removeProperty("--h");
    });
  }

  // Initial paint
  syncControls();
})();
