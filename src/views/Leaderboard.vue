<template>
<div>
  <table>
    <tr>
      <th class="number">Position</th>
      <th class="text">Driver</th>
      <th class="number">Points</th>
      <th class="number">Gap</th>
    </tr>
    <tr v-for="(driver, index) in leaderboard"
      :key="driver.id"
    >
      <td class="number">{{index + 1}}</td>
      <td class="text">{{driver.name}}</td>
      <td class="number">{{driver.seasonTotal}}</td>
      <td class="number">{{gapToLeader(driver)}}</td>
    </tr>
  </table>

  <highcharts :options="championshipStandings"/>

  <highcharts :options="constructorStanding"/>

</div>  
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import HighchartsVue from "highcharts-vue";

import { get, find, sortBy, sum } from "lodash";

import teams from "@/data/season-1/teams";

Vue.use(HighchartsVue);

export default {
  name: "current-season-standings",
  methods: {
    gapToLeader(driver) {
      return (
        this.$store.getters["Drivers/leader"].seasonTotal - driver.seasonTotal
      );
    }
  },
  computed: {
    ...mapGetters({ leaderboard: "Drivers/leaderboard" }),
    driverStandingsData() {
      return this.$store.state.Drivers.allDrivers.map(driver => {
        return {
          name: driver.name,
          color: get(find(teams, { teamId: driver.primaryTeamId }), "hex"),
          data: driver.raceResults.map(race => race.progressiveSeasonTotal)
        };
      });
    },

    constructorTeamData() {
      return {
        name: "team",
        borderColor: "#2c3e50",
        dataLabels: {
          enabled: false
        },
        data: teams.map(team => {
          return {
            name: team.name,
            color: team.hex,
            y: sum(
              this.$store.state.Drivers.allDrivers.map(driver => {
                if (driver.primaryTeamId == team.teamId) {
                  return driver.seasonTotal;
                }
              })
            )
          };
        })
      };
    },
    constructorTeamDriverData() {
      return {
        name: "drivers",
        size: "80%",
        borderColor: "#2c3e50",
        data: sortBy(this.$store.state.Drivers.allDrivers, "primaryTeamId").map(
          driver => {
            return {
              name: driver.name,
              color: get(find(teams, { teamId: driver.primaryTeamId }), "hex"),
              y: driver.seasonTotal
            };
          }
        )
      };
    },
    championshipStandings() {
      return {
        title: {
          text: "Driver Standings"
        },
        yAxis: {
          title: {
            text: "Season Points"
          }
        },
        xAxis: {
          title: {
            text: "Race"
          }
        },
        series: this.driverStandingsData
      };
    },
    constructorStanding() {
      return {
        chart: {
          type: "pie"
        },
        title: { text: "Constructor Standings" },
        series: [this.constructorTeamData, this.constructorTeamDriverData]
      };
    }
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
}

tr:nth-child(2n) td {
  background-color: #f9f9f9;
}
</style>
