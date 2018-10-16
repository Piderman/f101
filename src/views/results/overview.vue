<template>
<div>
  <h1>{{weekend.name}}</h1>
  <p v-if="polePosition">Pole position: {{polePosition.time}} - {{polePosition.driver}}</p>
  
  <p v-if="fastestLap">Fastest Lap: {{fastestLap.time}} - {{fastestLap.driver}}</p>

  <h3>Podium</h3>
  <ol>
    <li v-for="driver in podium"
      :key="driver.id"
    >
      {{driver.position}}: {{driver.name}}
    </li>
  </ol>

</div>
</template>

<script>
import {compact, find, pick, sortBy} from 'lodash';

export default {
  methods: {
    getAllDriverStatsFor(session, fields) {
      const driverStatsForWeekend = this.$store.state.Drivers.allDrivers.map(driver => {
        const results = find(driver[session], { raceId: this.weekend.id });
        
        if (results) {
          const valuesToDisplay = pick(results, fields, ['position']);
  
          return Object.assign(valuesToDisplay, {
            name: driver.name
          })
        }
      });

      return compact(driverStatsForWeekend);
    }
  },
  computed: {
    weekend() {
      return this.$parent.weekend;
    },
    raceResults() {
      return this.getAllDriverStatsFor('raceResults', 'fastestLap')
    },
    podium() {
      const raceStandings = sortBy(this.raceResults, 'position')

      // todo: finishing time???
      return raceStandings.slice(0,3);
    },
    fastestLap() {
      const result = sortBy(this.raceResults, 'fastestLap')[0];

      return result && {
        time: result.fastestLap,
        driver: result.name
      }
    },
    polePosition() {
      const qualifying = this.getAllDriverStatsFor('qualifyingResults', 'time')
      const result = find(qualifying, {position: 1});

      return result && {
        time: result.time,
        driver: result.name
      }
    }
  }
};
</script>

<style>
ol li {
  display: block;
  list-style-type: decimal;
  list-style-position: inside;
}
</style>
