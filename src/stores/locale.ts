import type { LangType } from '@/i18n/config'
import '@/i18n/dayjs/zh-tw'
import primeEN from '@/i18n/primelocale/en.json'
import primeZH_TW from '@/i18n/primelocale/zh-tw.json'
import { useStorage } from '@vueuse/core'
import dayjs from 'dayjs'
import { defineStore } from 'pinia'
import { usePrimeVue } from 'primevue/config'
import { useI18n } from 'vue-i18n'

export const useLocaleStore = defineStore('locale', () => {
  const lang = useStorage<LangType>('lang', 'zh-tw')
  const { locale } = useI18n()
  const primevue = usePrimeVue()

  const setLang = (val: LangType) => {
    lang.value = val
    locale.value = val
    document.documentElement.setAttribute('lang', val)
    dayjs.locale(val)

    switch (val) {
      case 'en':
        primevue.config.locale = primeEN.en
        break

      default:
        primevue.config.locale = primeZH_TW['zh-TW']
        break
    }
  }

  return { lang, setLang }
})
