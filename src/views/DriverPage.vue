<template>
<div>
  <driver-stats :driver="currentDriver" />
</div>
</template>

<script>
import DriverStats from '@/components/DriverStats.vue'
export default {
  name: "driver-page",
  computed: {
    currentDriver() {
      const id = parseInt(this.$route.params.id, 10);

      return this.$store.state.Drivers.drivers.find(Driver => Driver.id == id);
    }
  },
  components: {
    DriverStats
  },
}
</script>

