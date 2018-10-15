<template>
  <h1>Race - {{weekend.name}}</h1>
</template>

<script>
export default {
  computed: {
    weekend() {
      return this.$parent.weekend;
    },
  }
};
</script>

<style>
</style>
