import season2 from "@/data/season-2";

import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export default {
  namespaced: true,
  state: {
    grandPrix: season2.grandPrix,
    runningFeature: [],
    teams: season2.teams,
    routeSeries: 1
  },
  actions,
  getters,
  mutations
};
