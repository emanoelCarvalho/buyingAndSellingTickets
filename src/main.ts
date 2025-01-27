// main.ts
import { createApp } from "vue";
import App from "./App.vue";
import { createVuetify } from "vuetify";
import "vuetify/styles"; // Importação dos estilos do Vuetify
import "@mdi/font/css/materialdesignicons.css"; // Icones Material Design
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);
app.use(vuetify);
app.mount("#app");
