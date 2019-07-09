<template>
<div>
  <!-- qual in grid style layout -->
  <div class="flex flex-row flex-wrap ">
    <div v-for="(entry, index) in currentSprint.qualifying" class="flex  flex-row  w-1/2"
      :key="index"
      :class="{
        'mt-16': index % 2,
        'mb-16': !(index % 2)
      }"
    >
      <p v-text="entry.position" class=""/>
      <div class="mr-auto">
        <img v-bind="buildLid(entry)" class="w-20  h-full  mr-4">
        <p v-text="entry.name"/>
        <p v-text="entry.time"/>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "sprint-results-page",
  created() {
    if (!this.$store.state.SprintEvents.results.length) {
      this.$store.dispatch("SprintEvents/init");
    }
  },
  methods: {
    buildLid(entry) {
      return {
        src: require(`@/assets/${entry.firstName.toLowerCase()}-helmet.png`),
        alt: `${entry.name}'s racing hemlet`
      };
    },
    getSprintById(raceId) {
      return this.$store.state.SprintEvents.results.find(race => {
        return race.id == raceId;
      });
    }
  },
  computed: {
    mockGrid() {
      return ["Matty", "Simon", "Chris", "Peter"];
    },

    routeRaceId() {
      return parseInt(this.$route.params.raceId, 10);
    },

    currentSprint() {
      return this.getSprintById(this.routeRaceId);
    }
  }
};
</script>
