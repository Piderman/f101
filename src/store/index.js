import Vue from "vue";
import Vuex from "vuex";

import Drivers from "./modules/drivers";
import Standings from "./modules/standings";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Drivers,
    Standings,

    // per race results
    // FeatureResults,
    // SprintsResults,
  }
});
