<script setup lang="ts">
import RequiredMark from '@/components/Common/RequiredMark.vue'
import InputField from '@/components/UI/InputField.vue'
import { OrgUserDeptModel } from '@/libs/models/OrgUser/OrgUserDeptModel'
import { optionService } from '@/libs/services/optionService'
import { useQuery } from '@tanstack/vue-query'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import RadioButton from 'primevue/radiobutton'
import Select from 'primevue/select'
import { type FormContext, useFieldArray } from 'vee-validate'
import { computed, inject } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const form = inject<FormContext>('form')!
const fieldArray = useFieldArray<OrgUserDeptModel>('userDepts')

const visibleFields = computed(() =>
  fieldArray.fields.value
    .map((f, i) => ({ ...f, originalIndex: i }))
    .filter((f) => !f.value.isDeleted)
)
const editingRows = computed(() => visibleFields.value.map((f) => f.value.guid))

const getError = (originalIndex: number, field: string) =>
  (form.errors.value as Record<string, string>)[`userDepts[${originalIndex}].${field}`]

function add() {
  const hasActive = fieldArray.fields.value.some((f) => !f.value.isDeleted)
  fieldArray.push(new OrgUserDeptModel({ isPrimary: !hasActive }))
}

function remove(originalIndex: number) {
  const item = fieldArray.fields.value[originalIndex].value
  const wasPrimary = item.isPrimary
  fieldArray.update(originalIndex, new OrgUserDeptModel({ ...item, isDeleted: true }))
  if (wasPrimary) {
    const firstIdx = fieldArray.fields.value.findIndex(
      (f, i) => i !== originalIndex && !f.value.isDeleted
    )
    if (firstIdx !== -1) {
      const first = fieldArray.fields.value[firstIdx].value
      fieldArray.update(firstIdx, new OrgUserDeptModel({ ...first, isPrimary: true }))
    }
  }
}

function setPrimary(originalIndex: number) {
  fieldArray.fields.value.forEach((f, idx) => {
    if (f.value.isDeleted) return
    fieldArray.update(idx, new OrgUserDeptModel({ ...f.value, isPrimary: idx === originalIndex }))
  })
}

const { data: deptOptions, isFetching: deptOptionsLoading } = useQuery({
  queryKey: [optionService.deptUrl],
  queryFn: () => optionService.dept({}).then(({ data }) => data),
  staleTime: 5 * 60 * 1000
})

const { data: jobTitleOptions, isFetching: jobTitleOptionsLoading } = useQuery({
  queryKey: [optionService.jobTitleUrl],
  queryFn: () => optionService.jobTitle().then(({ data }) => data),
  staleTime: 5 * 60 * 1000
})
</script>

<template>
  <div>
    <DataTable
      v-model:editingRows="editingRows"
      :value="visibleFields"
      editMode="row"
      dataKey="guid"
    >
      <template #header>
        <div class="flex flex-wrap items-center gap-2">
          <RequiredMark />
          <span class="text-lg font-bold">{{ $t('Org.UserDepts') }}</span>
          <div class="grow"></div>
          <Button icon="pi pi-plus" rounded @click="add" v-tooltip="$t('Action.Add')" />
        </div>
      </template>

      <!-- isPrimary -->
      <Column field="isPrimary" bodyClass="content-start w-[100px]">
        <template #header>
          <span>{{ $t('Org.IsPrimary') }}</span>
        </template>
        <template #editor="{ data }">
          <div class="flex justify-center">
            <RadioButton
              :modelValue="data.value.isPrimary"
              :value="true"
              @update:modelValue="setPrimary(data.originalIndex)"
              :inputId="`isPrimary-${data.value.guid}`"
            />
          </div>
        </template>
      </Column>

      <!-- deptId -->
      <Column field="deptId" bodyClass="content-start min-w-[200px]">
        <template #header>
          <RequiredMark />
          <span>{{ $t('Org.Dept') }}</span>
        </template>
        <template #editor="{ data }">
          <InputField :error="getError(data.originalIndex, 'deptId')">
            <Select
              v-model="data.value.deptId"
              :options="deptOptions ?? []"
              optionLabel="label"
              optionValue="value"
              :loading="deptOptionsLoading"
              :invalid="!!getError(data.originalIndex, 'deptId')"
              showClear
              class="w-full"
              :placeholder="$t('Org.Dept')"
            />
          </InputField>
        </template>
      </Column>

      <!-- jobTitleId -->
      <Column field="jobTitleId" bodyClass="content-start min-w-[200px]">
        <template #header>
          <RequiredMark />
          <span>{{ $t('Org.JobTitle') }}</span>
        </template>
        <template #editor="{ data }">
          <InputField :error="getError(data.originalIndex, 'jobTitleId')">
            <Select
              v-model="data.value.jobTitleId"
              :options="jobTitleOptions ?? []"
              optionLabel="label"
              optionValue="value"
              :loading="jobTitleOptionsLoading"
              :invalid="!!getError(data.originalIndex, 'jobTitleId')"
              showClear
              class="w-full"
              :placeholder="$t('Org.JobTitle')"
            />
          </InputField>
        </template>
      </Column>

      <!-- isDeptManager -->
      <Column field="isDeptManager" bodyClass="content-start">
        <template #header>
          <span>{{ $t('Org.DeptManager') }}</span>
        </template>
        <template #editor="{ data }">
          <div class="flex justify-center">
            <Checkbox v-model="data.value.isDeptManager" :binary="true" />
          </div>
        </template>
      </Column>

      <!-- Delete -->
      <Column class="text-center!" bodyClass="content-start">
        <template #body="{ data }">
          <Button
            icon="pi pi-trash"
            rounded
            severity="secondary"
            @click="remove(data.originalIndex)"
            v-tooltip="$t('Action.Remove')"
          />
        </template>
      </Column>
    </DataTable>

    <small class="text-error">
      {{ form.errors.value.userDepts }}
    </small>
  </div>
</template>
