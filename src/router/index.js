import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import Homeworks from "@/views/Homeworks";
import AddHomework from "@/views/AddHomework";
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
    path: "/odev-ekle",
    name: "AddHomework",
    component: AddHomework,
    beforeEnter: (to, from, next) => {
      const user = store.state.auth.user;
      const isAdmin = store.getters["auth/isAdmin"];
      if (user && isAdmin) {
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
