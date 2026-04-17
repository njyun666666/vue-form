<script setup lang="ts">
import BasePage from '../BasePage.vue'
import InputField from '@/components/UI/InputField.vue'
import type { OrgJobTitleQuery } from '@/libs/models/OrgJobTitle/OrgJobTitleQuery'
import type { QueryModel } from '@/libs/models/Query/QueryModel'
import { orgJobTitleService } from '@/libs/services/orgJobTitleService'
import { useDatatable } from '@/libs/utils/datatable'
import { toTypedSchema } from '@vee-validate/zod'
import Button from 'primevue/button'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import { useForm } from 'vee-validate'
import { onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { z } from 'zod'

const router = useRouter()

const query = ref<QueryModel<OrgJobTitleQuery>>({
  pageIndex: 0,
  pageSize: 10,
  sort: [{ field: 'jobLevel', order: 1 }]
})

const fetchData = async (data: QueryModel<OrgJobTitleQuery>) => {
  return await orgJobTitleService.query(data).then(({ data }) => data)
}

const datatable = useDatatable(query, fetchData)

const formSchema = z.object({
  jobTitleName: z.string().trim()
})

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: { jobTitleName: '' }
})

const [jobTitleName] = defineField('jobTitleName')

const onSubmit = handleSubmit(async (values) => {
  await datatable.onSubmit(values)
})

onMounted(() => datatable.handleFetchData())
</script>
<template>
  <BasePage>
    <h1>{{ $t('Org.JobTitle') }}</h1>

    <form novalidate @submit="onSubmit">
      <div class="mt-4 grid grid-cols-3 gap-4">
        <InputField for="jobTitleName" :label="$t('Org.JobTitleName')" :error="errors.jobTitleName">
          <InputText id="jobTitleName" v-model="jobTitleName" />
        </InputField>
        <div class="flex items-end gap-2">
          <Button type="submit">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
            {{ $t('Action.Search') }}
          </Button>
          <Button type="button" @click="router.push({ name: 'org-job-title-new' })">
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
        <Column field="jobTitleName" :header="$t('Org.JobTitleName')" sortable bodyClass="p-0!">
          <template #body="{ data }">
            <RouterLink
              :to="{ name: 'org-job-title-detail', params: { jobTitleId: data.jobTitleId } }"
            >
              <div class="w-full px-4 py-3">{{ data.jobTitleName }}</div>
            </RouterLink>
          </template>
        </Column>
        <Column field="jobLevel" :header="$t('Org.JobLevel')" sortable />
      </DataTable>
    </div>
  </BasePage>
</template>
