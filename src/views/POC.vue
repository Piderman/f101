<template>
<div class="p-4">
  <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">

  <h1 class="text-6xl">Series 1</h1>
  
  <div class="flex">
    <div class="w-1/2">
      <h2 class="text-3xl">Feature Standings</h2>
      <table>
        <tr v-for="driver in featureStandings"
          :key="driver.id"
        >
          <td v-text="driver.name" />
          <td v-text="driver.points" />
        </tr>
      </table>

      <h2 class="text-3xl">Sprint Standings</h2>
      <table>
        <tr v-for="driver in sprintStandings"
          :key="driver.id"
        >
          <td v-text="driver.name" />
          <td v-text="driver.points" />
        </tr>
      </table>

      <h4 class="text-2xl">Player Standings</h4>
      <table>
        <tr v-for="driver in standings"
          :key="driver.id"
        >
          <td v-text="driver.name" />
          <td v-text="driver.seriesTotal" />
        </tr>
      </table>
    </div>
    <div class="w-1/2">
      <h2 class="text-3xl">Constructor Standings</h2>
      <table>
        <tr v-for="team in constructorStandings"
          :key="team.id"
        >
          <td v-text="team.name" />
          <td v-text="team.points" />
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
        <td v-text="index+1" />
        <td v-text="entry.driverName" />
        <td v-text="entry.teamName" />
        <td v-text="entry.points" />
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
        :class="{
          'font-bold' : entry.isFastestLap,
          'text-red-700' : entry.isPole
        }"
      >
        <td v-text="index+1" />
        <td v-text="entry.driverName" />
        <td v-text="entry.teamName" />
        <td v-text="entry.points" />
      </tr>
    </table>
  </div>
  
</div>
</template>

<script>
import { findIndex, orderBy, sum } from "lodash";

import season2 from "@/data/season-2";
import Driver from "@/models/pocDriver";
import Sprint from "@/models/SprintRace";
import Feature from "@/models/FeatureRace";

export default {
  name: "POC",
  created() {
    this.drivers = season2.drivers.map(data => new Driver(data));

    this.sprints = [new Sprint(1, this.drivers), new Sprint(2, this.drivers)];

    this.features = [
      new Feature(1, this.drivers),
      new Feature(2, this.drivers)
    ];
  },
  data() {
    return {
      drivers: [],

      // done via class
      sprints: [],
      features: []
    };
  },
  methods: {
  },
  computed: {
    standings() {
      const players = this.drivers
        .filter(driver => driver.isPlayer);

      return orderBy(players, "seriesTotal", "desc");
    },

    featureStandings() {
      const features = this.drivers.map(driver => {
        return {
          name: driver.name,
          points: sum(driver.featureResults.map(feature => feature.totalPoints))
        };
      });

      return orderBy(features, "points", "desc");
    },

    sprintStandings() {
      const sprints = this.drivers
        .filter(driver => driver.isPlayer)
        .map(driver => {
          return {
            name: driver.name,
            points: sum(driver.sprintResults.map(sprint => sprint.totalPoints))
          };
        });

      return orderBy(sprints, "points", "desc");
    },

    constructorStandings() {
      const constructors = season2.teams.map(team => {
        return {
          name: team.name,
          id: team.id,
          points: sum(
            this.drivers
              .filter(driver => driver.teamId === team.id)
              .map(driver => driver.featureTotal)
          )
        };
      });

      return orderBy(constructors, "points", "desc");
    }
  }
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  margin-bottom: 2em;
}

th,
td {
  padding: 0.2em 1em;
  text-align: right;
}

.text {
  text-align: left;
}

th {
  font-weight: bold;
}

td {
  border-top: 1px solid #b3b3b5;
  text-align: left;
}

td + td {
  text-align: right;
}

tr:nth-child(2n) td {
  background-color: #f9f9f9;
}
</style>
