import { createApp } from "vue";

import App from "./App.vue";
import "./assets/base.css";
import { initTheme } from "./composables/useTheme";
import router from "./router";

initTheme();

createApp(App).use(router).mount("#app");
