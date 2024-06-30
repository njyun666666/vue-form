<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterView } from 'vue-router'
import { useLocaleStore } from './stores/locale'
import { useDark } from '@vueuse/core'
import type { LangType } from './i18n/config'

const { locale } = useI18n()
const localeStore = useLocaleStore()

localeStore.setLang(locale.value as LangType)
useDark()
</script>

<template>
  <RouterView />
</template>
