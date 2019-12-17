import SeriesInfo from "./SeriesInformation";
import { findIndex } from "lodash";

/**
 * Meta about a Weekend of a series
 *
 */
export default {
  extends: SeriesInfo,
  methods: {
    getStandingsById(raceId) {
      const match = this.$store.state.Standings.runningFeature.find(race => {
        return race.id == raceId;
      });

      if (!match) {
        return {};
      }

      return match.standings;
    },

    // todo: what happens when not in correct series?
    getRaceById(raceId) {
      return this.$store.state.FeatureEvents.results.find(race => {
        return race.id == raceId;
      });
    }
  },
  computed: {
    // general info about this current round
    currentGrandPrix() {
      return this.seriesGrandPrix.find(grandPrix => {
        return grandPrix.id === this.routeRaceId;
      });
    },

    featureResults() {
      return this.getRaceById(this.routeRaceId);
    },

    routeRaceId() {
      return parseInt(this.$route.params.weekend, 10);
    },

    round() {
      return findIndex(this.seriesGrandPrix, this.currentGrandPrix) + 1;
    }
  }
};
