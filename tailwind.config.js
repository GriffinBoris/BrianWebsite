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
        accent: semanticColor("--color-accent"),
        "accent-strong": semanticColor("--color-accent-strong"),
        "accent-soft": semanticColor("--color-accent-soft"),
        "accent-contrast": semanticColor("--color-accent-contrast"),
        "focus-ring": semanticColor("--color-focus-ring"),
        "gradient-contrast": semanticColor("--color-gradient-contrast"),
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "-apple-system", '"Segoe UI"', "Roboto", "sans-serif"],
      },
      fontSize: {
        display: ["var(--font-size-display)", { lineHeight: "0.95", letterSpacing: "-0.05em" }],
        h1: ["var(--font-size-h1)", { lineHeight: "1", letterSpacing: "-0.04em" }],
        h2: ["var(--font-size-h2)", { lineHeight: "1.1", letterSpacing: "-0.035em" }],
        h3: ["var(--font-size-h3)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        pill: "var(--radius-pill)",
      },
      backgroundImage: {
        "accent-gradient": "var(--gradient-accent)",
        "accent-gradient-hover": "var(--gradient-accent-hover)",
      },
      boxShadow: {
        photo: "var(--shadow-photo)",
        float: "var(--shadow-float)",
        accent: "var(--shadow-accent)",
      },
      maxWidth: {
        container: "var(--container-width)",
      },
      transitionTimingFunction: {
        smooth: "var(--ease)",
      },
    },
  },
  plugins: [],
};
