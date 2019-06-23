<template>
<div>
  <h2>Weekend Overview: {{$route.params.raceId}}</h2>

  <router-link :to="{name: 'feature', params: {raceId: $route.params.raceId}}">Race Results</router-link>
  <!-- weather data for sprint & feature qual and race
  -->
  <!-- qual results -->

  <!-- race results -->

  <!-- race standings w delta? -->

  <icon name="podium" class="fill-transparent  mirror"/>
  <ol>
    <li v-for="(entry, index) in currentRace.podium"
      :key="index"
      :class="{ ['text-team-' + entry.teamId] : entry.isCleanSweep}"
    >
      <div class="flex flex-row">
        <span v-text="entry.name" />
        <icon name="award" v-if="entry.isPole" class="fill-transparent" />
        <icon name="watch" v-if="entry.isFastestLap" class="fill-transparent" />
      </div>
    </li>
  </ol>

  <router-link :to="prevRaceRoute">Previous Race</router-link>
  <router-link :to="nextRaceRoute">Next Race</router-link>
</div>
</template>

<script>
import {mapGetters} from 'vuex'

import Icon from '@/components/Icon'

export default {
  name: 'weekend-summary-page',
  created() {
    if (!this.$store.state.FeatureEvents.results.length) {
      this.$store.dispatch('FeatureEvents/init');
    }
  },
  methods: {
    getRaceById(raceId) {
      return this.$store.state.FeatureEvents.results.find(race => {
        return race.id == raceId
      });
    },

    getSummaryRoute(raceId) {
      return {
        name: 'overview',
        params: {
          raceId
        }
      }
    },
  },
  computed: {
    currentRace() {
      return this.getRaceById(this.routeRaceId);
    },

    routeRaceId() {
      return parseInt(this.$route.params.raceId, 10);
    },

    prevRaceRoute() {
      return this.getSummaryRoute(this.routeRaceId - 1);
    },

    nextRaceRoute() {
      return this.getSummaryRoute(this.routeRaceId + 1);
    },
  },
  components: {
    Icon
  }
}
</script>

<style>

</style>
