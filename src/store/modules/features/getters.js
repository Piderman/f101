import router from "@/router";

export default {
  // warn: doesn't update on router change :(
  resultsForRoute(state, getter) {
    const raceId = router.currentRoute.params.raceId;

    const currentRace =  state.results.find(race => {
      return race.id == raceId
    });

    return currentRace;
  }
};