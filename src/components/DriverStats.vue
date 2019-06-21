<template>
<div class="my-6">
  <h3 v-text="driver.name" class="text-xl font-bold"/>

  <ul>
    <li class="flex flex-row"
      v-for="(stat, index) in stats"
      :key="index"
      v-bind="stat.attrs"
    >
      <!-- <icon v-if="stat.icon" v-bind="stat.icon" /> -->
      <span v-text="stat.title" class="font-medium" />
      <span v-text="stat.value"  class="ml-auto" />
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
  data() {
    return {
      stats: this.parseStats(this.driver)
    }
  },
  methods: {
    parseStats(driver) {
      const separator = {
        attrs: {
          class:'mb-2  pb-2  border-b-2  border-gray-200'
        }

      };
      return [
        {
          title: 'Series Points',
          value: driver.seriesTotal
        },
        {
          title: 'Series Wins',
          value: 0
        },
        {
          title: 'Highest Round Points',
          value: driver.stats.bestScore,
          ...separator
        },


        {
          title: 'Sprint Points',
          value: driver.sprintTotal
        },
        {
          title: 'Sprint Wins',
          value: driver.stats.sprintWins,
          ...separator
        },


        {
          title: 'Feature Points',
          value: driver.featureTotal
        },
        {
          title: 'Feature Wins',
          value: driver.stats.featureWins
        },
        {
          icon: {
            name: 'podium',
            class: 'fill-transparent  mirror'
          },
          title: 'Podiums',
          value: driver.stats.featurePodiums
        },
        {
          title: 'Highest Finishing Position',
          value: driver.stats.highestPosition
        },
        {
          title: 'Pole Positions',
          value: driver.stats.poles
        },
        {
          title: 'Fastest Laps',
          value: driver.stats.fastestLaps
        },
      ]
    }
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
