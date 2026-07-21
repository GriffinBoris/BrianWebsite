import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { URL, fileURLToPath } from "node:url";
import { defineConfig } from "vite";

// Deployed to GitHub Pages as a project site (griffinboris.github.io/BrianWebsite),
// so production assets resolve under that subpath. Dev serves from root.
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/BrianWebsite/" : "/",
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
}));
