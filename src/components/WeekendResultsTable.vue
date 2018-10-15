<template>
<div>
  <table>
    <tr>
      <th>Position</th>
      <th>Driver</th>
      <th>Team</th>

      <th v-for="value in fields"
        :key="`heading_${value}`"
      >{{value}}</th>

    </tr>
    <tr v-for="driver in results"
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
      selectedColumn: "",
      order: "desc"
    };
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

      return orderBy(compact(driverStatsForWeekend), 'position');
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
