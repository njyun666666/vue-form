<script setup lang="ts">
import FormActionTag from './FormActionTag.vue'
import { FormPageActionEnum } from '@/libs/enums/FormTypes'
import type { MyHandledModel } from '@/libs/models/Form/FormModel'
import type { QueryModel } from '@/libs/models/Query/QueryModel'
import { formService } from '@/libs/services/formService'
import { useDatatable } from '@/libs/utils/datatable'
import dayjs from 'dayjs'
import Button from 'primevue/button'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

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
