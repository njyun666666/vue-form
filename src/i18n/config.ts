import en from './en/en'
import zh_tw from './zh-tw/zh-tw'
import { createI18n } from 'vue-i18n'

export const messages = {
  en: en,
  'zh-tw': zh_tw
}

type MessageSchema = typeof zh_tw
export type LangType = 'en' | 'zh-tw'

export const i18n = createI18n<[MessageSchema], LangType>({
  legacy: false,
  locale: localStorage.lang || (navigator.language.toLowerCase().startsWith('zh') ? 'zh-tw' : 'en'),
  fallbackLocale: 'zh-tw',
  messages
})
