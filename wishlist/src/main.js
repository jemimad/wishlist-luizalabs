import { createApp } from "vue";
import router from "./routes";
import App from "./App.vue";
import { createPinia } from "pinia";

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount("#app");
