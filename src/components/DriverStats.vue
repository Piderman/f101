<template>
<div class="my-6">
  <h3 v-text="driver.name" class="text-xl font-bold"/>

  <ul>
    <li class="flex flex-row">
      <b>Wins</b>
      <span v-text="driver.stats.wins" class="ml-auto"/>
    </li>

    <li class="flex flex-row">
      <!-- mirror -->
      <icon name="podium" class="fill-transparent mirror" />
      <b>Podiums</b>
      <span v-text="driver.stats.podiums" class="ml-auto"/>
    </li>

    <li class="flex flex-row">
      <icon name="award"  class="fill-transparent" />
      <b>Pole positions: </b>
      <span v-text="driver.stats.poles" class="ml-auto"/>
    </li>

    <li class="flex flex-row">
      <icon name="watch"  class="fill-transparent" />
      <b>Fastest laps: </b>
      <span v-text="driver.stats.fastestLaps" class="ml-auto"/>
    </li>

    <li class="flex flex-row">
      <b>Best Finishing Position</b>
      <span v-text="driver.stats.highestPosition" class="ml-auto"/>
    </li>

    <li class="flex flex-row">
      <b>Best Round Score</b>
      <span v-text="driver.stats.bestScore" class="ml-auto"/>
    </li>
  </ul>
</div>
</template>

<script>
import Icon from '@/components/Icon.vue'


export default {
  name: 'driver-stats',
  props: {
    driver: Object
  },
  components: {
    Icon
  }
}
</script>

<style>
.mirror {
  transform: scaleX(-1);
}
</style>
