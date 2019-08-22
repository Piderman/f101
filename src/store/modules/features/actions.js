import Feature from "@/models/FeatureRace";

export default {
  init(context) {
    const drivers = context.rootState.Drivers.drivers;
    context.dispatch("parseFeatures", drivers);
  },

  parseFeatures(context, drivers) {
    console.log("parseFts");

    // todo: race/event data. name, weather etc
    const featureModels = context.rootGetters[
      "Standings/completedGrandPrix"
    ].map(
      grandPrix =>
        new Feature(
          grandPrix.id,
          context.rootState.Standings.routeSeries,
          drivers
        )
    );

    context.commit("setFeatures", featureModels);

    context.dispatch("Standings/init", null, { root: true });
  }
};
