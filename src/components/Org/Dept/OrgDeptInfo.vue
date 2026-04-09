<script setup lang="ts">
import InputField from '@/components/UI/InputField.vue'
import { optionService } from '@/libs/services/optionService'
import { orgDeptService } from '@/libs/services/orgDeptService'
import { useCreateConfirm } from '@/libs/utils/confirm'
import { useQuery } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
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

const deptId = ref(route.params['deptId'] as string | undefined)
const isEditMode = computed(() => !!deptId.value)

const formSchema = z.object({
  deptId: z.string().trim(),
  deptName: z
    .string()
    .trim()
    .min(1, { message: t('Message.Required') }),
  parentDeptId: z.string().trim().nullable(),
  levelId: z.string().trim().nullable()
})

const { defineField, handleSubmit, errors, setFieldValue, isSubmitting } = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    deptId: '',
    deptName: '',
    parentDeptId: null,
    levelId: null
  }
})

const [deptName] = defineField('deptName')
const [parentDeptId] = defineField('parentDeptId')
const [levelId] = defineField('levelId')

if (isEditMode.value) {
  orgDeptService.getOrgDept(deptId.value!).then((res) => {
    const data = res.data
    setFieldValue('deptId', data.deptId)
    setFieldValue('deptName', data.deptName)
    setFieldValue('parentDeptId', data.parentDeptId ?? null)
    setFieldValue('levelId', data.levelId ?? null)
  })
}

const { data: allDeptOptions, isFetching: deptOptionsLoading } = useQuery({
  queryKey: [optionService.deptUrl],
  queryFn: () => optionService.dept({}).then(({ data }) => data),
  staleTime: 5 * 60 * 1000
})

const { data: deptLevelOptions, isFetching: deptLevelOptionsLoading } = useQuery({
  queryKey: [optionService.deptLevelUrl],
  queryFn: () => optionService.deptLevel().then(({ data }) => data),
  staleTime: 5 * 60 * 1000
})

const parentDeptOptions = computed(() =>
  (allDeptOptions.value ?? []).filter((opt) => opt.value !== deptId.value)
)

const onSubmit = handleSubmit(
  async (values) => {
    try {
      if (isEditMode.value) {
        await orgDeptService.updateOrgDept({
          deptId: values.deptId,
          deptName: values.deptName,
          parentDeptId: values.parentDeptId ?? null,
          levelId: values.levelId ?? null
        })
        toast.add({ severity: 'success', summary: t('Message.EditSuccess'), life: 3000 })
      } else {
        await orgDeptService.createOrgDept({
          deptName: values.deptName,
          parentDeptId: values.parentDeptId ?? null,
          levelId: values.levelId ?? null
        })
        toast.add({ severity: 'success', summary: t('Message.AddSuccess'), life: 3000 })
      }
      router.push({ name: 'org-dept' })
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
            for="deptName"
            :label="$t('Org.DeptName')"
            :error="errors.deptName"
            isRequired
          >
            <InputText id="deptName" v-model="deptName" :invalid="!!errors.deptName" />
          </InputField>

          <InputField for="parentDeptId" :label="$t('Org.ParentDept')" :error="errors.parentDeptId">
            <Select
              id="parentDeptId"
              v-model="parentDeptId"
              :options="parentDeptOptions"
              optionLabel="label"
              optionValue="value"
              :loading="deptOptionsLoading"
              :invalid="!!errors.parentDeptId"
              showClear
              class="w-full"
            />
          </InputField>

          <InputField for="levelId" :label="$t('Org.DeptLevel')" :error="errors.levelId">
            <Select
              id="levelId"
              v-model="levelId"
              :options="deptLevelOptions ?? []"
              optionLabel="label"
              optionValue="value"
              :loading="deptLevelOptionsLoading"
              :invalid="!!errors.levelId"
              showClear
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
