import { createI18n } from 'vue-i18n'
import en from './en.json'
import zh_tw from './zh-tw.json'

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
