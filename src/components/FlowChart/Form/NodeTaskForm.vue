<script setup lang="ts">
import InputField from '@/components/UI/InputField.vue'
import { type FlowNodeData, FlowTaskEnum, OwnerSettingEnum } from '@/libs/models/FlowChart/FlowNode'
import { parseOptions } from '@/libs/utils/parse'
import { toTypedSchema } from '@vee-validate/zod'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import MultiSelect from 'primevue/multiselect'
import RadioButton from 'primevue/radiobutton'
import Select from 'primevue/select'
import { useField, useForm } from 'vee-validate'
import { type Ref, inject, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import * as z from 'zod'

const { t } = useI18n()
const field = {
  type: useField<string>('task.type'),
  ownerSetting: useField<string[]>('task.ownerSetting'),
  owner: useField<string[]>('task.owner'),
  funcName: useField<string>('task.funcName')
}

const taskOptions = parseOptions<typeof FlowTaskEnum, string>(
  FlowTaskEnum,
  'Flow.Node.task.options'
)
const ownerSettingOptions = parseOptions<typeof OwnerSettingEnum, string>(
  OwnerSettingEnum,
  'Flow.Node.task.ownerSettingOptions'
)
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

    <InputField
      class="col-span-full"
      for="label"
      :label="$t('Flow.Node.task.ownerSetting')"
      :error="field.ownerSetting.errorMessage.value"
      :isRequired="true"
    >
      <Select
        v-model="field.ownerSetting.value.value"
        :options="ownerSettingOptions"
        :invalid="!!field.ownerSetting.errorMessage.value"
        optionLabel="label"
        optionValue="value"
      />
    </InputField>

    <InputField
      class="col-span-full"
      for="label"
      :label="$t('Flow.Node.task.funcName')"
      :error="field.funcName.errorMessage.value"
      :isRequired="true"
    >
      <InputText
        id="label"
        type="text"
        v-model.trim="field.funcName.value.value"
        :invalid="!!field.funcName.errorMessage.value"
      />
    </InputField>

    <!-- <MultiSelect v-model="selectedCities" :options="cities" optionLabel="name" filter 
    class="w-full md:w-80" /> -->
  </div>
</template>
