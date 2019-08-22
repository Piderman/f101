import { find, orderBy, sum } from "lodash";

export default {
  constructors(state, getters, rootState) {
    const teamStandings = state.teams.map(team => {
      return {
        name: team.name,
        id: team.id,
        points: sum(
          rootState.Drivers.drivers
            .filter(Driver => Driver.teamId === team.id)
            .map(Driver => {
              const series = find(Driver.series, {
                seriesId: state.routeSeries
              });
              
                return series.featureTotal;
            })
          )
      };
    });

    return orderBy(teamStandings, "points", "desc");
  },

  seriesFeature(state, getters, rootState) {
    if (!state.routeSeries) {
      return [];
    }

    const tableData = rootState.Drivers.drivers.map(Driver => {
      const { featureResults } =
        find(Driver.series, {
          seriesId: state.routeSeries
        }) || {};

      if (!featureResults) {
        console.log("no matching feature");
        return {
          ...Driver.meta
        };
      }

      return {
        ...Driver.meta,
        points: sum(featureResults.map(results => results.totalPoints))
      };
    });

    return orderBy(tableData, "points", "desc");
  },

  seriesSprint(state, getters, rootState, rootGetters) {
    if (!state.routeSeries) {
      return [];
    }

    const tableData = rootGetters["Drivers/players"].map(Driver => {
      const { sprintResults } =
        find(Driver.series, {
          seriesId: state.routeSeries
        }) || {};

      if (!sprintResults) {
        console.log("no matching sprint");
        return {
          ...Driver.meta
        };
      }

      return {
        ...Driver.meta,
        points: sum(sprintResults.map(results => results.totalPoints))
      };
    });

    return orderBy(tableData, "points", "desc");
  },

  currentSeries(state, getters) {
    const index = state.routeSeries || 1;

    if (!index) {
      return [];
    }

    // console.log('series:', index);

    return state.grandPrix[index - 1].events;
  },

  completedGrandPrix(state, getters) {
    return getters.currentSeries.filter(
      grandPrix => grandPrix.status === "complete"
    );
  },

  futureGrandPrix(state, getters) {
    return getters.currentSeries.filter(
      grandPrix => grandPrix.status !== "complete"
    );
  },

  previousGrandPrix(state, getters) {
    return (
      getters.completedGrandPrix[getters.completedGrandPrix.length - 1] || {}
    );
  },

  nextGrandPrix(state, getters) {
    return getters.futureGrandPrix[0] || {};
  },

  upcomingGrandPrix(state, getters) {
    return getters.futureGrandPrix.slice(1);
  }
};
