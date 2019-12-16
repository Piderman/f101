<template>
<div class="p-4">
  <header class="mb-4">
    <p>Previous weekend: {{previousGrandPrixLabel}}</p>
    <p>Next Race: {{nextGrandPrixLabel}}</p>
    <p>Upcoming Race: {{upcomingGrandPrixLabel}}</p>

    <router-link class="inline-block my-4	bg-gray-600 text-white  px-4 py-2 rounded " :to="{name: 'feature-results', params: {
        series: $route.params.series,
        weekend: previousGrandPrix.id}
    }">
      Latest Results
    </router-link>
  </header>
  
  <div class="md:flex">
    <div class="md:w-1/2">
      <h2 class="text-3xl">Feature Standings</h2>
      <table>
        <tr v-for="(driver, index) in summaryTable"
          :key="driver.id"
        >
          <td v-text="index + 1"/>
          <td>
            <icon :name="getDriverIcon(driver)" v-if="driver.isPlayer"
              :class="{'stroke-current fill-transparent': !driver.isMain}"
            />
          </td>
          <td>
            <span class="team-idicator--small" :class="`bg-team-${driver.teamId}`"></span>{{driver.name}}
          </td>
          <td v-text="driver.points" class="text-right"/>
        </tr>
      </table>

      <div v-if="!isShowAllStandings">
        <button class="inline-block my-4	bg-gray-600 text-white  px-4 py-2 rounded"
          @click="showAllStandings"
        >
          See full standings
        </button>
      </div>

      <h2 class="text-3xl">Sprint Standings</h2>
      <table>
        <tr v-for="driver in seriesSprintStandings"
          :key="driver.id"
        >
          <td v-text="driver.name" />
          <td v-text="driver.points" class="text-right"/>
        </tr>
      </table>

      <h4 class="text-2xl">Career Points</h4>
      <table>
        <tr v-for="driver in seasonStandings"
          :key="driver.id"
        >
          <td v-text="driver.name" />
          <td v-text="driver.careerPoints" class="text-right"/>
        </tr>
      </table>
    </div>

    <div class="md:w-1/2">
      <h2 class="text-3xl">Constructor Standings</h2>
      <table>
        <tr v-for="team in constructorStandings"
          :key="team.id"
        >
          <td v-text="team.name" class="border-l-8"
            :class="`border-team-${team.id}`"
          />
          <td v-text="team.points" class="text-right"/>
        </tr>
      </table>
    </div>
  </div>


  
</div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

import { get, orderBy } from "lodash";

import DriverStats from "@/components/DriverStats.vue";
import Icon from "@/components/Icon.vue";

export default {
  name: "seriers-overview",
  created() {
    // move to router/app ?
    if (!this.$store.state.Drivers.drivers.length) {
      this.$store.dispatch("Drivers/init");
    }
  },
  data() {
    return {
      isShowAllStandings: false
    };
  },
  methods: {
    showAllStandings() {
      this.isShowAllStandings = true;
    },

    getDriverIcon(entry) {
      return entry.isMain ? "user" : "multi-user";
    },
    getDriverById(id) {
      return this.drivers.find(driver => driver.id === id);
    }
  },
  computed: {
    ...mapState({
      weekends: state => state.Standings.grandPrix,
      drivers: state => state.Drivers.drivers
    }),

    ...mapGetters({
      players: "Drivers/players",
      constructorStandings: "Standings/constructors",
      seriesFeatureStandings: "Standings/seriesFeature",
      seriesSprintStandings: "Standings/seriesSprint",
      previousGrandPrix: "Standings/previousGrandPrix",
      nextGrandPrix: "Standings/nextGrandPrix",
      upcomingGrandPrix: "Standings/upcomingGrandPrix"
    }),

    standings() {
      return orderBy(this.players, "seriesTotal", "desc");
    },

    summaryTable() {
      const limmit = this.isShowAllStandings ? undefined : 5;

      return this.seriesFeatureStandings.slice(0, limmit);
    },

    seasonStandings() {
      return orderBy(this.players, "careerPoints", "desc");
    },

    previousGrandPrixLabel() {
      return get(this, "previousGrandPrix.country", "N/A");
    },

    nextGrandPrixLabel() {
      return get(this, "nextGrandPrix.country", "N/A");
    },

    upcomingGrandPrixLabel() {
      return get(this, "upcomingGrandPrix[0].country", "N/A");
    }
  },
  components: {
    DriverStats,
    Icon
  }
};
</script>

<style>
table {
  border-collapse: collapse;
  margin-bottom: 2em;
}

th,
td {
  padding: 0.5em 1em;
  font-variant-numeric: tabular-nums;
}

tr:nth-child(2n) td {
  background-color: #f9f9f9;
}

.team-idicator--small {
  display: inline-block;
  width: 4px;
  height: 0.75em;
  margin-right: 0.5em;
}
</style>
