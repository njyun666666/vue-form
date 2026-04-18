<script setup lang="ts">
import NodeTaskForm from './NodeTaskForm.vue'
import InputField from '@/components/UI/InputField.vue'
import { FlowButtonEnum, type FlowNode, type FlowNodeData } from '@/libs/models/FlowChart/FlowNode'
import { requiredFieldsValidator } from '@/libs/utils/zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useClipboard } from '@vueuse/core'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputText from 'primevue/inputtext'
import { useField, useForm } from 'vee-validate'
import { type Ref, inject, onMounted, ref, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'
import * as z from 'zod'

const emit = defineEmits<{
  save: [action: (e?: Event) => Promise<Promise<void> | undefined>]
  dataSend: [data: FlowNodeData]
}>()

const { t } = useI18n()
const { copy, copied } = useClipboard()
const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef')!
const node = ref<FlowNode>()
const taskFormRef = useTemplateRef<InstanceType<typeof NodeTaskForm>>('taskFormRef')

const buttonSchema = z.object({ enabled: z.boolean(), funcName: z.string() }).partial()

const schema = z
  .object({
    label: z.string().min(1, { message: t('Message.Required') }),
    task: z
      .object({
        type: z.string(),
        ownerSetting: z.string(),
        owner: z.array(z.string()),
        funcName: z.string(),
        buttons: z
          .object({
            [FlowButtonEnum.approve]: buttonSchema,
            [FlowButtonEnum.reject]: buttonSchema,
            [FlowButtonEnum.close]: buttonSchema,
            [FlowButtonEnum.return]: buttonSchema
          })
          .partial()
      })
      .partial()
      .superRefine((val, ctx) => {
        requiredFieldsValidator(val, taskFormRef.value?.fieldMode).forEach((field) => {
          ctx.addIssue({
            code: 'custom',
            message: t('Message.Required'),
            path: [`${field}`]
          })
        })
      })
  })
  .partial()

const { errors, setValues, defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(schema)
})

const [label] = defineField('label')

const buttonKeys = Object.values(FlowButtonEnum)
const buttonFields = Object.fromEntries(
  buttonKeys.map((key) => [
    key,
    {
      enabled: useField<boolean>(`task.buttons.${key}.enabled`),
      funcName: useField<string>(`task.buttons.${key}.funcName`)
    }
  ])
) as Record<
  FlowButtonEnum,
  {
    enabled: ReturnType<typeof useField<boolean>>
    funcName: ReturnType<typeof useField<string>>
  }
>

const onSubmit = handleSubmit(async (values) => {
  emit('dataSend', values as FlowNodeData)
})

onMounted(() => {
  const graphNode = dialogRef.value.data
  node.value = graphNode
  setValues({ label: graphNode.data.label, task: graphNode.data.task })
  emit('save', onSubmit)
})

defineExpose({ onSubmit })
</script>
<template>
  <form novalidate @submit="onSubmit">
    <div class="space-y-5">
      <div class="grid grid-cols-12 gap-5">
        <InputField class="col-span-full" for="nodeId" :label="$t('Flow.Node.stepId')">
          <InputGroup>
            <InputText id="nodeId" type="text" :value="node?.id" :disabled="true" />
            <InputGroupAddon class="p-0">
              <Button
                :icon="copied ? 'pi pi-check' : 'pi pi-copy'"
                severity="secondary"
                variant="text"
                v-tooltip="$t('Action.Copy')"
                @click="copy(node?.id ?? '')"
              />
            </InputGroupAddon>
          </InputGroup>
        </InputField>
      </div>

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

      <div class="space-y-3">
        <div class="text-sm font-medium">{{ $t('Flow.Node.task.buttons.title') }}</div>
        <div v-for="key in buttonKeys" :key="key" class="space-y-2">
          <div class="flex items-center gap-2">
            <Checkbox
              v-model="buttonFields[key].enabled.value.value"
              :binary="true"
              :inputId="`btn-${key}`"
            />
            <label :for="`btn-${key}`" class="cursor-pointer select-none">
              {{ $t(`Flow.Node.task.buttons.options.${key}`) }}
            </label>
          </div>
          <InputField
            v-if="buttonFields[key].enabled.value.value"
            :for="`btn-funcName-${key}`"
            :label="
              $t('Flow.Node.task.buttons.funcName', {
                name: $t(`Flow.Node.task.buttons.options.${key}`)
              })
            "
            :error="buttonFields[key].funcName.errorMessage.value"
            class="pl-6"
          >
            <InputText
              :id="`btn-funcName-${key}`"
              type="text"
              v-model.trim="buttonFields[key].funcName.value.value"
              :invalid="!!buttonFields[key].funcName.errorMessage.value"
            />
          </InputField>
        </div>
      </div>

      <NodeTaskForm ref="taskFormRef" />
    </div>
  </form>
</template>
