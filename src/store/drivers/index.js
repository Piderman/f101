import DriverModel from "@/models/DriverModel";

import { orderBy, includes } from "lodash";

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
    },
    setPlayerNumber(state, payload) {
      const { driver, preference } = payload;

      driver.number = preference;
    }
  },
  actions: {
    init(context, data) {
      let driverDataModels = data.map(driver => new DriverModel(driver));

      context.commit("populate", driverDataModels);
      context.dispatch('assignPlayerNumber');
    },

    assignPlayerNumber(context) {
      const disallowed = [1, 17];
      const aiDrivers = [
        3,
        5,
        6,
        7,
        8,
        11,
        13,
        14,
        19,
        20,
        21,
        22,
        25,
        26,
        27,
        44,
        77,
        99
      ];
      const invalidNumbers = disallowed.concat(aiDrivers);
      const playerNumbers = [];

      context.getters.players.forEach(driver => {
        let isAdded = false;
        driver.numberPrefs.forEach((preference, index) => {
          const isValid = !includes(
            invalidNumbers.concat(playerNumbers),
            preference
          );

          if (isValid && !isAdded) {
            playerNumbers.push(preference);
            console.log(driver.name, `${preference} (${index})`);
            isAdded = true;

            context.commit("setPlayerNumber", {
              driver,
              preference
            });
          }
        });
      });
    }
  },
  getters: {
    players(state) {
      return state.allDrivers.filter(driver => driver.type === "player");
    },
    leaderboard(state) {
      return orderBy(state.allDrivers, "seasonTotal", "desc");
    },
    leader(state, getters) {
      return getters.leaderboard[0];
    }
  }
};
