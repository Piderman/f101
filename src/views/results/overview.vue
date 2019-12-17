<template>
  <div  class="text-center">
    <div class="mx-auto  my-16  md:w-1/2 hidden">
      <h2 class="text-3xl">Sprint winner</h2>
      <!-- driver helmet -->
    </div>
    <div class="py-16  bg-grey-200">
      <div class="mx-auto  md:w-1/2">
        <h2 class="text-3xl  mb-8">Feature podium</h2>

        <table class="w-full">
          <tr v-for="(entry, index) in featureResults.podium" :key="index">
            <td class="pl-0 text-right" v-text="entry.positionText" />
            <td v-text="entry.name"></td>
            <td>
              <div class="flex flex-row">
                <icon name="award" v-if="entry.isPole" class="fill-transparent" />
                <icon name="watch" v-if="entry.isFastestLap" class="fill-transparent" />
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <div class="hidden">
      drivers standings at round
    </div>

    <div class="hidden">
      contsructor standings at round
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
import WeekendInformation from "@/mixins/WeekendInformation";

export default {
  mixins: [WeekendInformation],
  name: "results-landing-view",
  created() {
    console.log("overview: created");
  },
  components: {
    Icon
  }
};
</script>
