<script setup lang="ts">
import OrgUserDepts from './OrgUserDepts.vue'
import { orgUserDeptSchema } from './orgUserDeptSchema'
import InputField from '@/components/UI/InputField.vue'
import type { OrgUser } from '@/libs/models/OrgUser/OrgUser'
import { OrgUserDeptModel } from '@/libs/models/OrgUser/OrgUserDeptModel'
import { optionService } from '@/libs/services/optionService'
import { orgUserService } from '@/libs/services/orgUserService'
import { useCreateConfirm } from '@/libs/utils/confirm'
import { useQuery } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Checkbox from 'primevue/checkbox'
import InputText from 'primevue/inputtext'
import MultiSelect from 'primevue/multiselect'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { useForm } from 'vee-validate'
import { computed, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { z } from 'zod'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const toast = useToast()
const confirmHelper = useCreateConfirm(useConfirm())

const userId = ref(route.params['userId'] as string | undefined)
const isEditMode = computed(() => !!userId.value)

// ---- Schema ----
const formSchema = toTypedSchema(
  z
    .object({
      userId: z.string(),
      employeeId: z
        .string()
        .trim()
        .min(1, { message: t('Message.Required') }),
      userName: z
        .string()
        .trim()
        .min(1, { message: t('Message.Required') }),
      enable: z.boolean(),
      roleIds: z.array(z.string()),
      userDepts: z.array(orgUserDeptSchema)
    })
    .superRefine((val, ctx) => {
      const activeDepts = val.userDepts.filter((d) => !d.isDeleted)
      if (activeDepts.length === 0) {
        ctx.addIssue({
          code: 'custom',
          message: t('Message.At_least_number_entry_is_required', { number: 1 }),
          path: ['userDepts']
        })
        return
      }
      val.userDepts.forEach((dept, i) => {
        if (dept.isDeleted) return
        if (!dept.deptId?.trim()) {
          ctx.addIssue({
            code: 'custom',
            message: t('Message.Required'),
            path: ['userDepts', i, 'deptId']
          })
        }
        if (!dept.jobTitleId?.trim()) {
          ctx.addIssue({
            code: 'custom',
            message: t('Message.Required'),
            path: ['userDepts', i, 'jobTitleId']
          })
        }
      })
    })
)

// ---- Form ----
const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    userId: '',
    employeeId: '',
    userName: '',
    enable: true,
    roleIds: [] as string[],
    userDepts: [] as OrgUserDeptModel[]
  }
})

provide('form', form)

const { defineField, handleSubmit, errors, isSubmitting } = form
const [employeeId] = defineField('employeeId')
const [userName] = defineField('userName')
const [enable] = defineField('enable')
const [roleIds] = defineField('roleIds')

const { data: roleOptions, isFetching: roleOptionsLoading } = useQuery({
  queryKey: [optionService.roleUrl],
  queryFn: () => optionService.role().then(({ data }) => data),
  staleTime: 5 * 60 * 1000
})

// ---- Load for edit ----
if (isEditMode.value) {
  orgUserService.getOrgUser(userId.value!).then((res) => {
    const data = res.data
    form.setValues({
      userId: data.userId,
      employeeId: data.employeeId,
      userName: data.userName,
      enable: data.enable,
      roleIds: data.roleIds ?? [],
      userDepts: data.userDepts.map((d) => new OrgUserDeptModel(d))
    })
  })
}

// ---- Submit ----
const onSubmit = handleSubmit(
  async (values) => {
    try {
      await orgUserService.saveOrgUser(values as OrgUser)
      toast.add({
        severity: 'success',
        summary: t(isEditMode.value ? 'Message.EditSuccess' : 'Message.AddSuccess'),
        life: 3000
      })
      router.push({ name: 'org-user' })
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
</script>
<template>
  <Card>
    <template #content>
      <form novalidate @submit="onSubmit">
        <div class="flex flex-col gap-6 text-left">
          <InputField
            for="employeeId"
            :label="$t('Org.EmployeeId')"
            :error="errors.employeeId"
            isRequired
          >
            <InputText id="employeeId" v-model="employeeId" :invalid="!!errors.employeeId" />
          </InputField>

          <InputField
            for="userName"
            :label="$t('Org.UserName')"
            :error="errors.userName"
            isRequired
          >
            <InputText id="userName" v-model="userName" :invalid="!!errors.userName" />
          </InputField>

          <InputField for="roleIds" :label="$t('Org.Role')">
            <MultiSelect
              v-model="roleIds"
              inputId="roleIds"
              :options="roleOptions ?? []"
              optionLabel="label"
              optionValue="value"
              :loading="roleOptionsLoading"
              :placeholder="$t('Org.Role')"
              filter
              display="chip"
              class="w-full"
            />
          </InputField>

          <div class="flex items-center gap-2">
            <Checkbox v-model="enable" :binary="true" inputId="enable" />
            <label for="enable">{{ $t('Org.Enable') }}</label>
          </div>

          <OrgUserDepts />

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
</template>
