<template>
<div class="p-4">
  <h2 class="text-3xl">{{currentGrandPrix.country}} Feature Race Results</h2>

  <table>
    <tr class="text-left">
      <th colspan="2">Position</th>
      <th>Driver</th>
      <th>Team</th>
      <th>Points</th>
      <th>Bonus</th>
      <th colspan="2" v-if="routeRaceId > 1" class="border-l">Standings</th>
    </tr>
    <tr v-for="(entry, index) in currentRace.standings"
      :key="index"
    >
      <td v-text="entry.positionText" />
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
      <template v-if="routeRaceId > 1">
      <td v-text="getStandingsByDriverId(entry.id).featurePoints" class="border-l"/>
      <td>
        <icon v-bind="getDeltaStyles(entry.id).icon" class="stroke-2 inline-block  fill-transparent mr-2"/>
        <span v-text="getDeltaStyles(entry.id).movement"/>
      </td>
      </template>
    </tr>
  </table>

  <router-link :to="prevRaceRoute">Previous Race</router-link>
  <router-link :to="nextRaceRoute">Next Race</router-link>

</div>
</template>

<script>
import Icon from '@/components/Icon'

export default {
  name: 'feature-results-page',
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

    // get points by id
    // compare index to last race

    // id and points per round
    getStandingsByDriverId(id) {
      return this.currentStandings.find(driver => driver.id === id);
    },

    getDeltaByDriverId(id) {
      const currentPosition = this.currentStandings.findIndex(driver => driver.id === id);
      const prevPosition = this.previousStandings.findIndex(driver => driver.id === id);

      if(this.routeRaceId > 1) {
        return currentPosition - prevPosition;
      }
    },

    // share for start/finish delta
    getDeltaStyles(id) {
      if(this.routeRaceId > 1) {
        const delta = this.getDeltaByDriverId(id);
        const movement = Math.abs(delta);
        const icon = 'chevron';

        if (delta == 0) {
          return {
            icon: {
              name: 'minus'
            }
          };

        // note: negative means you've gone up
        } else if (delta < 1) {
          return {
            movement,
            icon: {
              class: 'text-green-600',
              name: `${icon}-up`
            }
          };
          
        } else {
          return {
            movement,
            icon: {
              class: 'text-red-600',
              name: `${icon}-down`
            }
          };
        }
      }
    }
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
      const prevId = this.routeRaceId - 1
      if (!prevId) {
        return []
      };
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