<script setup lang="ts">
import BasePage from '../BasePage.vue'
import type { ResponseErrors } from '@/libs/api/formAPI'
import type { OrgDeptModel, OrgDeptViewModel } from '@/libs/models/OrgDept/OrgDeptModel'
import type { QueryModel, QueryViewModel } from '@/libs/models/Query/QueryModel'
import { orgDeptService } from '@/libs/services/orgDeptService'
import { toTypedSchema } from '@vee-validate/zod'
import type { AxiosError } from 'axios'
import Button from 'primevue/button'
import Column from 'primevue/column'
import DataTable, { type DataTablePageEvent, type DataTableSortMeta } from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { z } from 'zod'

const loading = ref(false)
const first = ref(0)
const query = ref<QueryModel<OrgDeptModel>>({
  pageIndex: 0,
  pageSize: 5,
  sort: [{ field: 'deptName', order: 1 }]
})
const queryView = ref<QueryViewModel<OrgDeptViewModel[]>>()
const formSchema = z.object({
  deptName: z.string().trim()
})

const { defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    deptName: ''
  }
})

const [deptName] = defineField('deptName')

const onSubmit = handleSubmit(async (values) => {
  first.value = 0
  query.value.pageIndex = 0
  query.value.filter = values
  await fetchData()
})

const onPageChange = async (e: DataTablePageEvent) => {
  first.value = e.first
  query.value.pageSize = e.rows
  query.value.pageIndex = e.page
  await fetchData()
}

const onUpdateMultiSortMeta = async (e: DataTableSortMeta[] | null | undefined) => {
  first.value = 0
  query.value.pageIndex = 0
  query.value.sort = e ?? []
  await fetchData()
}

const fetchData = async () => {
  loading.value = true

  await orgDeptService
    .query(query.value)
    .then(async ({ data }) => {
      queryView.value = data
    })
    .catch((error: AxiosError<ResponseErrors>) => {
      console.warn(error)
    })

  loading.value = false
}
</script>
<template>
  <BasePage>
    <h1>{{ $t('Org.Dept') }}</h1>

    <form @submit="onSubmit" novalidate>
      <div class="mt-4 grid gap-4 grid-cols-3">
        <div class="flex flex-col gap-2">
          <label for="deptName">{{ $t('Org.DeptName') }}</label>
          <InputText id="deptName" v-model="deptName" aria-describedby="username-help" />
        </div>
        <div class="flex items-end">
          <div>
            <Button type="submit" :label="$t('Action.Search')" />
          </div>
        </div>
      </div>
    </form>

    <div class="mt-8">
      <DataTable
        class="w-full"
        lazy
        paginator
        sortMode="multiple"
        :first="first"
        :loading="loading"
        :value="queryView?.data"
        :rows="query.pageSize"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        :totalRecords="queryView?.count"
        :multiSortMeta="query.sort"
        selectionMode="single"
        @page="onPageChange"
        @update:multiSortMeta="onUpdateMultiSortMeta"
      >
        <Column field="deptName" :header="$t('Org.DeptName')" sortable bodyClass="!p-0">
          <template #body="{ data }">
            <RouterLink :to="{ name: 'org/dept/:deptId', params: { deptId: data.deptId } }">
              <div class="px-4 py-3 w-full">
                {{ data.deptName }}
              </div>
            </RouterLink>
          </template>
        </Column>
      </DataTable>
    </div>
  </BasePage>
</template>
