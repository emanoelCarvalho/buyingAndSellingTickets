import { createApp } from "vue";
import App from "./App.vue";
import { createVuetify } from "vuetify";
import "vuetify/styles"; 
import "@mdi/font/css/materialdesignicons.css"; 
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import axios from "axios";
import VueAxios from "vue-axios";

const vuetify = createVuetify({
  components,
  directives,
});

axios.defaults.baseURL = "https://sua-api-base-url.com"; 

const app = createApp(App);

app.use(vuetify);
app.use(VueAxios, axios);

app.mount("#app");
