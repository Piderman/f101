<template>
  <div>
    <h1>Race - {{weekend.name}}</h1>
    <p>Conditions: {{conditions}}</p> 

    <p v-if="weekend.safteycarLaps">Safety car deployed</p> 

    <ResultsTable values="raceResults" :fields="['fastestLap', 'grid', 'positionsGained', 'points', 'progressiveSeasonTotal']"/>

  </div>
</template>

<script>
import ResultsTable from "@/components/WeekendResultsTable.vue";

export default {
  computed: {
    weekend() {
      return this.$parent.weekend;
    },
    conditions() {
      return this.weekend.weather.race.join(" then ");
    }
  },
  components: {
    ResultsTable
  }
};
</script>

<style>
</style>
