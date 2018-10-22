<template>
<div>
  <table>
    <tr>
      <th @click="sortByHeader('position')">Position</th>
      <th>Driver</th>
      <th>Team</th>

      <th v-for="value in fields"
        :key="`heading_${value}`"
        @click="sortByHeader(value)"
      >{{value}}</th>

    </tr>
    <tr v-for="driver in orderedResults"
      :key="driver.id"
      :class="{'podium' : isPodium(driver.position)}"
    >
      <td>{{driver.position}}</td>
      <td class="text">{{driver.name}}</td>
      <td>{{driver.team}}</td>

      <td v-for="value in fields"
        :key="`${driver.id}_${value}`"
      >{{driver[value]}}</td>
    </tr>
  </table>
</div>
</template>

<script>
import teams from "@/data/season-1/teams.js";

import { compact, find, pick, orderBy } from "lodash";

export default {
  props: ["values", "fields"],
  data() {
    return {
      selectedColumn: "position",
      isAscending: true
    };
  },
  methods: {
    sortByHeader(field) {
      if (this.selectedColumn == field) {
        this.isAscending = !this.isAscending;
      } else {
        this.selectedColumn = field;
        this.isAscending = true;
      }
    },
    isPodium(position) {
      return position <= 3;
    }
  },
  computed: {
    weekend() {
      return this.$parent.weekend;
    },
    results() {
      const driverStatsForWeekend = this.$store.state.Drivers.allDrivers.map(
        driver => {
          const results = find(driver[this.values], {
            raceId: this.weekend.id
          });

          // DNF will always have a finish. no position means you didnt race
          // we need the result though so the leaderboard graph shows you didn't move
          if (results && results.position) {
            const valuesToDisplay = pick(results, this.fields, ["position"]);

            return Object.assign(valuesToDisplay, {
              name: driver.name,
              team: find(teams, { teamId: results.teamId }).name
            });
          }
        }
      );

      return compact(driverStatsForWeekend);
    },
    orderedResults() {
      const order = this.isAscending ? "asc" : "desc";

      return orderBy(this.results, this.selectedColumn, order);
    }
  }
};
</script>

<style>
table {
  border-collapse: collapse;
}
th,
td {
  text-align: right;
  padding: 1em;
}

td {
  border-top: 1px solid #b3b3b5;
}

tr:nth-child(2n) td {
  background-color: #f9f9f9;
}

.podium td {
  background-color: #e8e8ed !important;
}
</style>
