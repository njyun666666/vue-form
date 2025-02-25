<script setup lang="ts">
import type { LangType } from './i18n/config'
import { useLayoutStore } from './stores/layout'
import { useLocaleStore } from './stores/locale'
import { useDark } from '@vueuse/core'
import ConfirmDialog from 'primevue/confirmdialog'
import DynamicDialog from 'primevue/dynamicdialog'
import Toast from 'primevue/toast'
import { useI18n } from 'vue-i18n'
import { RouterView } from 'vue-router'

const { locale } = useI18n()
const localeStore = useLocaleStore()
const layoutStore = useLayoutStore()

localeStore.setLang(locale.value as LangType)
useDark()
</script>

<template>
  <RouterView />
  <DynamicDialog />
  <ConfirmDialog />
  <Toast />

  <div
    v-if="layoutStore.loading"
    class="w-screen h-screen fixed top-0 left-0 bg-black/50 z-[2000] flex items-center justify-center"
  >
    <i class="pi pi-spin pi-spinner text-4xl"></i>
  </div>
</template>
