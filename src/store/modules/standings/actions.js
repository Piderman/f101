import { orderBy, sum } from "lodash";

export default {
  init(context) {
    const parsedFeatures = context.rootState.FeatureEvents.results.map(
      (race, index) => {
        const standingsAtEvent = {
          id: race.id,
          standings: []
        };

        const driverData = context.rootState.Drivers.drivers.map(Driver => {
          return {
            ...Driver.meta,
            points: sum(
              Driver.featureResults
                .slice(0, index + 1)
                .map(feature => feature.totalPoints)
            )
          };
        });

        standingsAtEvent.standings = orderBy(driverData, "points", "desc");

        return standingsAtEvent;
      }
    );

    context.commit("setRunningFeatures", parsedFeatures);
  }
};
