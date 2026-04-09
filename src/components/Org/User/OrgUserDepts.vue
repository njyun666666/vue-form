<script setup lang="ts">
import RequiredMark from '@/components/Common/RequiredMark.vue'
import InputField from '@/components/UI/InputField.vue'
import { OrgUserDeptModel } from '@/libs/models/OrgUser/OrgUserDeptModel'
import { optionService } from '@/libs/services/optionService'
import { useQuery } from '@tanstack/vue-query'
import Button from 'primevue/button'
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
const editingRows = computed(() => fieldArray.fields.value.map((f) => f.value.guid))

const getError = (index: number, field: string) =>
  (form.errors.value as Record<string, string>)[`userDepts[${index}].${field}`]

function add() {
  fieldArray.push(new OrgUserDeptModel({ isPrimary: fieldArray.fields.value.length === 0 }))
}

function remove(index: number) {
  fieldArray.remove(index)
  // If removed row was primary, promote first remaining row
  if (fieldArray.fields.value.length > 0) {
    const hasPrimary = fieldArray.fields.value.some((f) => f.value.isPrimary)
    if (!hasPrimary) {
      const first = fieldArray.fields.value[0].value
      fieldArray.update(0, new OrgUserDeptModel({ ...first, isPrimary: true }))
    }
  }
}

function setPrimary(index: number) {
  fieldArray.fields.value.forEach((f, idx) => {
    fieldArray.update(idx, new OrgUserDeptModel({ ...f.value, isPrimary: idx === index }))
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
      :value="fieldArray.fields.value"
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
        <template #editor="{ data, index }">
          <div class="flex justify-center">
            <RadioButton
              :modelValue="data.value.isPrimary"
              :value="true"
              @update:modelValue="setPrimary(index)"
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
        <template #editor="{ data, index }">
          <InputField :error="getError(index, 'deptId')">
            <Select
              v-model="data.value.deptId"
              :options="deptOptions ?? []"
              optionLabel="label"
              optionValue="value"
              :loading="deptOptionsLoading"
              :invalid="!!getError(index, 'deptId')"
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
        <template #editor="{ data, index }">
          <InputField :error="getError(index, 'jobTitleId')">
            <Select
              v-model="data.value.jobTitleId"
              :options="jobTitleOptions ?? []"
              optionLabel="label"
              optionValue="value"
              :loading="jobTitleOptionsLoading"
              :invalid="!!getError(index, 'jobTitleId')"
              showClear
              class="w-full"
              :placeholder="$t('Org.JobTitle')"
            />
          </InputField>
        </template>
      </Column>

      <!-- Delete -->
      <Column class="text-center!" bodyClass="content-start">
        <template #body="{ index }">
          <Button
            icon="pi pi-trash"
            rounded
            severity="secondary"
            @click="remove(index)"
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
