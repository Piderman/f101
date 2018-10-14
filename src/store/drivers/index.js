import DriverModel from "@/models/DriverModel";

import { orderBy } from "lodash";

export default {
  namespaced: true,
  state: {
    allDrivers: [
      {
        id: 0,
        name: "test driver",
        seasonTotal: 100
      }
    ]
  },
  mutations: {
    populate(state, payload) {
      state.allDrivers = payload;
    }
  },
  actions: {
    init(context, data) {
      let driverDataModels = data.map(driver => new DriverModel(driver));

      context.commit("populate", driverDataModels);
    }
  },
  getters: {
    leaderboard(state) {
      return orderBy(state.allDrivers, "seasonTotal", "desc");
    },
    leader(state, getters) {
      return getters.leaderboard[0];
    }
  }
};
