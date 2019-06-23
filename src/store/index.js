import Vue from "vue";
import Vuex from "vuex";

import Drivers from "./modules/drivers";
import Standings from "./modules/standings";
import FeatureEvents from "./modules/features";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Drivers,
    Standings,

    // per race results
    FeatureEvents,
    // SprintsResults,
  }
});
