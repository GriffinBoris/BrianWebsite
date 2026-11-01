import { createApp } from "vue";

import App from "./App.vue";
import "./assets/base.css";
import { initTheme } from "./composables/useTheme";
import router from "./router";

initTheme();

const app = createApp(App);

app.use(router);

app.mount("#app");
