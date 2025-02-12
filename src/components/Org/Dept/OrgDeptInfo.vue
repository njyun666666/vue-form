<script setup lang="ts">
import InputField from '@/components/UI/InputField.vue'
import type { OrgDept } from '@/libs/models/OrgDept/OrgDept'
import { orgDeptService } from '@/libs/services/orgDeptService'
import { toTypedSchema } from '@vee-validate/zod'
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import { useForm } from 'vee-validate'
import { onBeforeMount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { z } from 'zod'

const { t } = useI18n()
const route = useRoute()
const deptId = ref(route.params['deptId'] as string)
const data = ref<OrgDept>()
const initValues = ref<string>()
const isFetched = ref(false)

const formSchema = z.object({
  deptId: z.string().trim(),
  deptName: z
    .string()
    .trim()
    .min(1, { message: t('Message.Required') }),
  parentDeptId: z.string().trim().nullable()
})

const { defineField, handleSubmit, errors, setFieldValue, isSubmitting, values } = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    deptId: '',
    deptName: '',
    parentDeptId: undefined
  }
})

const [deptName] = defineField('deptName')
const [parentDeptId] = defineField('parentDeptId')

const onSubmit = handleSubmit(async (values) => {
  console.log(values)
})

orgDeptService.getOrgDept(deptId.value).then((res) => {
  data.value = res.data
  setFieldValue('deptId', data.value.deptId)
  setFieldValue('deptName', data.value.deptName)
  setFieldValue('parentDeptId', data.value.parentDeptId)
  initValues.value = data.value.parentDeptId
  isFetched.value = true
})
// onBeforeMount(async () => {
//   console.log(data.value)
// })
</script>
<template>
  <Card>
    <!-- <template #title>{{ data?.deptName }}</template> -->
    <template #content>
      <form novalidate @submit="onSubmit">
        <div class="flex flex-col gap-4 text-left">
          <InputField for="deptName" :label="$t('Org.DeptName')" :error="errors.deptName">
            <InputText id="deptName" v-model="deptName" />
          </InputField>

          <InputField for="parentDeptId" :label="$t('Org.ParentDept')" :error="errors.parentDeptId">
          </InputField>

          <div class="flex justify-end">
            <Button type="submit" :disabled="isSubmitting">
              <font-awesome-icon icon="fa-solid fa-floppy-disk" />
              {{ $t('Action.Save') }}
            </Button>
          </div>
        </div>
      </form>
      {{ values }}
    </template>
  </Card>
</template>
