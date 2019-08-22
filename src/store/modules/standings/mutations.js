export default {
  setRunningFeatures(state, features) {
    state.runningFeature = features;
  },

  // anything in `/series` needs context of which series is in the route
  setRouteSeries(state, routeValue) {
    state.routeSeries = parseInt(routeValue, 10);
  }
};
