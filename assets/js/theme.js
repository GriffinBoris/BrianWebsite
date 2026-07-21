/*
 * Light/dark theme control.
 * Mirrors the GriffinBoris/WebTemplate theme store: resolve from localStorage,
 * then fall back to the OS preference. Applied to <html data-theme> so CSS
 * tokens switch. An inline pre-paint snippet in index.html prevents FOUC; this
 * module wires up the toggle button and keeps the choice in sync.
 */
(function () {
  "use strict";

  var STORAGE_KEY = "brian.theme";
  var root = document.documentElement;

  function systemPrefersDark() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function resolveInitial() {
    var stored = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      /* storage may be unavailable (private mode) — fall through */
    }
    if (stored === "light" || stored === "dark") return stored;
    return systemPrefersDark() ? "dark" : "light";
  }

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    root.style.colorScheme = theme;
    var toggle = document.querySelector("[data-theme-toggle]");
    if (toggle) {
      toggle.setAttribute("aria-pressed", String(theme === "dark"));
      toggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      );
    }
  }

  function store(theme) {
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* ignore persistence failures */
    }
  }

  var current = resolveInitial();
  apply(current);

  document.addEventListener("DOMContentLoaded", function () {
    apply(current);
    var toggle = document.querySelector("[data-theme-toggle]");
    if (toggle) {
      toggle.addEventListener("click", function () {
        current = current === "dark" ? "light" : "dark";
        apply(current);
        store(current);
      });
    }
  });

  // Follow the OS if the user has not made an explicit choice.
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", function (event) {
      var stored = null;
      try {
        stored = window.localStorage.getItem(STORAGE_KEY);
      } catch (e) {
        /* ignore */
      }
      if (stored !== "light" && stored !== "dark") {
        current = event.matches ? "dark" : "light";
        apply(current);
      }
    });
})();
