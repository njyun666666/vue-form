<script setup lang="ts">
import InputField from '@/components/UI/InputField.vue'
import { optionService } from '@/libs/services/optionService'
import { orgUserService } from '@/libs/services/orgUserService'
import { useCreateConfirm } from '@/libs/utils/confirm'
import { useQuery } from '@tanstack/vue-query'
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { useForm } from 'vee-validate'
import { computed, ref } from 'vue'
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

const formSchema = z.object({
  userId: z.string().trim(),
  employeeId: z
    .string()
    .trim()
    .min(1, { message: t('Message.Required') }),
  userName: z
    .string()
    .trim()
    .min(1, { message: t('Message.Required') }),
  deptId: z.string().trim().nullable(),
  jobTitle: z.string().trim()
})

const { defineField, handleSubmit, errors, setFieldValue, isSubmitting } = useForm({
  validationSchema: formSchema,
  initialValues: {
    userId: '',
    employeeId: '',
    userName: '',
    deptId: null,
    jobTitle: ''
  }
})

const [employeeId] = defineField('employeeId')
const [userName] = defineField('userName')
const [deptId] = defineField('deptId')
const [jobTitle] = defineField('jobTitle')

if (isEditMode.value) {
  orgUserService.getOrgUser(userId.value!).then((res) => {
    const data = res.data
    setFieldValue('userId', data.userId)
    setFieldValue('employeeId', data.employeeId)
    setFieldValue('userName', data.userName)
    setFieldValue('deptId', data.deptId || null)
    setFieldValue('jobTitle', data.jobTitle)
  })
}

const { data: deptOptions, isFetching: deptOptionsLoading } = useQuery({
  queryKey: [optionService.deptUrl],
  queryFn: () => optionService.dept({}).then(({ data }) => data),
  staleTime: 5 * 60 * 1000
})

const onSubmit = handleSubmit(
  async (values) => {
    try {
      if (isEditMode.value) {
        await orgUserService.updateOrgUser({
          userId: values.userId,
          employeeId: values.employeeId,
          userName: values.userName,
          deptId: values.deptId ?? null,
          jobTitle: values.jobTitle
        })
        toast.add({ severity: 'success', summary: t('Message.EditSuccess'), life: 3000 })
      } else {
        await orgUserService.createOrgUser({
          employeeId: values.employeeId,
          userName: values.userName,
          deptId: values.deptId ?? null,
          jobTitle: values.jobTitle
        })
        toast.add({ severity: 'success', summary: t('Message.AddSuccess'), life: 3000 })
      }
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
        <div class="flex flex-col gap-4 text-left">
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

          <InputField for="deptId" :label="$t('Org.Dept')" :error="errors.deptId">
            <Select
              id="deptId"
              v-model="deptId"
              :options="deptOptions ?? []"
              optionLabel="label"
              optionValue="value"
              :loading="deptOptionsLoading"
              :invalid="!!errors.deptId"
              showClear
              class="w-full"
            />
          </InputField>

          <InputField for="jobTitle" :label="$t('Org.JobTitle')" :error="errors.jobTitle">
            <InputText id="jobTitle" v-model="jobTitle" :invalid="!!errors.jobTitle" />
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
</template>
