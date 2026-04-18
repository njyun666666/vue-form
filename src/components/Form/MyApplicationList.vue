<script setup lang="ts">
import FormStatusBadge from './FormStatusBadge.vue'
import { FormPageActionEnum } from '@/libs/enums/FormTypes'
import type { MyApplicationModel } from '@/libs/models/Form/FormModel'
import type { QueryModel } from '@/libs/models/Query/QueryModel'
import { formService } from '@/libs/services/formService'
import { useDatatable } from '@/libs/utils/datatable'
import dayjs from 'dayjs'
import Button from 'primevue/button'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const query = ref<QueryModel<MyApplicationModel>>({
  pageIndex: 0,
  pageSize: 10,
  sort: [{ field: 'applicationDate', order: -1 }]
})

const fetchData = async (data: QueryModel<MyApplicationModel>) => {
  return await formService.myApplicationList(data).then(({ data }) => data)
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
          <span class="text-xl font-bold">{{ $t('Form.MyApplications.title') }}</span>
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
                formPageAction:
                  data.status === 'draft'
                    ? FormPageActionEnum.application
                    : FormPageActionEnum.info,
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
      <Column field="status" :header="$t('Form.BaseInfo.status')">
        <template #body="{ data }">
          <FormStatusBadge v-if="data.status" :status="data.status" />
        </template>
      </Column>
      <Column field="applicationDate" :header="$t('Form.BaseInfo.applicationDate')">
        <template #body="{ data }">
          {{ dayjs(data.applicationDate).format('YYYY/MM/DD HH:mm') }}
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
