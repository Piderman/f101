<template>
  <div>
    <h1>Qual - {{weekend.name}}</h1>

    <ResultsTable values="qualifyingResults" :fields="['time']"/>

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
