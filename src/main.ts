import PrimeVue from "primevue/config";
import Tooltip from "primevue/tooltip";
import { createApp } from "vue";

import App from "./App.vue";
import "./assets/base.css";
import { initTheme } from "./composables/useTheme";
import router from "./router";

initTheme();

const app = createApp(App);

// PrimeVue runs unstyled: the app owns tokens, spacing, and focus treatment
// through app-owned wrappers under src/components/ui/. Everything is bundled by
// Vite into dist/, so the site stays fully static and self-hosted.
app.use(PrimeVue, { unstyled: true });
app.directive("tooltip", Tooltip);
app.use(router);

app.mount("#app");
