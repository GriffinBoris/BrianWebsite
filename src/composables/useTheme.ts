import { computed, ref } from "vue";

// Resolve from localStorage, fall back to the OS preference, and drive
// html[data-theme] so the CSS tokens switch. An inline snippet in index.html
// sets the theme before mount to avoid a flash of the wrong theme.

type ThemePreference = "light" | "dark";

const storageKey = "brian.theme";
const theme = ref<ThemePreference>("light");
const isDark = computed(() => theme.value === "dark");

function resolveInitial(): ThemePreference {
  const stored = window.localStorage.getItem(storageKey);
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function apply(next: ThemePreference) {
  theme.value = next;
  const root = document.documentElement;
  root.dataset.theme = next;
  root.style.colorScheme = next;
}

export function initTheme() {
  apply(resolveInitial());

  // Follow the OS while the visitor has not made an explicit choice.
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
    if (window.localStorage.getItem(storageKey) === null) {
      apply(event.matches ? "dark" : "light");
    }
  });
}

export function useTheme() {
  function toggle() {
    const next = isDark.value ? "light" : "dark";
    apply(next);
    window.localStorage.setItem(storageKey, next);
  }

  return { theme, isDark, toggle };
}
