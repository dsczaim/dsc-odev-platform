import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import Homeworks from "@/views/Homeworks";
import Homework from "@/views/Homework";
import AddHomework from "@/views/AddHomework";
import SuccessRates from "@/views/SuccessRates";
import Profile from "@/views/Profile";
import store from "@/store";

Vue.use(VueRouter);
const DEFAULT_TITLE = "Google DSC Zaim Ödev Platformu";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      metaTags: [
        {
          name: "description",
          content:
            "Google DSC Zaim için oluşturulmuş bir ödüllü ödevlendirme platformu",
        },
        {
          property: "og:description",
          content:
            "Google DSC Zaim için oluşturulmuş bir ödüllü ödevlendirme platformu.",
        },
      ],
    },
    beforeEnter: (to, from, next) => {
      const user = store.state.auth.user;
      if (!user || !user.fullName) {
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
    meta: {
      title: "Ödevler - Google DSC Zaim Ödev Platformu",
      metaTags: [
        {
          name: "description",
          content:
            "Google DSC Zaim için oluşturulmuş bir ödüllü ödevlendirme platformu",
        },
        {
          property: "og:description",
          content:
            "Google DSC Zaim için oluşturulmuş bir ödüllü ödevlendirme platformu.",
        },
      ],
    },
    beforeEnter: (to, from, next) => {
      const user = store.state.auth.user;

      if (!user || !user.fullName) next("/");
      else next();
    },
  },
  {
    path: "/odevler/:id",
    name: "Homework",
    component: Homework,
    meta: {
      title: "Ödevler - Google DSC Zaim Ödev Platformu",
      metaTags: [
        {
          name: "description",
          content:
            "Google DSC Zaim için oluşturulmuş bir ödüllü ödevlendirme platformu",
        },
        {
          property: "og:description",
          content:
            "Google DSC Zaim için oluşturulmuş bir ödüllü ödevlendirme platformu.",
        },
      ],
    },
    beforeEnter: (to, from, next) => {
      const user = store.state.auth.user;

      if (!user || !user.fullName) next("/");
      else next();
    },
  },
  {
    path: "/hesap",
    name: "Profile",
    component: Profile,
    meta: {
      title: "Hesap - Google DSC Zaim Ödev Platformu",
      metaTags: [
        {
          name: "description",
          content:
            "Google DSC Zaim için oluşturulmuş bir ödüllü ödevlendirme platformu",
        },
        {
          property: "og:description",
          content:
            "Google DSC Zaim için oluşturulmuş bir ödüllü ödevlendirme platformu.",
        },
      ],
    },
    beforeEnter: (to, from, next) => {
      const user = store.state.auth.user;

      if (!user || !user.fullName) next("/");
      else next();
    },
  },
  {
    path: "/siralama",
    name: "SuccessRates",
    component: SuccessRates,
    meta: {
      title: "Başarı Sıralaması - Google DSC Zaim Ödev Platformu",
      metaTags: [
        {
          name: "description",
          content:
            "Google DSC Zaim için oluşturulmuş bir ödüllü ödevlendirme platformu",
        },
        {
          property: "og:description",
          content:
            "Google DSC Zaim için oluşturulmuş bir ödüllü ödevlendirme platformu.",
        },
      ],
    },
    beforeEnter: (to, from, next) => {
      const user = store.state.auth.user;

      if (!user || !user.fullName) next("/");
      else next();
    },
  },
  {
    path: "/odev-ekle",
    name: "AddHomework",
    component: AddHomework,
    meta: {
      title: "Ödev Ekle - Google DSC Zaim Ödev Platformu",
      metaTags: [
        {
          name: "description",
          content:
            "Google DSC Zaim için oluşturulmuş bir ödüllü ödevlendirme platformu",
        },
        {
          property: "og:description",
          content:
            "Google DSC Zaim için oluşturulmuş bir ödüllü ödevlendirme platformu.",
        },
      ],
    },
    beforeEnter: (to, from, next) => {
      const user = store.state.auth.user;
      if (!user || !user.fullName) next("/");
      else {
        const isAdmin = store.getters["auth/getIsAdmin"];
        if (isAdmin) {
          next();
        } else {
          if (from.fullPath == "/") next("/odevler");
          else next(false);
        }
      }
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
  });

  next();
});

export default router;
