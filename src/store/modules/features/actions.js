import Feature from "@/models/FeatureRace";

export default {
  init(context, payload) {
    const drivers = context.rootState.Drivers.drivers;
    context.dispatch('parseFeatures', drivers);
  },

  parseFeatures(context, drivers) {
    // todo: race/event data. name, weather etc
    // support upcomming
    const featureModels = Array.from({length: 3}, (val, index) => {
      return new Feature(index + 1, drivers)
    });

    context.commit('setFeatures', featureModels);

    context.dispatch('Standings/init', null, {root: true});
  },
};
