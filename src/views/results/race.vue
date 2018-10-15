<template>
  <div>
    <h1>Race - {{weekend.name}}</h1>

    <ResultsTable values="raceResults" :fields="['fastestLap', 'grid']"/>

  </div>
</template>

<script>
import ResultsTable from "@/components/WeekendResultsTable.vue";

export default {
  computed: {
    weekend() {
      return this.$parent.weekend;
    }
  },
  components: {
    ResultsTable
  }
};
</script>

<style>
</style>
