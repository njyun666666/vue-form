<script setup lang="ts">
import InputField from '@/components/UI/InputField.vue'
import type { OrgRole } from '@/libs/models/OrgRole/OrgRole'
import type { OrgRoleMember } from '@/libs/models/OrgRole/OrgRoleMember'
import { optionService } from '@/libs/services/optionService'
import { orgRoleService } from '@/libs/services/orgRoleService'
import { useCreateConfirm } from '@/libs/utils/confirm'
import { useQuery } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { useForm } from 'vee-validate'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { z } from 'zod'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const toast = useToast()
const confirmHelper = useCreateConfirm(useConfirm())

const roleId = ref(route.params['roleId'] as string | undefined)
const isEditMode = computed(() => !!roleId.value)

const formSchema = z.object({
  roleId: z.string().trim(),
  roleName: z
    .string()
    .trim()
    .min(1, { message: t('Message.Required') }),
  description: z.string().trim()
})

const { defineField, handleSubmit, errors, setFieldValue, isSubmitting } = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    roleId: '',
    roleName: '',
    description: ''
  }
})

const [roleName] = defineField('roleName')
const [description] = defineField('description')

if (isEditMode.value) {
  orgRoleService.getOrgRole(roleId.value!).then((res) => {
    const data = res.data
    setFieldValue('roleId', data.roleId)
    setFieldValue('roleName', data.roleName)
    setFieldValue('description', data.description)
  })
}

const onSubmit = handleSubmit(
  async (values) => {
    try {
      await orgRoleService.saveOrgRole(values as OrgRole)
      toast.add({
        severity: 'success',
        summary: t(isEditMode.value ? 'Message.EditSuccess' : 'Message.AddSuccess'),
        life: 3000
      })
      router.push({ name: 'org-role' })
    } catch {
      await confirmHelper.alert({
        message: isEditMode.value ? t('Message.EditFail') : t('Message.AddFail')
      })
    }
  },
  () => {
    confirmHelper.alert({ message: t('Message.Please_check_the_field') })
  }
)

// ---- Members ----
const members = ref<OrgRoleMember[]>([])
const selectedUserId = ref<string | null>(null)
const memberActionLoading = ref(false)

const { data: userOptions, isFetching: userOptionsLoading } = useQuery({
  queryKey: [optionService.userUrl],
  queryFn: () => optionService.user().then(({ data }) => data),
  staleTime: 5 * 60 * 1000
})

const addableUserOptions = computed(() => {
  const memberIds = new Set(members.value.map((m) => m.userId))
  return (userOptions.value ?? []).filter((u) => !memberIds.has(u.value))
})

async function loadMembers() {
  const res = await orgRoleService.getMembers(roleId.value!)
  members.value = res.data
}

async function addMember() {
  if (!selectedUserId.value) return
  memberActionLoading.value = true
  try {
    const res = await orgRoleService.addMember(roleId.value!, selectedUserId.value)
    members.value.push(res.data)
    selectedUserId.value = null
  } finally {
    memberActionLoading.value = false
  }
}

async function removeMember(userId: string) {
  memberActionLoading.value = true
  try {
    await orgRoleService.removeMember(roleId.value!, userId)
    members.value = members.value.filter((m) => m.userId !== userId)
  } finally {
    memberActionLoading.value = false
  }
}

if (isEditMode.value) {
  onMounted(loadMembers)
}
</script>
<template>
  <Card>
    <template #content>
      <form novalidate @submit="onSubmit">
        <div class="flex flex-col gap-4 text-left">
          <InputField
            for="roleName"
            :label="$t('Org.RoleName')"
            :error="errors.roleName"
            isRequired
          >
            <InputText id="roleName" v-model="roleName" :invalid="!!errors.roleName" />
          </InputField>

          <InputField
            for="description"
            :label="$t('Org.RoleDescription')"
            :error="errors.description"
          >
            <Textarea
              id="description"
              v-model="description"
              :invalid="!!errors.description"
              rows="3"
              class="w-full"
            />
          </InputField>

          <div class="flex justify-end">
            <Button type="submit" :disabled="isSubmitting">
              <font-awesome-icon icon="fa-solid fa-floppy-disk" />
              {{ $t('Action.Save') }}
            </Button>
          </div>
        </div>
      </form>
    </template>
  </Card>

  <Card v-if="isEditMode" class="mt-4">
    <template #content>
      <DataTable :value="members" dataKey="userId">
        <template #header>
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-lg font-bold">{{ $t('Org.RoleMembers') }}</span>
            <div class="grow" />
            <Select
              v-model="selectedUserId"
              :options="addableUserOptions"
              optionLabel="label"
              optionValue="value"
              :loading="userOptionsLoading"
              :placeholder="$t('Org.AddRoleMember')"
              filter
              showClear
              class="w-56"
            />
            <Button
              icon="pi pi-plus"
              rounded
              :disabled="!selectedUserId || memberActionLoading"
              @click="addMember"
              v-tooltip="$t('Action.Add')"
            />
          </div>
        </template>
        <Column field="employeeId" :header="$t('Org.EmployeeId')" />
        <Column field="userName" :header="$t('Org.UserName')" />
        <Column class="w-16 text-center!">
          <template #body="{ data }">
            <Button
              icon="pi pi-trash"
              rounded
              severity="secondary"
              :disabled="memberActionLoading"
              @click="removeMember(data.userId)"
              v-tooltip="$t('Action.Remove')"
            />
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>
