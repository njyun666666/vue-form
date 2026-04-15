<script setup lang="ts">
import InputField from '@/components/UI/InputField.vue'
import { type GatewayCondition, GatewayConditionTypeEnum } from '@/libs/models/FlowChart/FlowNode'
import { parseOptions } from '@/libs/utils/parse'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import { useFieldArray, useFormContext } from 'vee-validate'

defineProps<{
  targetNodes: Array<{ id: string; label: string }>
}>()

const conditionTypeOptions = parseOptions<typeof GatewayConditionTypeEnum, string>(
  GatewayConditionTypeEnum,
  'Flow.Node.gateway.conditions.typeOptions'
)

const { errors } = useFormContext()
const { fields, push, remove, move } = useFieldArray<GatewayCondition>('gateway.conditions')

const addCondition = () => push({})

const onConditionTypeChange = (index: number) => {
  if (fields.value[index].value.type !== GatewayConditionTypeEnum.func) {
    fields.value[index].value.funcName = ''
  }
}

const getConditionError = (index: number, field: string): string | undefined =>
  (errors.value as Record<string, string | undefined>)[`gateway.conditions[${index}].${field}`]
</script>

<template>
  <div class="space-y-3">
    <div class="flex items-center justify-between">
      <span class="text-sm font-medium">{{ $t('Flow.Node.gateway.conditions.title') }}</span>
      <Button
        icon="pi pi-plus"
        :label="$t('Flow.Node.gateway.conditions.add')"
        size="small"
        severity="secondary"
        variant="outlined"
        @click="addCondition"
      />
    </div>

    <div v-for="(field, index) in fields" :key="field.key" class="rounded-md border p-3">
      <div class="mb-2 flex items-center justify-between">
        <span class="text-muted-color text-xs">{{ index + 1 }}</span>
        <div class="flex items-center gap-1">
          <Button
            icon="pi pi-arrow-up"
            severity="secondary"
            variant="text"
            size="small"
            :disabled="index === 0"
            @click="move(index, index - 1)"
          />
          <Button
            icon="pi pi-arrow-down"
            severity="secondary"
            variant="text"
            size="small"
            :disabled="index === fields.length - 1"
            @click="move(index, index + 1)"
          />
          <Button
            icon="pi pi-trash"
            severity="danger"
            variant="text"
            size="small"
            @click="remove(index)"
          />
        </div>
      </div>

      <div class="grid grid-cols-4 gap-x-4 gap-y-3">
        <InputField :for="`cond-name-${index}`" :label="$t('Flow.Node.gateway.conditions.name')">
          <InputText :id="`cond-name-${index}`" v-model.trim="field.value.name" />
        </InputField>

        <InputField
          :for="`cond-type-${index}`"
          :label="$t('Flow.Node.gateway.conditions.type')"
          :error="getConditionError(index, 'type')"
          :isRequired="true"
        >
          <Select
            :id="`cond-type-${index}`"
            v-model="field.value.type"
            :options="conditionTypeOptions"
            :invalid="!!getConditionError(index, 'type')"
            optionLabel="label"
            optionValue="value"
            @change="onConditionTypeChange(index)"
          />
        </InputField>

        <InputField
          v-if="field.value.type === GatewayConditionTypeEnum.func"
          :for="`cond-funcName-${index}`"
          :label="$t('Flow.Node.gateway.conditions.funcName')"
          :error="getConditionError(index, 'funcName')"
          :isRequired="true"
        >
          <InputText
            :id="`cond-funcName-${index}`"
            v-model.trim="field.value.funcName"
            :invalid="!!getConditionError(index, 'funcName')"
          />
        </InputField>

        <InputField
          :for="`cond-target-${index}`"
          :label="$t('Flow.Node.gateway.conditions.targetNode')"
        >
          <Select
            :id="`cond-target-${index}`"
            v-model="field.value.targetNodeId"
            :options="targetNodes"
            optionLabel="label"
            optionValue="id"
          />
        </InputField>
      </div>
    </div>
  </div>
</template>
