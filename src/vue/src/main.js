import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// レイアウト定義
import DefaultLayout from "./layout/Default.vue";
import NoneLayout    from "./layout/None.vue";

Vue.component('default-layout', DefaultLayout);
Vue.component('none-layout',    NoneLayout);

import io from 'socket.io-client';
const Const = require('../../common/consts/MarubatsuConst')

var socket = io('localhost:8989/marubatsu/');
Vue.prototype.$socket = socket
Vue.prototype.$Const = Const

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

