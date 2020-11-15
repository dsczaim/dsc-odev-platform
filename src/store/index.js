import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";
import homeworks from "./modules/homeworks";
import homework from "./modules/homework";
import users from "./modules/users";
import teamConfig from "./modules/teamConfig";
import attendance from "./modules/attendance";
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
    teamConfig,
    homework,
    attendance,
  },
});
