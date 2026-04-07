<script setup lang="ts">
import BasePage from '../BasePage.vue'
import InputField from '@/components/UI/InputField.vue'
import type { OrgUserQuery } from '@/libs/models/OrgUser/OrgUserQuery'
import type { QueryModel } from '@/libs/models/Query/QueryModel'
import { optionService } from '@/libs/services/optionService'
import { orgUserService } from '@/libs/services/orgUserService'
import { useDatatable } from '@/libs/utils/datatable'
import { useQuery } from '@tanstack/vue-query'
import Button from 'primevue/button'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import { useForm } from 'vee-validate'
import { onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { z } from 'zod'

const router = useRouter()

const query = ref<QueryModel<OrgUserQuery>>({
  pageIndex: 0,
  pageSize: 10,
  sort: [{ field: 'employeeId', order: 1 }]
})

const fetchData = async (data: QueryModel<OrgUserQuery>) => {
  return await orgUserService.query(data).then(({ data }) => data)
}

const datatable = useDatatable(query, fetchData)

const formSchema = z.object({
  employeeId: z.string().trim(),
  userName: z.string().trim(),
  deptId: z.string().trim().nullable()
})

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: formSchema,
  initialValues: {
    employeeId: '',
    userName: '',
    deptId: null
  }
})

const [employeeId] = defineField('employeeId')
const [userName] = defineField('userName')
const [deptId] = defineField('deptId')

const { data: deptOptions, isFetching: deptOptionsLoading } = useQuery({
  queryKey: [optionService.deptUrl],
  queryFn: () => optionService.dept({}).then(({ data }) => data),
  staleTime: 5 * 60 * 1000
})

const onSubmit = handleSubmit(async (values) => {
  await datatable.onSubmit(values)
})

onMounted(() => datatable.handleFetchData())
</script>
<template>
  <BasePage>
    <h1>{{ $t('Org.User') }}</h1>

    <form novalidate @submit="onSubmit">
      <div class="mt-4 grid grid-cols-4 gap-4">
        <InputField for="employeeId" :label="$t('Org.EmployeeId')" :error="errors.employeeId">
          <InputText id="employeeId" v-model="employeeId" />
        </InputField>
        <InputField for="userName" :label="$t('Org.UserName')" :error="errors.userName">
          <InputText id="userName" v-model="userName" />
        </InputField>
        <InputField for="deptId" :label="$t('Org.Dept')" :error="errors.deptId">
          <Select
            id="deptId"
            v-model="deptId"
            :options="deptOptions ?? []"
            optionLabel="label"
            optionValue="value"
            :loading="deptOptionsLoading"
            showClear
            class="w-full"
          />
        </InputField>
        <div class="flex items-end gap-2">
          <Button type="submit">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
            {{ $t('Action.Search') }}
          </Button>
          <Button type="button" @click="router.push({ name: 'org-user-new' })">
            <font-awesome-icon icon="fa-solid fa-plus" />
            {{ $t('Action.Add') }}
          </Button>
        </div>
      </div>
    </form>

    <div class="mt-8">
      <DataTable
        class="w-full"
        v-bind="datatable.props.value"
        selectionMode="single"
        @page="datatable.onPage"
        @update:multiSortMeta="datatable.onUpdateMultiSortMeta"
      >
        <Column field="employeeId" :header="$t('Org.EmployeeId')" sortable bodyClass="!p-0">
          <template #body="{ data }">
            <RouterLink :to="{ name: 'org-user-detail', params: { userId: data.userId } }">
              <div class="w-full px-4 py-3">{{ data.employeeId }}</div>
            </RouterLink>
          </template>
        </Column>
        <Column field="userName" :header="$t('Org.UserName')" sortable />
        <Column field="deptName" :header="$t('Org.Dept')" sortable />
        <Column field="jobTitle" :header="$t('Org.JobTitle')" sortable />
      </DataTable>
    </div>
  </BasePage>
</template>
