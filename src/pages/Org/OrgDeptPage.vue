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
import type { ColumnProps } from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import DataTable from 'primevue/datatable'
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import Row from 'primevue/row'
import { useForm } from 'vee-validate'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { z } from 'zod'

const { t } = useI18n()
const loading = ref(false)
const multiSortMeta = ref()
const query = ref<QueryModel<OrgDeptModel>>({
  pageIndex: 0,
  pageSize: 5,
  sort: [{ field: 'deptName', order: 1 }]
})
const queryView = ref<QueryViewModel<OrgDeptViewModel[]>>()
const formSchema = z.object({
  deptName: z.string().trim()
})

const { defineField, handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    deptName: ''
  }
})

const [deptName] = defineField('deptName')

const onSubmit = handleSubmit(async (values) => {
  console.log(values)
  query.value.filter = values

  // errorMessage.value = undefined
})

watch(
  () => query,
  async () => {
    loading.value = true

    await orgDeptService
      .query(query.value)
      .then(async ({ data }) => {
        queryView.value = data
      })
      .catch((error: AxiosError<ResponseErrors>) => {
        // errorMessage.value = error.response!.data
      })

    loading.value = false
  },
  {
    deep: true
  }
)
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
        :loading="loading"
        :value="queryView?.data"
        :rows="query.pageSize"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        :totalRecords="queryView?.count"
        :multiSortMeta="query.sort"
        @page="
          (e) => {
            query.pageSize = e.rows
            query.pageIndex = e.page
          }
        "
        @update:multiSortMeta="
          (e) => {
            query.sort = e ?? []
          }
        "
      >
        <Column field="deptId" header="deptId" sortable>
          <template #body="{ data }">
            {{ data.deptId }}
          </template>
        </Column>
        <Column field="deptName" :header="$t('Org.DeptName')" sortable></Column>
      </DataTable>
    </div>
  </BasePage>
</template>
