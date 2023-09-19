import { createApp } from "vue";
import DashboardLayout from "./components/Dash-Board.vue";
import EmptyLayout from "./components/EmptyLayout.vue";
import "./assets/tailwind.css";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { POSITION } from "vue-toastification";
import type {PluginOptions} from 'vue-toastification'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import {Icon} from "@iconify/vue"
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

const options: PluginOptions = {
  position: POSITION.BOTTOM_CENTER,
  timeout: 2000,
}

const pinia = createPinia();
const app = createApp(App);
app.component("default-layout", DashboardLayout);
app.component("empty-layout", EmptyLayout);
app.component("base-icon", Icon);
app.use(pinia);
app.component('EasyDataTable', Vue3EasyDataTable);
app.use(Toast, options)
app.use(router).mount("#app");
