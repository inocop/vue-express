import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import DefaultLayout from "./layout/Default.vue";
import NoneLayout    from "./layout/None.vue";

Vue.component('default-layout', DefaultLayout);
Vue.component('none-layout',    NoneLayout);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

