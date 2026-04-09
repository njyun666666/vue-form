<script setup lang="ts">
import InputField from '@/components/UI/InputField.vue'
import { orgJobTitleService } from '@/libs/services/orgJobTitleService'
import { useCreateConfirm } from '@/libs/utils/confirm'
import { toTypedSchema } from '@vee-validate/zod'
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
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

const jobTitleId = ref(route.params['jobTitleId'] as string | undefined)
const isEditMode = computed(() => !!jobTitleId.value)

const formSchema = z.object({
  jobTitleId: z.string().trim(),
  jobTitleName: z
    .string()
    .trim()
    .min(1, { message: t('Message.Required') }),
  jobLevel: z
    .number({ error: t('Message.Required') })
    .int()
    .min(1)
})

const { defineField, handleSubmit, errors, setFieldValue, isSubmitting } = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    jobTitleId: '',
    jobTitleName: '',
    jobLevel: 1
  }
})

const [jobTitleName] = defineField('jobTitleName')
const [jobLevel] = defineField('jobLevel')

if (isEditMode.value) {
  orgJobTitleService.getOrgJobTitle(jobTitleId.value!).then((res) => {
    const data = res.data
    setFieldValue('jobTitleId', data.jobTitleId)
    setFieldValue('jobTitleName', data.jobTitleName)
    setFieldValue('jobLevel', data.jobLevel)
  })
}

const onSubmit = handleSubmit(
  async (values) => {
    try {
      if (isEditMode.value) {
        await orgJobTitleService.updateOrgJobTitle({
          jobTitleId: values.jobTitleId,
          jobTitleName: values.jobTitleName,
          jobLevel: values.jobLevel
        })
        toast.add({ severity: 'success', summary: t('Message.EditSuccess'), life: 3000 })
      } else {
        await orgJobTitleService.createOrgJobTitle({
          jobTitleName: values.jobTitleName,
          jobLevel: values.jobLevel
        })
        toast.add({ severity: 'success', summary: t('Message.AddSuccess'), life: 3000 })
      }
      router.push({ name: 'org-job-title' })
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
            for="jobTitleName"
            :label="$t('Org.JobTitleName')"
            :error="errors.jobTitleName"
            isRequired
          >
            <InputText id="jobTitleName" v-model="jobTitleName" :invalid="!!errors.jobTitleName" />
          </InputField>

          <InputField
            for="jobLevel"
            :label="$t('Org.JobLevel')"
            :error="errors.jobLevel"
            isRequired
          >
            <InputNumber
              id="jobLevel"
              v-model="jobLevel"
              :invalid="!!errors.jobLevel"
              :min="1"
              :useGrouping="false"
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
</template>
