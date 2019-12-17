<template>
  <abbr class="driver-name" :title="driver.name" v-text="driver.abbr"/>
</template>

<script>
export default {
  name: "driver-title",
  props: {
    driver: Object
  }
};
</script>

<style>
.driver-name {
  text-decoration: none !important;
}

@media (min-width: 640px) {
  .driver-name {
    font-size: 0;
  }

  .driver-name:before {
    content: attr(title);
    font-size: 16px;
  }
}
</style>
