<template>
<div class="p-4">
  <header class="mb-4">
    <h1 class="text-6xl">Series 1 as of {{recentRace.country}}</h1>
    <router-link class="bg-gray-600 text-white  px-4 py-2 rounded " :to="{name: 'feature', params: {raceId: recentRace.id} }">
      Latest Results
    </router-link>
  </header>
  
  <div class="flex">
    <div class="w-1/2">
      <h2 class="text-3xl">Feature Standings</h2>
      <table>
        <tr v-for="driver in featureStandings"
          :key="driver.id"
        >
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

      <h2 class="text-3xl">Sprint Standings</h2>
      <table>
        <tr v-for="driver in sprintStandings"
          :key="driver.id"
        >
          <td v-text="driver.name" />
          <td v-text="driver.points" class="text-right"/>
        </tr>
      </table>

      <h4 class="text-2xl">Player Standings</h4>
      <table>
        <tr v-for="driver in standings"
          :key="driver.id"
        >
          <td v-text="driver.name" />
          <td v-text="driver.seriesTotal" class="text-right"/>
        </tr>
      </table>
    </div>

    <div class="w-1/2">
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

import { orderBy } from "lodash";

import Sprint from "@/models/SprintRace";
import Feature from "@/models/FeatureRace";

import DriverStats from "@/components/DriverStats.vue";
import Icon from "@/components/Icon.vue";

export default {
  name: "POC",
  created() {
    // move to router/app ?
    if (!this.$store.state.Drivers.drivers.length) {
      this.$store.dispatch("Drivers/init");
    }

    this.sprints = [
      new Sprint(1, this.drivers),
      new Sprint(2, this.drivers),
      new Sprint(3, this.drivers)
      // new Sprint(4, this.drivers),
    ];

    this.features = [
      new Feature(1, this.drivers),
      new Feature(2, this.drivers),
      new Feature(3, this.drivers)
    ];
  },
  data() {
    return {
      // done via class
      sprints: [],
      features: []
    };
  },
  methods: {
    getDriverIcon(entry) {
      return entry.isMain ? "user" : "multi-user";
    },
    getDriverById(id) {
      return this.drivers.find(driver => driver.id === id);
    }
  },
  computed: {
    ...mapState({
      drivers: state => state.Drivers.drivers
    }),

    ...mapGetters({
      players: "Drivers/players",
      constructorStandings: "Standings/constructors",
      featureStandings: "Standings/feature",
      sprintStandings: "Standings/sprint",
      completedWeekends: "Standings/completedGrandPrix"
    }),

    recentRace() {
      return this.completedWeekends[this.completedWeekends.length - 1];
    },

    standings() {
      return orderBy(this.players, "seriesTotal", "desc");
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
