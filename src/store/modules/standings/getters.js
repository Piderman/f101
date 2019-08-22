import { orderBy, sum } from "lodash";

export default {
  constructors(state, getters, rootState) {
    const teamStandings = state.teams.map(team => {
      return {
        name: team.name,
        id: team.id,
        points: sum(
          rootState.Drivers.drivers
            .filter(Driver => Driver.teamId === team.id)
            .map(Driver => Driver.featureTotal)
        )
      };
    });

    return orderBy(teamStandings, "points", "desc");
  },

  feature(state, getters, rootState) {
    const tableData = rootState.Drivers.drivers.map(Driver => {
      return {
        ...Driver.meta,
        points: sum(Driver.featureResults.map(results => results.totalPoints))
      };
    });

    return orderBy(tableData, "points", "desc");
  },

  sprint(state, getters, rootState, rootGetters) {
    const tableData = rootGetters["Drivers/players"].map(Driver => {
      return {
        ...Driver.meta,
        points: sum(Driver.sprintResults.map(results => results.totalPoints))
      };
    });

    return orderBy(tableData, "points", "desc");
  },

  completedGrandPrix(state) {
    return state.grandPrix.filter(grandPrix => grandPrix.status === "complete");
  }
};
