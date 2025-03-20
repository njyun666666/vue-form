<script setup lang="ts">
import NodeTaskForm from './NodeTaskForm.vue'
import InputField from '@/components/UI/InputField.vue'
import type { FlowNodeData } from '@/libs/models/FlowChart/FlowNode'
import { toTypedSchema } from '@vee-validate/zod'
import type Dialog from 'primevue/dialog'
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import { useForm } from 'vee-validate'
import { type Ref, inject, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import * as z from 'zod'

const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef')!
const { t } = useI18n()

const schema = z
  .object({
    label: z.string().min(1, { message: t('Message.Required') }),
    task: z.object({
      type: z.string(),
      owner: z.array(z.string())
    }),
    gateway: z.object({
      funcName: z.string()
    })
  })
  .partial()

const { values, errors, setValues, defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(schema)
})

const [label] = defineField('label')

const onSubmit = handleSubmit(async (values) => {
  console.log(values)
})

onMounted(() => {
  const params = dialogRef.value.data
  setValues(params)
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
        <NodeTaskForm />
      </div>
    </div>
  </form>
</template>
