<template>
  <svg xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    :aria-labelledby="name"
    role="presentation"
    class="stroke-current"
  >
    
    <component v-bind:is="componentName" />
  </svg>
</template>

<script>
import IconAward from './icons/IconAward.vue'
import IconUser from './icons/IconUser.vue'
import IconMultiUser from './icons/IconMultiUser.vue'
import IconWatch from './icons/IconWatch.vue'

export default {
  name: 'icon',
  props: {
    name: String,
    height: {
      type: String,
      default: '1em'
    },
    width: {
      type: String,
      default: '1em'
    },
    isHollow: Boolean
  },
  computed: {
    componentName() {
      return `icon-${this.name}`
    }
  },
  components: {
    IconAward,
    IconUser,
    IconMultiUser,
    IconWatch
  }
}
</script>
