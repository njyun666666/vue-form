<script setup lang="ts">
import BasePage from '../BasePage.vue'
import InputField from '@/components/UI/InputField.vue'
import type { OrgRoleQuery } from '@/libs/models/OrgRole/OrgRoleQuery'
import type { QueryModel } from '@/libs/models/Query/QueryModel'
import { orgRoleService } from '@/libs/services/orgRoleService'
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

const query = ref<QueryModel<OrgRoleQuery>>({
  pageIndex: 0,
  pageSize: 10,
  sort: [{ field: 'roleName', order: 1 }]
})

const fetchData = async (data: QueryModel<OrgRoleQuery>) => {
  return await orgRoleService.query(data).then(({ data }) => data)
}

const datatable = useDatatable(query, fetchData)

const formSchema = z.object({
  roleName: z.string().trim()
})

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: { roleName: '' }
})

const [roleName] = defineField('roleName')

const onSubmit = handleSubmit(async (values) => {
  await datatable.onSubmit(values)
})

onMounted(() => datatable.handleFetchData())
</script>
<template>
  <BasePage>
    <h1>{{ $t('Org.Role') }}</h1>

    <form novalidate @submit="onSubmit">
      <div class="mt-4 grid grid-cols-3 gap-4">
        <InputField for="roleName" :label="$t('Org.RoleName')" :error="errors.roleName">
          <InputText id="roleName" v-model="roleName" />
        </InputField>
        <div class="flex items-end gap-2">
          <Button type="submit">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
            {{ $t('Action.Search') }}
          </Button>
          <Button type="button" @click="router.push({ name: 'org-role-new' })">
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
        <Column field="roleName" :header="$t('Org.RoleName')" sortable bodyClass="!p-0">
          <template #body="{ data }">
            <RouterLink :to="{ name: 'org-role-detail', params: { roleId: data.roleId } }">
              <div class="w-full px-4 py-3">{{ data.roleName }}</div>
            </RouterLink>
          </template>
        </Column>
        <Column field="description" :header="$t('Org.RoleDescription')" sortable />
      </DataTable>
    </div>
  </BasePage>
</template>
