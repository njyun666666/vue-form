<script setup lang="ts">
import InputField from '@/components/UI/InputField.vue'
import type { OrgRole } from '@/libs/models/OrgRole/OrgRole'
import { orgRoleService } from '@/libs/services/orgRoleService'
import { useCreateConfirm } from '@/libs/utils/confirm'
import { toTypedSchema } from '@vee-validate/zod'
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
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
</template>
