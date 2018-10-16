<template>
  <div>
    <h1>Qual - {{weekend.name}}</h1>

    <p>Conditions: {{conditions}}</p>  

    <ResultsTable values="qualifyingResults" :fields="['time']"/>

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
      return this.weekend.weather.qualifying.join(" then ");
    }
  },
  components: {
    ResultsTable
  }
};
</script>

<style>
</style>
