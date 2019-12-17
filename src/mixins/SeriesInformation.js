/**
 * Meta about series
 *
 */
import { mapGetters } from "vuex";

export default {
  created() {
    console.log("SeriesMixin: created");
    // todo: as promise that checks state
    // action should either return store or init and set
    if (!this.$store.state.FeatureEvents.results.length) {
      this.$store.dispatch("FeatureEvents/init");
    }
  },
  computed: {
    ...mapGetters({
      seriesGrandPrix: "Standings/currentSeries"
    })
  }
};
