import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/marubatsu",
      name: "marubatsu",
      component: () =>
        import(/* webpackChunkName: "marubatsu" */ "./views/MaruBatsu.vue")
    },
    {
      path: "/marubatsu/:id",
      name: "marubatsu_play",
      meta: { layout: 'none'},
      component: () =>
        import(/* webpackChunkName: "marubatsu_play" */ "./views/MaruBatsuPlay.vue"),
      props: route => ({
        id: Number(route.params.id)
      })
    }
  ]
});
