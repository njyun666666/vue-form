import { defineStore } from 'pinia'
import { useStorage, useTitle } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { breakpoints } from '@/libs/utils/layout'

export const useLayoutStore = defineStore('layout', () => {
  const isMobile = computed(() => breakpoints.active().value == 'default')
  const navDefaultExpanded = useStorage('navDefaultExpanded', false)
  const navExpandedState = ref(breakpoints.greaterOrEqual('xl').value && navDefaultExpanded.value)
  const messageCount = ref(0)
  const webTitle = ref('')
  const title = computed(() => {
    const messagesText = messageCount.value > 0 ? `(${messageCount.value}) ` : ''
    return `${messagesText}${webTitle.value}`
  })
  const setTitle = useTitle(title.value, { titleTemplate: '%s / Vue-Form' })

  watch(title, () => {
    setTitle.value = title.value
  })

  return {
    isMobile,
    navDefaultExpanded,
    navExpandedState,
    webTitle
  }
})
