import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// レイアウト
import DefaultLayout from "./layout/Default.vue";
import NoneLayout    from "./layout/None.vue";
Vue.component('default-layout', DefaultLayout);
Vue.component('none-layout',    NoneLayout);

// commonクラスをロード
import GameConst from '../../common/consts/GameConst'
import NotifyConst from '../../common/consts/NotifyConst'
Vue.prototype.$GameConst = GameConst
Vue.prototype.$NotifyConst = NotifyConst

// socket.ioをロード
import io from 'socket.io-client';
const socket = io('localhost:8989/marubatsu/');
Vue.prototype.$socket = socket

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

