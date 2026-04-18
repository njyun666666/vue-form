<script setup lang="ts">
import { FormActionEnum } from '@/libs/enums/FormTypes'
import Tag from 'primevue/tag'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{ result: FormActionEnum }>()
const { t } = useI18n()

const severity = computed(() => {
  if (props.result === FormActionEnum.approve) return 'success'
  if (props.result === FormActionEnum.reject) return 'danger'
  if (props.result === FormActionEnum.return) return 'warn'
  if (props.result === FormActionEnum.recall) return 'secondary'
  if (props.result === FormActionEnum.draft) return 'secondary'
  if (props.result === FormActionEnum.close) return 'contrast'
  return 'info'
})

const label = computed(() => {
  if (props.result === FormActionEnum.approve) return t('Action.Approve')
  if (props.result === FormActionEnum.reject) return t('Action.Reject')
  if (props.result === FormActionEnum.return) return t('Action.Return')
  if (props.result === FormActionEnum.recall) return t('Action.Recall')
  if (props.result === FormActionEnum.draft) return t('Action.Draft')
  if (props.result === FormActionEnum.close) return t('Action.Close')
  return t('Action.Application')
})
</script>

<template>
  <Tag :severity="severity" :value="label" />
</template>
