<template>
  <div class="rando">
    <h1>Season {{$route.params.year}}</h1>

    <div v-for="(season, index) in seasons" :key="index">
      <h2 v-text="`Series ${index + 1}`"/>
      <ol>
        <li v-for="race in season"
          :key="index + '_' + race.id"
          v-text="race.name"
        />
      </ol>
    </div> 
  </div>
</template>

<script>
import weekends from "@/data/season-1/race-weekends";
import { remove, shuffle } from "lodash";

export default {
  created() {
    console.log("index");

    const standardRaces = shuffle(weekends);
    const bonusRaces = remove(standardRaces, race => {
      // nuke monaco
      return race.id === 6;
    });

    standardRaces.forEach((race, index) => {
      const clampedIndex = index % 3;

      this.addRaceToSeason(this.seasons[clampedIndex], race);
    });

    bonusRaces.forEach(race => {
      this.addRaceToSeason(this.seasons[2], race);
    });
  },
  data() {
    return {
      seasons: [[], [], []]
    };
  },
  methods: {
    addRaceToSeason(season, race) {
      season.push({
        id: race.id,
        name: race.name
      });
    }
  }
};
</script>

<style>
.rando {
  text-align: left;
}
</style>
