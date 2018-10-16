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
      isAscending: true,
    };
  },
  methods: {
    sortByHeader(field) {
      if (this.selectedColumn == field) {
        this.isAscending = !this.isAscending;

      } else {
        this.selectedColumn = field
        this.isAscending = true;
      }      
    }
  },
  computed: {
    weekend() {
      return this.$parent.weekend;
    },
    results() {
      const driverStatsForWeekend = this.$store.state.Drivers.allDrivers.map(driver => {
        const results = find(driver[this.values], { raceId: this.weekend.id });
        
        if (results) {
          const valuesToDisplay = pick(results, this.fields, ['position']);
  
          return Object.assign(valuesToDisplay, {
            name: driver.name,
            team: find(teams, {teamId: results.teamId}).name
          })
        }
      });

      return compact(driverStatsForWeekend);
    },
    orderedResults() {
      const order = this.isAscending ? 'asc' : 'desc';

      return orderBy(this.results, this.selectedColumn, order);
    }
  }
};
</script>

<style>
  table {
    border-collapse: collapse;
  }
  th, td {
    text-align: right;
    padding: 1em;
  }

  td{ 
    border-top: 1px solid #b3b3b5;
  }
</style>