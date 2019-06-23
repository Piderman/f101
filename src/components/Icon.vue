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
import IconPodium from './icons/IconPodium.vue'
import IconSun from './icons/IconSun.vue'
import IconCloud from './icons/IconCloud.vue'
import IconDrizzle from './icons/IconDrizzle.vue'
import IconRain from './icons/IconRain.vue'
import IconChevronUp from './icons/IconChevronUp.vue'
import IconChevronsUp from './icons/IconChevronsUp.vue'
import IconChevronDown from './icons/IconChevronDown.vue'
import IconChevronsDown from './icons/IconChevronsDown.vue'

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
    IconChevronsDown,
    IconChevronDown,
    IconChevronsUp,
    IconChevronUp,
    IconCloud,
    IconDrizzle,
    IconMultiUser,
    IconPodium,
    IconRain,
    IconSun,
    IconUser,
    IconWatch,
  }
}
</script>
