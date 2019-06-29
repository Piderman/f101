<template>
  <nav>
    <ul>
      <li v-for="weekend in raceWeekends"
        :key="weekend.id"
      >
        <router-link :to="{name: 'overview', params: {weekend: weekend.url}}">{{weekend.url}}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import weekends from "@/data/season-1/race-weekends";

export default {
  computed: {
    raceWeekends() {
      return weekends.filter(weekend => weekend.status == "complete");
    }
  }
};
</script>

<style>
nav ul,
nav li,
nav a {
  margin: 0;
  display: inline-block;
}

nav li + li {
  margin-left: 1em;
}
</style>
