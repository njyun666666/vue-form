<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { RouterView } from 'vue-router'
import type { LangType } from './i18n/config'
import { useLocaleStore } from './stores/locale'

const { locale } = useI18n()
const localeStore = useLocaleStore()

localeStore.setLang(locale.value as LangType)
useDark()
</script>

<template>
  <RouterView />
</template>
