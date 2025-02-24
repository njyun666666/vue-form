<script setup lang="ts">
import type { LangType } from './i18n/config'
import { useLocaleStore } from './stores/locale'
import { useDark } from '@vueuse/core'
import Toast from 'primevue/toast'
import { useI18n } from 'vue-i18n'
import { RouterView } from 'vue-router'

const { locale } = useI18n()
const localeStore = useLocaleStore()

localeStore.setLang(locale.value as LangType)
useDark()
</script>

<template>
  <RouterView />
  <Toast />
</template>
