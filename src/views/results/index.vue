<template>
  <div>
    <WeekendNav/>

    <router-view></router-view>

    <router-link :to="{name: 'race-results'}">race details</router-link> | 
    <router-link :to="{name: 'qualifying-results'}">qualifying details</router-link>
  </div>
</template>

<script>
import WeekendNav from "@/components/WeekendNav.vue";
import ResultsTable from "@/components/WeekendResultsTable.vue";
import weekends from "@/data/season-1/race-weekends";

import { find } from "lodash";

export default {
  components: { WeekendNav, ResultsTable },
  computed: {
    weekend() {
      return find(weekends, { url: this.$route.params.weekend });
    }
  }
};
</script>
