<script setup lang="ts">
import FormActionTag from './FormActionTag.vue'
import { FormActionEnum, FormClassEnum, FormPageActionEnum } from '@/libs/enums/FormTypes'
import type { MyHandledModel } from '@/libs/models/Form/FormModel'
import type { QueryModel } from '@/libs/models/Query/QueryModel'
import { formService } from '@/libs/services/formService'
import { useDatatable } from '@/libs/utils/datatable'
import dayjs from 'dayjs'
import Button from 'primevue/button'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import DatePicker from 'primevue/datepicker'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

const { t } = useI18n()

const query = ref<QueryModel<MyHandledModel>>({
  pageIndex: 0,
  pageSize: 10,
  sort: [{ field: 'approvalTime', order: -1 }]
})

const fetchData = async (data: QueryModel<MyHandledModel>) => {
  return await formService.myHandledList(data).then(({ data }) => data)
}

const datatable = useDatatable(query, fetchData)
datatable.handleFetchData()

const formClassOptions = computed(() =>
  Object.values(FormClassEnum).map((value) => ({ label: t(`Form.Class.${value}`), value }))
)

const actionLabelMap: Record<FormActionEnum, string> = {
  [FormActionEnum.application]: 'Action.Application',
  [FormActionEnum.approve]: 'Action.Approve',
  [FormActionEnum.reject]: 'Action.Reject',
  [FormActionEnum.return]: 'Action.Return',
  [FormActionEnum.recall]: 'Action.Recall',
  [FormActionEnum.draft]: 'Action.Draft',
  [FormActionEnum.close]: 'Action.Close'
}

const actionOptions = computed(() =>
  Object.values(FormActionEnum)
    .filter(
      (value) =>
        value !== FormActionEnum.application &&
        value !== FormActionEnum.draft &&
        value !== FormActionEnum.close
    )
    .map((value) => ({ label: t(actionLabelMap[value]), value }))
)

const filterFormClass = ref<string | null>(null)
const filterFormId = ref('')
const filterAction = ref<string | null>(null)
const filterApprovalTimeRange = ref<(Date | null)[] | null>(null)

const handleSearch = () => {
  const filter: Partial<MyHandledModel> = {}
  if (filterFormClass.value) filter.formClass = filterFormClass.value
  if (filterFormId.value) filter.formId = filterFormId.value
  if (filterAction.value) filter.action = filterAction.value as MyHandledModel['action']
  if (filterApprovalTimeRange.value?.[0]) filter.approvalTimeFrom = filterApprovalTimeRange.value[0]
  if (filterApprovalTimeRange.value?.[1]) filter.approvalTimeTo = filterApprovalTimeRange.value[1]
  datatable.onSubmit(filter as MyHandledModel)
}

const handleReset = () => {
  filterFormClass.value = null
  filterFormId.value = ''
  filterAction.value = null
  filterApprovalTimeRange.value = null
  datatable.onSubmit({} as MyHandledModel)
}
</script>

<template>
  <div>
    <DataTable
      class="p-datatable-hoverable w-full"
      v-bind="datatable.props.value"
      @page="datatable.onPage"
      @update:multiSortMeta="datatable.onUpdateMultiSortMeta"
    >
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">{{ $t('Form.MyHandled.title') }}</span>
          <Button
            icon="pi pi-refresh"
            rounded
            raised
            @click="datatable.onSubmit({})"
            v-tooltip="$t('Action.Reload')"
          />
        </div>
        <div class="mt-3 flex flex-wrap items-end gap-3">
          <div class="flex flex-col gap-1">
            <label class="text-xs text-surface-500">{{ $t('Form.BaseInfo.formClass') }}</label>
            <Select
              v-model="filterFormClass"
              :options="formClassOptions"
              optionLabel="label"
              optionValue="value"
              :placeholder="$t('Form.BaseInfo.formClass')"
              showClear
              class="w-36"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-xs text-surface-500">{{ $t('Form.BaseInfo.formId') }}</label>
            <InputText v-model="filterFormId" class="w-36" />
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-xs text-surface-500">{{ $t('Form.ApprovalHistory.result') }}</label>
            <Select
              v-model="filterAction"
              :options="actionOptions"
              optionLabel="label"
              optionValue="value"
              :placeholder="$t('Form.ApprovalHistory.result')"
              showClear
              class="w-36"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-xs text-surface-500">{{
              $t('Form.ApprovalHistory.approvalTime')
            }}</label>
            <DatePicker
              v-model="filterApprovalTimeRange"
              selectionMode="range"
              :manualInput="false"
              showButtonBar
              dateFormat="yy/mm/dd"
              class="w-56"
            />
          </div>
          <div class="flex gap-2 pb-0.5">
            <Button :label="$t('Action.Search')" icon="pi pi-search" @click="handleSearch" />
            <Button
              :label="$t('Action.Reset')"
              icon="pi pi-times"
              severity="secondary"
              @click="handleReset"
            />
          </div>
        </div>
      </template>
      <Column field="formClass" :header="$t('Form.BaseInfo.formClass')">
        <template #body="{ data }">
          {{ $t(`Form.Class.${data.formClass}`) }}
        </template>
      </Column>
      <Column field="formId" :header="$t('Form.BaseInfo.formId')">
        <template #body="{ data }">
          <RouterLink
            :to="{
              name: 'form-detail-id',
              params: {
                formPageAction: FormPageActionEnum.info,
                formClass: data.formClass,
                formId: data.formId
              }
            }"
            class="a"
          >
            {{ data.formId }}
          </RouterLink>
        </template>
      </Column>
      <Column field="stepName" :header="$t('Form.PendingApproval.stepName')" />
      <Column field="action" :header="$t('Form.ApprovalHistory.result')">
        <template #body="{ data }">
          <FormActionTag v-if="data.action" :result="data.action" />
        </template>
      </Column>
      <Column field="comment" :header="$t('Form.ApprovalHistory.comment')" />
      <Column field="approvalTime" :header="$t('Form.ApprovalHistory.approvalTime')">
        <template #body="{ data }">
          {{ dayjs(data.approvalTime).format('YYYY/MM/DD HH:mm') }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
