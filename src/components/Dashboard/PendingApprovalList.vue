<script setup lang="ts">
import type { PendingApprovalModel } from '@/libs/models/Form/FormModel'
import type { QueryModel } from '@/libs/models/Query/QueryModel'
import { formService } from '@/libs/services/formService'
import { FormPageAction } from '@/libs/types/FormTypes'
import { useDatatable } from '@/libs/utils/datatable'
import dayjs from 'dayjs'
import Button from 'primevue/button'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const query = ref<QueryModel<PendingApprovalModel>>({
  pageIndex: 0,
  pageSize: 10,
  sort: [{ field: 'approvalDate', order: 1 }]
})

const fetchData = async (data: QueryModel<PendingApprovalModel>) => {
  return await formService.pandingApprovalList(data).then(async ({ data }) => data)
}

const datatable = useDatatable(query, fetchData)
datatable.handleFetchData()
</script>
<template>
  <div>
    <DataTable
      class="w-full p-datatable-hoverable"
      v-bind="datatable.props.value"
      @page="datatable.onPage"
      @update:multiSortMeta="datatable.onUpdateMultiSortMeta"
    >
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">{{ $t('Form.PendingApproval.title') }}</span>
          <Button
            icon="pi pi-refresh"
            rounded
            raised
            @click="datatable.onSubmit({})"
            v-tooltip="$t('Action.Reload')"
          />
        </div>
      </template>
      <Column field="formClass" :header="$t('Form.BaseInfo.formClass')"> </Column>
      <Column field="formId" :header="$t('Form.BaseInfo.formId')">
        <template #body="{ data }">
          <RouterLink
            :to="{
              name: 'form/:formPageAction/:formClass/:formId',
              params: {
                formPageAction: FormPageAction.approval,
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
      <Column field="stepName" :header="$t('Form.PendingApproval.stepName')"> </Column>
      <Column field="arrivedDate" :header="$t('Form.PendingApproval.arrivedDate')">
        <template #body="{ data }">
          {{ dayjs(data.arrivedDate).format('YYYY/MM/DD HH:mm') }}
        </template>
      </Column>
      <Column field="description" :header="$t('Form.BaseInfo.description')">
        <template #body="{ data }">
          <div v-html="data.description"></div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
