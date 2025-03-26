<script setup lang="ts">
import NodeTaskForm from './NodeTaskForm.vue'
import InputField from '@/components/UI/InputField.vue'
import {
  type FlowNode,
  type FlowNodeData,
  FlowNodeEnum,
  OwnerSettingEnum
} from '@/libs/models/FlowChart/FlowNode'
import { requiredFieldsValidator } from '@/libs/utils/zod'
import { toTypedSchema } from '@vee-validate/zod'
import Button from 'primevue/button'
import type Dialog from 'primevue/dialog'
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import { useForm } from 'vee-validate'
import { type Ref, inject, onMounted, ref, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'
import * as z from 'zod'

const emit = defineEmits<{
  save: [action: (e?: Event) => Promise<Promise<void> | undefined>]
  dataSend: [data: FlowNodeData]
}>()
const { t } = useI18n()
const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef')!
const taskFormRef = useTemplateRef<InstanceType<typeof NodeTaskForm>>('taskFormRef')
const node = ref<FlowNode>()

const schema = z
  .object({
    label: z.string().min(1, { message: t('Message.Required') }),
    task: z
      .object({
        type: z.string(),
        ownerSetting: z.string(),
        owner: z.array(z.string()),
        funcName: z.string()
      })
      .partial()
      .superRefine((val, ctx) => {
        if (node.value?.type != FlowNodeEnum.task) return

        requiredFieldsValidator(val, taskFormRef.value?.fieldMode).forEach((field) => {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t('Message.Required'),
            path: [`${field}`]
          })
        })
      }),
    gateway: z
      .object({
        funcName: z.string()
      })
      .partial()
  })
  .partial()

const { values, errors, setValues, defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(schema)
})

const [label] = defineField('label')

const onSubmit = handleSubmit(async (values) => {
  console.log(values)
  emit('dataSend', values as FlowNodeData)
})

onMounted(() => {
  const params = dialogRef.value.data
  node.value = params
  setValues(params.data)
  emit('save', onSubmit)
})

defineExpose({
  onSubmit
})
</script>
<template>
  <form novalidate @submit="onSubmit">
    <div class="space-y-5">
      <div class="grid grid-cols-12 gap-5">
        <InputField
          class="col-span-full"
          for="label"
          :label="$t('Flow.Node.label')"
          :error="errors.label"
          :isRequired="true"
        >
          <InputText id="label" type="text" v-model.trim="label" :invalid="!!errors.label" />
        </InputField>
      </div>

      <div>
        <NodeTaskForm ref="taskFormRef" />
      </div>
    </div>
  </form>
</template>
