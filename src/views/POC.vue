<template>
<div class="p-4">
  <header>
    <h1 class="text-6xl">Series 1 as of {{recentRace.country}}</h1>
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

  <hr>
  <div v-for="Sprint in sprints"
    :key="`sprints_${Sprint.id}`"
  >
    <p class="text-xl font-bold" v-text="`Sprint ${Sprint.id}`"/>
    <table>
      <tr v-for="(entry, index) in Sprint.standings"
        :key="index"
      >
        <td v-text="entry.positionText" />
        <td v-text="entry.name" />
        <td v-text="entry.teamName" />
        <td v-text="entry.points" class="text-right"/>
      </tr>
    </table>
  </div>

  <hr>

  <div v-for="Feature in features"
    :key="`features_${Feature.id}`"
  >
    <p class="text-xl font-bold" v-text="`Feature ${Feature.id}`"/>
    <table>
      <tr v-for="(entry, index) in Feature.standings"
        :key="index"
      >
        <td v-text="entry.positionText" />
        <td>
          <icon :name="getDriverIcon(entry)" v-if="entry.isPlayer"
            :class="{'stroke-current fill-transparent': !entry.isMain}"
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
  </div>


  <div class="flex flex-row  flex-wrap  justify-around">
    <driver-stats v-for="Driver in players"
      :key="Driver.id"
      :driver="getDriverById(Driver.id)"
      class="w-1/2  lg:w-full  px-4"
    />
  </div>
  
</div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

import { findIndex, orderBy, sum } from "lodash";

import season2 from "@/data/season-2";
import Driver from "@/models/pocDriver";
import Sprint from "@/models/SprintRace";
import Feature from "@/models/FeatureRace";

import DriverStats from '@/components/DriverStats.vue'
import Icon from '@/components/Icon.vue'

export default {
  name: "POC",
  created() {
    // move to router/app ?
    if (!this.$store.state.Drivers.drivers.length) {
      this.$store.dispatch('Drivers/init');
    }

    this.sprints = [
      new Sprint(1, this.drivers),
      new Sprint(2, this.drivers),
      new Sprint(3, this.drivers),
    ];

    this.features = [
      new Feature(1, this.drivers),
      new Feature(2, this.drivers),
      new Feature(3, this.drivers),
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
      return entry.isMain ? 'user' : 'multi-user';
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
      players: 'Drivers/players',
      constructorStandings: 'Standings/constructors',
      featureStandings: 'Standings/feature',
      sprintStandings: 'Standings/sprint',
      completedWeekends: 'Standings/completedGrandPrix'
    }),

    recentRace() {
      return this.completedWeekends[this.completedWeekends.length - 1];
    },

    standings() {
      return orderBy(this.players, "seriesTotal", "desc");
    },

  },
  components: {
    DriverStats,
    Icon,
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
