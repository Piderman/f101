import Feature from "@/models/FeatureRace";

export default {
  init(context, payload) {
    const drivers = context.rootState.Drivers.drivers;
    context.dispatch("parseFeatures", drivers);
  },

  parseFeatures(context, drivers) {
    // todo: race/event data. name, weather etc
    const featureModels = context.rootGetters[
      "Standings/completedGrandPrix"
    ].map(grandPrix => new Feature(grandPrix.id, drivers));

    context.commit("setFeatures", featureModels);

    context.dispatch("Standings/init", null, { root: true });
  }
};
