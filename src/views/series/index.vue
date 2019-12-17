<template>
<div class="p-4">
  <header class="mb-4">
    <h1 class="text-6xl">Series {{$route.params.series}}</h1>
  </header>
  <router-view/>  
</div>
</template>

<script>
export default {
  name: "series-landing"
};
</script>

<style>
table {
  border-collapse: collapse;
  margin-bottom: 2em;
}

th,
td {
  padding: 0.5em 0.75em;
  font-variant-numeric: tabular-nums;
}

tr:nth-child(2n) td {
  background-color: #f9f9f9;
}

.team-idicator--small {
  display: inline-block;
  width: 4px;
  height: 0.75em;
  margin-right: 0.5em;
}

@media (min-width: 640px) {
  th,
  td {
    padding: 0.5em 1em;
  }
}
</style>
