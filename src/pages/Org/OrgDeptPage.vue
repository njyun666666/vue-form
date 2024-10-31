<script setup lang="ts">
import BasePage from '../BasePage.vue'
import type { OrgDeptModel } from '@/libs/models/OrgDept/OrgDeptModel'
import type { QueryModel } from '@/libs/models/Query/QueryModel'
import { orgDeptService } from '@/libs/services/orgDeptService'
import { useDatatable } from '@/libs/utils/datatable'
import { toTypedSchema } from '@vee-validate/zod'
import Button from 'primevue/button'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { z } from 'zod'

const query = ref<QueryModel<OrgDeptModel>>({
  pageIndex: 0,
  pageSize: 5,
  sort: [{ field: 'deptName', order: 1 }]
})

const fetchData = async (data: QueryModel<OrgDeptModel>) => {
  return await orgDeptService.query(data).then(async ({ data }) => data)
}

const datatable = useDatatable(query, fetchData)

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
  await datatable.onSubmit(values)
})
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
            <Button type="submit">
              <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
              {{ $t('Action.Search') }}
            </Button>
          </div>
        </div>
      </div>
    </form>

    <div class="mt-8">
      <DataTable
        class="w-full"
        v-bind="datatable.props.value"
        @page="datatable.onPage"
        @update:multiSortMeta="datatable.onUpdateMultiSortMeta"
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
