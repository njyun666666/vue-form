<script setup lang="ts">
import GatewayConditionList from './GatewayConditionList.vue'
import InputField from '@/components/UI/InputField.vue'
import { type FlowNode, type FlowNodeData } from '@/libs/models/FlowChart/FlowNode'
import { GatewayConditionTypeEnum } from '@/libs/models/FlowChart/FlowNode'
import { toTypedSchema } from '@vee-validate/zod'
import { useClipboard } from '@vueuse/core'
import Button from 'primevue/button'
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputText from 'primevue/inputtext'
import { useForm } from 'vee-validate'
import { type Ref, inject, onMounted, ref } from 'vue'
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
const targetNodes = ref<Array<{ id: string; label: string }>>([])

const conditionSchema = z
  .object({
    name: z.string().optional(),
    type: z.string().optional(),
    funcName: z.string().optional(),
    targetNodeId: z.string().optional()
  })
  .superRefine((val, ctx) => {
    if (!val.type) {
      ctx.addIssue({ code: 'custom', message: t('Message.Required'), path: ['type'] })
    }
    if (val.type === GatewayConditionTypeEnum.func && !val.funcName?.trim()) {
      ctx.addIssue({ code: 'custom', message: t('Message.Required'), path: ['funcName'] })
    }
  })

const schema = z
  .object({
    label: z.string().min(1, { message: t('Message.Required') }),
    gateway: z
      .object({
        conditions: z.array(conditionSchema)
      })
      .optional()
  })
  .partial()

const form = useForm({ validationSchema: toTypedSchema(schema) })
const { errors, defineField, handleSubmit } = form
const [label] = defineField('label')

const onSubmit = handleSubmit(async (values) => {
  emit('dataSend', values as FlowNodeData)
})

onMounted(() => {
  const graphNode = dialogRef.value.data
  node.value = graphNode
  targetNodes.value = graphNode.targetNodes ?? []
  form.setValues({
    label: graphNode.data.label,
    gateway: graphNode.data.gateway
  })
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

      <GatewayConditionList :targetNodes="targetNodes" />
    </div>
  </form>
</template>
