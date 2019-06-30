<template>
<div class="p-4">
  <h2 class="text-3xl">{{currentGrandPrix.country}} Feature Race Results</h2>

  <table>
    <tr class="text-left">
      <th colspan="3">Position</th>
      <th>Driver</th>
      <th>Team</th>
      <th>Points</th>
      <th>Bonus</th>
    </tr>
    <tr v-for="(entry, index) in currentRace.standings"
      :key="index"
    >
      <td>
        <icon v-bind="getPositionDelta(entry).icon" class="stroke-2 inline-block  fill-transparent"/>
      </td>
      <td class="text-right" v-text="entry.positionText" />
      <td>
        <icon :name="getDriverIcon(entry)" v-if="entry.isPlayer"
          :class="{
            'stroke-0' : entry.isMain,
            'stroke-current fill-transparent': !entry.isMain
          }"
        />
      </td>
      <td v-text="entry.name" />
      <td v-text="entry.teamName" class="border-l-8"
        :class="`border-team-${entry.teamId}`"
      />
      <td class="text-right" v-text="entry.points"/>
      <td>
        <div class="flex flex-row">
          <icon name="award" v-if="entry.isPole" class="fill-transparent" />
          <icon name="watch" v-if="entry.isFastestLap" class="fill-transparent" />
        </div>
      </td>
    </tr>
  </table>

  <h2 class="text-xl">Driver Standings</h2>
  <table>
    <tr class="text-left">
      <th colspan="3">Position</th>
      <th>Driver</th>
      <th>Team</th>
      <th>Points</th>
      <th>Gap</th>
    </tr>
    <tr v-for="(entry, index) in currentStandings"
      :key="index"
    >
      <td class="px-0">
        <icon v-bind="getStandingsDelta(entry.id).icon" class="stroke-2 inline-block  fill-transparent"/>
      </td>
      <td class="text-right" v-text="index+1" />
      <td>
        <icon :name="getDriverIcon(entry)" v-if="entry.isPlayer"
          :class="{
            'stroke-0' : entry.isMain,
            'stroke-current fill-transparent': !entry.isMain
          }"
        />
      </td>
      <td v-text="entry.name" />
      <td v-text="entry.teamName" class="border-l-8"
        :class="`border-team-${entry.teamId}`"
      />
      <td class="text-right" v-text="getStandingsByDriverId(entry.id).points"/>
      <td class="text-right" v-text="getGapToLeader(entry.points).delta"/>
    </tr>
  </table>

  <div class="flex justify-center">
    <router-link class="border  px-4 py-2 rounded " :to="prevRaceRoute">Previous Race</router-link>
    <router-link class="border  ml-8 px-4 py-2 rounded " :to="nextRaceRoute">Next Race</router-link>
  </div>

</div>
</template>

<script>
import Icon from '@/components/Icon'
import DeltaMixin from '@/mixins/Delta'

export default {
  name: 'feature-results-page',
  mixins: [DeltaMixin],
  created() {
    if (!this.$store.state.FeatureEvents.results.length) {
      this.$store.dispatch('FeatureEvents/init');
    }
  },
  methods: {
    getDriverIcon(entry) {
      return entry.isMain ? 'user' : 'multi-user';
    },

    getFeatureRoute(raceId) {
      return {
        name: 'feature',
        params: {
          raceId
        }
      }
    },

    getRaceById(raceId) {
      return this.$store.state.FeatureEvents.results.find(race => {
        return race.id == raceId
      });
    },

    getStandingsById(raceId) {
      const match = this.$store.state.Standings.runningFeature.find(race => {
        return race.id == raceId;
      });

      return match.standings;
    },

    getPositionDelta(standing) {
      const startPosition = standing.grid;
      const finishPosition = standing.position;

      return this.getDeltaStyles(startPosition, finishPosition);
    }, 

    getStandingsDelta(id) {
      if(this.routeRaceId == 1) {
      return this.getDeltaStyles(0, 0);
      }

      const currentPosition = this.currentStandings.findIndex(driver => driver.id === id);
      const prevPosition = this.previousStandings.findIndex(driver => driver.id === id);
      
      return this.getDeltaStyles(prevPosition, currentPosition);
    },

    getGapToLeader(points) {
      return this.getDeltaStyles(points, this.currentStandings[0].points);
    },

    
    // lookup of driver's points w id for deltas
    getStandingsByDriverId(id) {
      return this.currentStandings.find(driver => driver.id === id);
    },
  },
  computed: {
    currentStandings() {
      return this.getStandingsById(this.routeRaceId);
    },

    currentRace() {
      return this.getRaceById(this.routeRaceId);
    },

    currentGrandPrix() {
      return this.$store.state.Standings.grandPrix.find(grandPrix => {
        return grandPrix.id === this.routeRaceId;
      });
    },

    previousRace() {
      return this.getRaceById(this.routeRaceId - 1);
    },

    previousStandings() {
      if (!this.routeRaceId > 1) {
        return []
      };

      const prevId = this.routeRaceId - 1
      return this.getStandingsById(this.routeRaceId - 1);
    },
    
    routeRaceId() {
      return parseInt(this.$route.params.raceId, 10);
    },

    prevRaceRoute() {
      return this.getFeatureRoute(this.routeRaceId - 1);
    },

    nextRaceRoute() {
      return this.getFeatureRoute(this.routeRaceId + 1);
    },
  },
  components: {
    Icon
  }
}
</script>

<style>

</style>
