<script setup lang="ts">
import InputField from '@/components/UI/InputField.vue'
import type { OrgDeptLevel } from '@/libs/models/OrgDeptLevel/OrgDeptLevel'
import { orgDeptLevelService } from '@/libs/services/orgDeptLevelService'
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

const levelId = ref(route.params['levelId'] as string | undefined)
const isEditMode = computed(() => !!levelId.value)

const formSchema = z.object({
  levelId: z.string().trim(),
  levelName: z
    .string()
    .trim()
    .min(1, { message: t('Message.Required') }),
  level: z
    .number({ invalid_type_error: t('Message.Required') })
    .int()
    .min(1)
})

const { defineField, handleSubmit, errors, setFieldValue, isSubmitting } = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    levelId: '',
    levelName: '',
    level: 1
  }
})

const [levelName] = defineField('levelName')
const [level] = defineField('level')

if (isEditMode.value) {
  orgDeptLevelService.getOrgDeptLevel(levelId.value!).then((res) => {
    const data = res.data
    setFieldValue('levelId', data.levelId)
    setFieldValue('levelName', data.levelName)
    setFieldValue('level', data.level)
  })
}

const onSubmit = handleSubmit(
  async (values) => {
    try {
      await orgDeptLevelService.saveOrgDeptLevel(values as OrgDeptLevel)
      toast.add({
        severity: 'success',
        summary: t(isEditMode.value ? 'Message.EditSuccess' : 'Message.AddSuccess'),
        life: 3000
      })
      router.push({ name: 'org-dept-level' })
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
            for="levelName"
            :label="$t('Org.DeptLevelName')"
            :error="errors.levelName"
            isRequired
          >
            <InputText id="levelName" v-model="levelName" :invalid="!!errors.levelName" />
          </InputField>

          <InputField
            for="level"
            :label="$t('Org.DeptLevelOrder')"
            :error="errors.level"
            isRequired
          >
            <InputNumber
              id="level"
              v-model="level"
              :invalid="!!errors.level"
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
