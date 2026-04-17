<script setup lang="ts">
import BasePage from '../BasePage.vue'
import type { FlowListItem } from '@/libs/models/Flow/FlowModel'
import type { QueryModel } from '@/libs/models/Query/QueryModel'
import { flowService } from '@/libs/services/flowService'
import { useDatatable } from '@/libs/utils/datatable'
import Button from 'primevue/button'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

const query = ref<QueryModel<FlowListItem>>({
  pageIndex: 0,
  pageSize: 10,
  sort: [{ field: 'modifiedAt', order: -1 }]
})

const fetchData = async (data: QueryModel<FlowListItem>) => {
  return await flowService.list(data).then(async ({ data }) => data)
}

const datatable = useDatatable(query, fetchData)
datatable.handleFetchData()
</script>
<template>
  <BasePage>
    <div class="flex items-center justify-between">
      <h1>{{ $t('Page.FlowList') }}</h1>
      <Button
        icon="pi pi-plus"
        :label="$t('Flow.New')"
        @click="router.push({ name: 'flow-new' })"
      />
    </div>

    <div class="mt-4">
      <DataTable
        class="w-full"
        v-bind="datatable.props.value"
        @page="datatable.onPage"
        @update:multiSortMeta="datatable.onUpdateMultiSortMeta"
      >
        <Column field="flowId" :header="$t('Flow.FlowId')">
          <template #body="{ data }">
            <RouterLink
              :to="{
                name: 'flow-edit',
                params: {
                  flowId: data.flowId
                }
              }"
              class="a"
            >
              {{ data.flowId }}
            </RouterLink>
          </template>
        </Column>
        <Column field="flowName" :header="$t('Flow.FlowName')" />
        <Column field="modifiedAt" :header="$t('Flow.ModifiedAt')" />
        <Column field="modifiedBy" :header="$t('Flow.ModifiedBy')" />
      </DataTable>
    </div>
  </BasePage>
</template>
