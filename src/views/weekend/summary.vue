<template>
<div>
  <h1 class="font-bold  text-center	 text-4xl">
    <em v-text="currentGrandPrix.country"/>
    <em class="block font-light">Series 1</em>
    [race date]
  </h1>

  <div v-if="currentGrandPrix.status=='complete'">
    <h2>Sprint</h2>
    <icon :name="currentGrandPrix.weather.sprint.qualifying[0]" class="fill-transparent"/>
    [table]
    <hr>

    Race
    [table]
    <icon :name="currentGrandPrix.weather.sprint.race[0]" class="fill-transparent"/>

    <hr>

    <h2>Feature Qual</h2>
    <icon :name="currentGrandPrix.weather.feature.qualifying[0]" class="fill-transparent"/>
    <p>Pole: [Driver Name] [lap time]</p>

    <hr>
    <h2>Feature Race</h2>
    <icon :name="currentGrandPrix.weather.feature.race[0]" class="fill-transparent"/>

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

    <router-link :to="{name: 'feature', params: {raceId: $route.params.raceId}}">Full Race Results</router-link>

  </div>


  <div>
    <router-link :to="prevRaceRoute" class="underline">Previous Weekend</router-link>
    <router-link :to="nextRaceRoute" class="underline">Next Weekend</router-link>
  </div>
</div>
</template>

<script>
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
    currentGrandPrix() {
      return this.$store.state.Standings.grandPrix.find(weekend => {
        return weekend.id == this.routeRaceId;
      });
    },
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
