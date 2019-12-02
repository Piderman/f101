<template>
<div class="my-8">
  <div class="flex flex-row  mb-4">
    <img v-bind="lid" class="w-20  h-full  mr-4">

    <div>
      <p v-text="`#${driver.raceNumber}`" class="text-xl  font-bold"/>
      <h3 class="text-xl" v-text="driver.name" />
      <p v-text="driver.teamName" class="mb-4  text-sm  font-light" />
    </div>
  </div>
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
import Icon from "@/components/Icon.vue";

export default {
  name: "driver-stats",
  props: {
    driver: Object
  },
  data() {
    return {
      stats: this.parseStats(this.driver)
    };
  },
  methods: {
    parseStats(driver) {
      const separator = {
        attrs: {
          class: "mb-2  pb-2  border-b-2  border-gray-200"
        }
      };
      // does this need to be per series?
      return [
        {
          title: "Series Points",
          value: driver.careerPoints
        },
        {
          title: "Series Wins",
          // todo: how???
          value: "-"
        },
        {
          title: "Highest Round Points",
          value: driver.stats.bestScore,
          ...separator
        },

        {
          title: "Sprint Points",
          value: driver.stats.sprintTotal
        },
        {
          title: "Sprint Wins",
          value: driver.stats.sprintWins,
          ...separator
        },

        {
          title: "Feature Points",
          value: driver.stats.featureTotal
        },
        {
          title: "Feature Wins",
          value: driver.stats.featureWins
        },
        {
          icon: {
            name: "podium",
            class: "fill-transparent  mirror"
          },
          title: "Podiums",
          value: driver.stats.featurePodiums
        },
        {
          title: "Highest Finishing Position",
          value: driver.stats.highestPosition
        },
        {
          title: "Pole Positions",
          value: driver.stats.poles
        },
        {
          title: "Fastest Laps",
          value: driver.stats.fastestLaps
        }
      ];
    }
  },
  computed: {
    // mixin?
    lid() {
      return {
        src: require(`@/assets/${this.driver.meta.firstName.toLowerCase()}-helmet.png`),
        alt: `${this.driver.name}'s racing hemlet`
      };
    }
  },
  components: {
    Icon
  }
};
</script>

<style>
.mirror {
  transform: scaleX(-1);
}
</style>
