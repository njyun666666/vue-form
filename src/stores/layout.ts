import { breakpoints } from '@/libs/utils/layout'
import { useStorage, useTitle } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export const useLayoutStore = defineStore('layout', () => {
  const navDefaultExpanded = useStorage('navDefaultExpanded', false)
  const navExpandedState = ref(breakpoints.isGreaterOrEqual('xl') && navDefaultExpanded.value)
  const messageCount = ref(0)
  const webTitle = ref('')
  const loading = ref(false)
  const title = computed(() => {
    const messagesText = messageCount.value > 0 ? `(${messageCount.value}) ` : ''
    return `${messagesText}${webTitle.value}`
  })
  const setTitle = useTitle(title.value, { titleTemplate: '%s / Vue-Form' })

  watch(title, () => {
    setTitle.value = title.value
  })

  return {
    navDefaultExpanded,
    navExpandedState,
    webTitle,
    loading
  }
})
