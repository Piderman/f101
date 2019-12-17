<template>
  <div>
    <div class="page-header relative  text-center  bg-black  overflow-hidden">
      <div class="relative  z-10  text-white  font-bold">
        <div class="px-2  py-16">
          <header class="mb-16">
            <h1 class="text-6xl" v-text="currentGrandPrix.country" />
            <span class="text-lg" v-text="`Series ${$route.params.series},  Round ${round}`"/>
          </header>
          <weather :grand-prix="currentGrandPrix.weather" />
        </div>
      </div>

      <img class="object-cover  h-screen  absolute  top-0  right-0  bottom-0  left-0"
        src="https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Abu%20Dhabi.jpg.transform/fullbleed-retina/image.jpg"
      />
    </div>
    <!-- todo: series theme color? -->
    <div class="weekend-nav  bg-gray-800  bg-blue-500  text-white">
      <nav>
        <ul class="flex justify-center">
          <li class="mx-2"><router-link class="block  py-4  px-2" :to="overviewLink">Overview</router-link></li>
          <li class="mx-2"><router-link class="block  py-4  px-2" :to="featureLink">Feature Results</router-link></li>
        </ul>
      </nav>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import WeekendInformation from "@/mixins/WeekendInformation";
import Icon from "@/components/Icon";
import Weather from "@/components/WeekendWeather";

export default {
  mixins: [WeekendInformation],
  name: "results-common-view",
  created() {
    console.log("index: created");
  },
  methods: {},
  computed: {
    currentParams() {
      return {
        series: this.$route.params.series,
        weekend: this.$route.params.weekend
      };
    },

    overviewLink() {
      return {
        name: "overview-results",
        params: this.currentParams
      };
    },

    featureLink() {
      return {
        name: "feature-results",
        params: this.currentParams
      };
    }
  },
  components: {
    Icon,
    Weather
  }
};
</script>

<style>
@supports (filter: contrast(1)) {
  .page-header img {
    filter: contrast(1.4) brightness(0.4);
  }
}

.weekend-nav .router-link-exact-active {
  border-bottom: 2px solid currentColor;
}
</style>
