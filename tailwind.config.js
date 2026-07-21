const semanticColor = (tokenName) => `rgb(var(${tokenName}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: ["./index.html", "./src/**/*.{ts,vue}"],
  theme: {
    extend: {
      colors: {
        background: semanticColor("--color-background"),
        surface: semanticColor("--color-surface"),
        "surface-muted": semanticColor("--color-surface-muted"),
        body: semanticColor("--color-body"),
        secondary: semanticColor("--color-secondary"),
        line: semanticColor("--color-line"),
        primary: semanticColor("--color-primary"),
        "primary-contrast": semanticColor("--color-primary-contrast"),
        accent: semanticColor("--color-accent"),
        "accent-strong": semanticColor("--color-accent-strong"),
        "accent-contrast": semanticColor("--color-accent-contrast"),
        "focus-ring": semanticColor("--color-focus-ring"),
        success: semanticColor("--color-success"),
        warning: semanticColor("--color-warning"),
        error: semanticColor("--color-error"),
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "-apple-system", '"Segoe UI"', "Roboto", "sans-serif"],
      },
      fontSize: {
        eyebrow: ["var(--font-size-eyebrow)", { lineHeight: "1rem", letterSpacing: "var(--tracking-eyebrow)" }],
        lead: ["var(--font-size-lead)", { lineHeight: "var(--line-height-lead)" }],
        display: ["var(--font-size-display)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        h1: ["var(--font-size-h1)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        h2: ["var(--font-size-h2)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        h3: ["var(--font-size-h3)", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        pill: "var(--radius-pill)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      maxWidth: {
        container: "var(--container-width)",
        "container-narrow": "var(--container-narrow)",
      },
      transitionTimingFunction: {
        smooth: "var(--ease)",
      },
    },
  },
  plugins: [],
};
