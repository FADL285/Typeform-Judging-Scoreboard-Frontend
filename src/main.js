import { createApp } from "vue";
import { createPinia } from "pinia";

import { setAppTitle, setAppBaseUrl } from "./base";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

// Base Configuration
const appTitle = import.meta.env.VITE_APP_NAME;
const baseUrl = import.meta.env.VITE_BASE_URL;
setAppTitle(appTitle);
setAppBaseUrl(baseUrl);

// Create Vue App
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
