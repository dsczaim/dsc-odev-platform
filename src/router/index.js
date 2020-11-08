import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import Homeworks from "@/views/Homeworks";
import Resricted from "@/views/Restricted";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: (to, from, next) => {
      if (!store.state.auth.user) {
        next();
      } else {
        if (from.fullPath == "/") next("/odevler");
        else next(false);
      }
    },
  },
  {
    path: "/odevler",
    name: "Homeworks",
    component: Homeworks,
    beforeEnter: (to, from, next) => {
      if (store.state.auth.user) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/restricted",
    name: "Resricted",
    component: Resricted,
    beforeEnter: (to, from, next) => {
      if (
        store.state.auth.user &&
        store.state.auth.user.role == "flutter-lead"
      ) {
        next();
      } else {
        if (from.fullPath == "/") next("/odevler");
        else next(false);
      }
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
