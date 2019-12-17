<template>
<div class="flex">
  <div class="w-1/2">
    <h3 class="text-3xl">Sprint</h3>
    <h4>Qualifying</h4>
    <div class="my-3  flex justify-center">
      <icon v-for="(icon, index) in grandPrix.sprint.qualifying" :key="`sprint_qual_${index}`"
        :name="icon"
        width="1.5em"
        height="1.5em"
        class="mx-2 fill-transparent stroke-2"
      />
    </div>
    <h4>Race</h4>
    <div class="my-3  flex justify-center">
      <icon v-for="(icon, index) in grandPrix.sprint.race" :key="`sprint_race_${index}`"
        :name="icon"
        width="1.5em"
        height="1.5em"
        class="mx-2 fill-transparent stroke-2"
      />
    </div>
  </div>
  <div class="w-1/2">
    <h3 class="text-3xl">Feature</h3>
    <h4>Qualifying</h4>
    <div class="my-3  flex justify-center">
      <icon v-for="(icon, index) in grandPrix.feature.qualifying" :key="`feat_qual_${index}`"
        :name="icon"
        width="1.5em"
        height="1.5em"
        class="mx-2 fill-transparent stroke-2"
      />
    </div>
    <h4>Race</h4>
    <div class="my-3  flex justify-center">
      <icon v-for="(icon, index) in grandPrix.feature.race" :key="`feat_race_${index}`"
        :name="icon"
        width="1.5em"
        height="1.5em"
        class="mx-2 fill-transparent stroke-2"
      />
    </div>
  </div>
</div>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  props: {
    grandPrix: Object
  },
  components: {
    Icon
  }
};
</script>
