<script setup lang="ts">
import OrgUserDepts from './OrgUserDepts.vue'
import { orgUserDeptSchema } from './orgUserDeptSchema'
import InputField from '@/components/UI/InputField.vue'
import { OrgUserDeptModel } from '@/libs/models/OrgUser/OrgUserDeptModel'
import { orgUserService } from '@/libs/services/orgUserService'
import type { UserDeptPayload } from '@/libs/services/orgUserService'
import { useCreateConfirm } from '@/libs/utils/confirm'
import { toTypedSchema } from '@vee-validate/zod'
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
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
    userDepts: [] as OrgUserDeptModel[]
  }
})

provide('form', form)

const { defineField, handleSubmit, errors, isSubmitting } = form
const [employeeId] = defineField('employeeId')
const [userName] = defineField('userName')

// ---- Load for edit ----
if (isEditMode.value) {
  orgUserService.getOrgUser(userId.value!).then((res) => {
    const data = res.data
    form.setValues({
      userId: data.userId,
      employeeId: data.employeeId,
      userName: data.userName,
      userDepts: data.userDepts.map((d) => new OrgUserDeptModel(d))
    })
  })
}

// ---- Submit ----
const onSubmit = handleSubmit(
  async (values) => {
    try {
      const deptsPayload: UserDeptPayload[] = values.userDepts
        .filter((d) => d.userDeptId || !d.isDeleted)
        .map((d) => ({
          userDeptId: d.userDeptId || undefined,
          deptId: d.deptId!,
          jobTitleId: d.jobTitleId!,
          isPrimary: d.isPrimary!,
          isDeleted: d.isDeleted ?? false
        }))

      await orgUserService.saveOrgUser({
        userId: isEditMode.value ? values.userId : undefined,
        employeeId: values.employeeId,
        userName: values.userName,
        userDepts: deptsPayload
      })
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
