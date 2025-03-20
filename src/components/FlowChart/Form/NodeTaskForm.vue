<script setup lang="ts">
import InputField from '@/components/UI/InputField.vue'
import { type FlowNodeData, FlowTaskEnum } from '@/libs/models/FlowChart/FlowNode'
import { parseOptions } from '@/libs/utils/parse'
import { toTypedSchema } from '@vee-validate/zod'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import { useField, useForm } from 'vee-validate'
import { type Ref, inject, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import * as z from 'zod'

const { t } = useI18n()
const field = {
  type: useField<string>('task.type'),
  owner: useField<string[]>('task.owner')
}

const taskOptions = parseOptions(FlowTaskEnum, 'Flow.Node.task.options')
</script>
<template>
  <div class="grid grid-cols-12 gap-5">
    <InputField
      class="col-span-full"
      for="label"
      :label="$t('Flow.Node.task.type')"
      :error="field.type.errorMessage.value"
      :isRequired="true"
    >
      <Select
        v-model="field.type.value.value"
        :options="taskOptions"
        :invalid="!!field.type.errorMessage.value"
        optionLabel="label"
        optionValue="value"
      />
    </InputField>
  </div>
</template>
