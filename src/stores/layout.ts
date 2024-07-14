import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { computed, ref } from 'vue'
import { breakpoints } from '@/libs/utils/layout'

export const useLayoutStore = defineStore('layout', () => {
  const isMobile = computed(() => breakpoints.active().value == 'default')
  const navDefaultExpanded = useStorage('navDefaultExpanded', false)
  const navExpandedState = ref(breakpoints.greaterOrEqual('xl').value && navDefaultExpanded.value)

  return {
    isMobile,
    navDefaultExpanded,
    navExpandedState
  }
})
