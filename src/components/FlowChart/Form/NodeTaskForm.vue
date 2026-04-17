<script setup lang="ts">
import InputField from '@/components/UI/InputField.vue'
import OrgSelector from '@/components/UI/OrgSelector.vue'
import { FormFieldModeEnum } from '@/libs/enums/FormTypes'
import { FlowTaskEnum, OwnerSettingEnum } from '@/libs/models/FlowChart/FlowNode'
import { parseOptions } from '@/libs/utils/parse'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import { useField } from 'vee-validate'
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const field = {
  type: useField<string>('task.type'),
  ownerSetting: useField<string>('task.ownerSetting'),
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

const fieldMode = computed(() => {
  const mode: Record<string, FormFieldModeEnum> = {
    type: FormFieldModeEnum.required,
    ownerSetting: FormFieldModeEnum.invisibility,
    owner: FormFieldModeEnum.invisibility,
    funcName: FormFieldModeEnum.invisibility
  }

  if (!hrTypes.includes(field.type.value.value as FlowTaskEnum)) return mode

  mode.ownerSetting = FormFieldModeEnum.required

  if (field.ownerSetting.value.value === OwnerSettingEnum.hr) {
    mode.owner = FormFieldModeEnum.required
  } else if (field.ownerSetting.value.value === OwnerSettingEnum.func) {
    mode.funcName = FormFieldModeEnum.required
  }

  return mode
})

const orgSelectorProps = computed(() => ({
  user: field.type.value.value === FlowTaskEnum.user,
  dept: field.type.value.value === FlowTaskEnum.dept,
  role: field.type.value.value === FlowTaskEnum.role
}))

const hrTypes = [FlowTaskEnum.user, FlowTaskEnum.dept, FlowTaskEnum.role]

watch(
  () => field.type.value.value,
  (type) => {
    if (!hrTypes.includes(type as FlowTaskEnum)) {
      field.ownerSetting.value.value = ''
      field.owner.value.value = []
      field.funcName.value.value = ''
    }
  }
)

watch(
  () => field.ownerSetting.value.value,
  (ownerSetting) => {
    if (ownerSetting !== OwnerSettingEnum.hr) {
      field.owner.value.value = []
    }
    if (ownerSetting !== OwnerSettingEnum.func) {
      field.funcName.value.value = ''
    }
  }
)

defineExpose({
  fieldMode
})
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
      v-if="fieldMode.ownerSetting !== FormFieldModeEnum.invisibility"
      class="col-span-full"
      for="ownerSetting"
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
      v-if="fieldMode.owner !== FormFieldModeEnum.invisibility"
      class="col-span-full"
      for="owner"
      :label="$t('Flow.Node.task.owner')"
      :error="field.owner.errorMessage.value"
      :isRequired="true"
    >
      <OrgSelector
        v-model="field.owner.value.value"
        v-bind="orgSelectorProps"
        multiple
        :invalid="!!field.owner.errorMessage.value"
      />
    </InputField>

    <InputField
      v-if="fieldMode.funcName !== FormFieldModeEnum.invisibility"
      class="col-span-full"
      for="funcName"
      :label="$t('Flow.Node.task.funcName')"
      :error="field.funcName.errorMessage.value"
      :isRequired="true"
    >
      <InputText
        id="funcName"
        type="text"
        v-model.trim="field.funcName.value.value"
        :invalid="!!field.funcName.errorMessage.value"
      />
    </InputField>
  </div>
</template>
