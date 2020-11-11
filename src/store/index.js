import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";
import homeworks from "./modules/homeworks";
import users from "./modules/users";
import { vuexfireMutations } from "vuexfire";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {
    ...vuexfireMutations,
  },
  actions: {},
  modules: {
    auth,
    homeworks,
    users,
  },
});
