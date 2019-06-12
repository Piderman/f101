<template>
<div>
  <h1>Standings</h1>

  <table>
    <tr v-for="driver in standings"
      :key="driver.id"
    >
      <td v-text="driver.name" />
      <td v-text="driver.total" />
    </tr>
  </table>


  <hr>

  <h2>Round {{currentRound + 1}} Summary</h2>

  <table>
    <tr>
      <th>Position</th>
      <th>Name</th>
      <th>Points</th>
      <th>Championship Points</th>
      <th v-if="currentRound">Change</th>
    </tr>
    <tr v-for="(driver, index) in currentRoundStandings"
      :key="driver.id"
    >
      <td v-text="index+1" />
      <td v-text="driver.name" />
      <td v-text="driver.total" />
      <td v-text="driver.runningStandings" />
      <td v-if="currentRound" v-html="driver.delta" />
    </tr>
  </table>

  <button @click="onClickPrev()">prev</button>
  <button @click="onClickNext()">next</button>
</div>
</template>

<script>
import {findIndex, orderBy, sum} from 'lodash'

import season2 from '@/data/season-2';
import Driver from '@/models/pocDriver';

export default {
  name: "POC",
  created() {
    this.drivers = season2.drivers.map(data => new Driver(data));

    this.buildCurrentRound();
  },
  data() {
    return {
      drivers: [],
      currentRound: 0,
      currentRoundStandings: {},
      precedingRoundStandings: {},
    }
  },
  methods: {
    onClickPrev(){
      if (this.currentRound!==0) {
        this.precedingRoundStandings = this.buildStandingsForRound(this.currentRound - 1);
        
        this.currentRound--;
        
        this.buildCurrentRound();

      } else {
        this.precedingRoundStandings = [];
      }
    },
    onClickNext(){
      if (this.currentRound!== this.drivers[0].standings.length - 1) {
        this.precedingRoundStandings = this.currentRoundStandings;

        this.currentRound++;

        this.buildCurrentRound();
      }
    },

    buildCurrentRound() {
      this.currentRoundStandings = this.buildStandingsForRound(this.currentRound);

      if (this.currentRound) {
        this.currentRoundStandings.forEach((driver, index) => {
          let delta = '-';
          
          let precedingPosition = findIndex(this.buildStandingsForRound(this.currentRound - 1), {id: driver.id});
  
          if (index < precedingPosition) {
            delta = '&uarr;';

          } else if (index > precedingPosition) {
            delta = '&darr;';
          }
  
          driver.delta = delta;
        });
      }
    },

    buildStandingsForRound(raceIndex) {
      // how to get delta from last round?
      let roundStandings = this.drivers.map(driver => {
        return {
          name: driver.name,
          id: driver.id,
          total: driver.standings[raceIndex].total,
          runningStandings: sum(driver.standings
            .slice(0, raceIndex + 1)
            .map(round=>round.total)
          )
        }
      });

      roundStandings = orderBy(roundStandings, 'runningStandings', 'desc');

      return roundStandings;
    }
  },
  computed: {
    standings() {
      return orderBy(this.drivers, 'total', 'desc');
    },
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