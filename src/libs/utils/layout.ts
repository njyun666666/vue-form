import { useBreakpoints } from '@vueuse/core'
import { computed } from 'vue'

export const breakpoints = useBreakpoints({
  default: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
})

export const isMobile = computed(() => breakpoints.active().value == 'default')
