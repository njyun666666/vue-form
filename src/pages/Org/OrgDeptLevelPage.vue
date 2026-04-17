<script setup lang="ts">
import BasePage from '../BasePage.vue'
import InputField from '@/components/UI/InputField.vue'
import type { OrgDeptLevelQuery } from '@/libs/models/OrgDeptLevel/OrgDeptLevelQuery'
import type { QueryModel } from '@/libs/models/Query/QueryModel'
import { orgDeptLevelService } from '@/libs/services/orgDeptLevelService'
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

const query = ref<QueryModel<OrgDeptLevelQuery>>({
  pageIndex: 0,
  pageSize: 10,
  sort: [{ field: 'level', order: 1 }]
})

const fetchData = async (data: QueryModel<OrgDeptLevelQuery>) => {
  return await orgDeptLevelService.query(data).then(({ data }) => data)
}

const datatable = useDatatable(query, fetchData)

const formSchema = z.object({
  levelName: z.string().trim()
})

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: { levelName: '' }
})

const [levelName] = defineField('levelName')

const onSubmit = handleSubmit(async (values) => {
  await datatable.onSubmit(values)
})

onMounted(() => datatable.handleFetchData())
</script>
<template>
  <BasePage>
    <h1>{{ $t('Org.DeptLevel') }}</h1>

    <form novalidate @submit="onSubmit">
      <div class="mt-4 grid grid-cols-3 gap-4">
        <InputField for="levelName" :label="$t('Org.DeptLevelName')" :error="errors.levelName">
          <InputText id="levelName" v-model="levelName" />
        </InputField>
        <div class="flex items-end gap-2">
          <Button type="submit">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
            {{ $t('Action.Search') }}
          </Button>
          <Button type="button" @click="router.push({ name: 'org-dept-level-new' })">
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
        <Column field="levelName" :header="$t('Org.DeptLevelName')" sortable bodyClass="p-0!">
          <template #body="{ data }">
            <RouterLink :to="{ name: 'org-dept-level-detail', params: { levelId: data.levelId } }">
              <div class="w-full px-4 py-3">{{ data.levelName }}</div>
            </RouterLink>
          </template>
        </Column>
        <Column field="level" :header="$t('Org.DeptLevelOrder')" sortable />
      </DataTable>
    </div>
  </BasePage>
</template>
