<script setup lang="ts">
import { FormStatusEnum } from '@/libs/enums/FormTypes'
import Tag from 'primevue/tag'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{ status: FormStatusEnum }>()
const { t } = useI18n()

const severity = computed(() => {
  if (props.status === FormStatusEnum.approved) return 'success'
  if (props.status === FormStatusEnum.rejected) return 'danger'
  if (props.status === FormStatusEnum.pending) return 'warn'
  if (props.status === FormStatusEnum.returned) return 'warn'
  return 'secondary'
})

const label = computed(() => t(`Form.Status.${props.status}`))
</script>

<template>
  <Tag :severity="severity" :value="label" />
</template>
