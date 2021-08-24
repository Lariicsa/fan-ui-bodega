import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuelidate from "vuelidate";
import "../src/assets/scss/index.scss";

Vue.use(Vuelidate);

if (process.env.NODE_ENV === "development") {
  Vue.config.productionTip = false;
} else {
  Vue.config.productionTip = true;
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
