<script setup lang="ts">
import InputField from '@/components/UI/InputField.vue'
import type { FlowListItem } from '@/libs/models/Flow/FlowModel'
import { toTypedSchema } from '@vee-validate/zod'
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import InputText from 'primevue/inputtext'
import { useForm } from 'vee-validate'
import { type Ref, inject, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import * as z from 'zod'

const emit = defineEmits<{
  save: [action: (e?: Event) => Promise<Promise<void> | undefined>]
  dataSend: [data: FlowListItem]
}>()

const { t } = useI18n()
const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef')!

const schema = z.object({
  flowId: z.string().min(1, { message: t('Message.Required') }),
  flowName: z.string().min(1, { message: t('Message.Required') })
})

const { errors, setValues, defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(schema)
})

const [flowId] = defineField('flowId')
const [flowName] = defineField('flowName')

const onSubmit = handleSubmit(async (values) => {
  emit('dataSend', { ...dialogRef.value.data, flowId: values.flowId, flowName: values.flowName })
})

onMounted(() => {
  const data: FlowListItem = dialogRef.value.data
  setValues({ flowId: data?.flowId ?? '', flowName: data?.flowName ?? '' })
  emit('save', onSubmit)
})

defineExpose({ onSubmit })
</script>
<template>
  <form novalidate @submit="onSubmit">
    <div class="space-y-5">
      <InputField for="flowId" :label="$t('Flow.FlowId')" :error="errors.flowId" :isRequired="true">
        <InputText id="flowId" v-model.trim="flowId" :invalid="!!errors.flowId" />
      </InputField>

      <InputField
        for="flowName"
        :label="$t('Flow.FlowName')"
        :error="errors.flowName"
        :isRequired="true"
      >
        <InputText id="flowName" v-model.trim="flowName" :invalid="!!errors.flowName" />
      </InputField>
    </div>
  </form>
</template>
