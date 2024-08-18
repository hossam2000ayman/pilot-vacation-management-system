import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/js/all";
import { createVuetify } from "vuetify";
import "vuetify/styles";

const vuetify = createVuetify();

createApp(App).use(router).use(vuetify).mount("#app");
