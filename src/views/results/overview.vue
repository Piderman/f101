<template>
<div>
  <h1>{{weekend.name}}</h1>
  <p>Conditions: {{conditions}}</p>  
</div>
</template>

<script>
export default {
  computed: {
    weekend() {
      return this.$parent.weekend;
    },
    conditions() {
      const qual = this.weekend.weather.qualifying.join(" then ");
      const race = this.weekend.weather.race.join(" then ");
      let conditions = "";

      if (qual !== race) {
        conditions = `Qualifying: ${qual}. Race: ${race}`;
      } else {
        conditions = qual;
      }

      return conditions;
    }
  }
};
</script>

<style>
</style>
