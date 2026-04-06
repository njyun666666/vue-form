<script setup lang="ts">
import BasePage from '@/pages/BasePage.vue'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const type = route.query.type as string | undefined
</script>
<template>
  <BasePage class="flex flex-col items-center justify-center gap-6 text-center">
    <font-awesome-icon icon="fa-solid fa-ban" class="text-6xl text-red-400" />
    <div class="flex flex-col gap-2">
      <h1 class="text-2xl font-semibold">
        {{ type === 'forbidden' ? t('Message.Forbidden') : t('Message.IsError') }}
      </h1>
    </div>
    <Button severity="secondary" @click="router.back()">
      <font-awesome-icon icon="fa-solid fa-arrow-left" class="mr-2" />
      {{ t('Action.Back') }}
    </Button>
  </BasePage>
</template>
