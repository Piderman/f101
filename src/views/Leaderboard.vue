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
</div>  
</template>

<script>
import { mapGetters } from "vuex";

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
    ...mapGetters({ leaderboard: "Drivers/leaderboard" })
  }
};
</script>


<style>
table {
  border-collapse: collapse;
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
