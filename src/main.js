import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import { api } from "./api/api.js";
import "./router/permission";

Vue.config.productionTip = false;
Vue.prototype.$api = api;

Vue.use(Antd);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
