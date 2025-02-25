<script setup lang="ts">
import type { FormSaveViewModel } from '@/libs/models/Form/FormModel'
import { FormActionSetting } from '@/libs/models/Form/Toolbar'
import { FormPageAction, type FormPageActionType } from '@/libs/types/FormTypes'
import router from '@/router'
import { useLayoutStore } from '@/stores/layout'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

interface Props {
  formPageAction: FormPageActionType
}

const props = defineProps<Props>()
const layoutStore = useLayoutStore()
const toast = useToast()
const { t } = useI18n()

const applicationBtn = ref(new FormActionSetting(applicationAction))
const approveBtn = ref(new FormActionSetting(approveAction))
const rejectBtn = ref(new FormActionSetting(rejectAction))
const save = ref<FormSaveViewModel>()

switch (props.formPageAction) {
  case FormPageAction.application:
    applicationBtn.value.display = true
    break

  case FormPageAction.info:
    break

  case FormPageAction.approval:
    approveBtn.value.display = true
    rejectBtn.value.display = true
    break

  default:
    break
}

async function handleClick(setting: FormActionSetting) {
  save.value = undefined
  layoutStore.loading = true
  setting.loading = true

  if (setting.beforeAction) {
    const result = await setting.beforeAction()
    if (result === false) {
      setting.loading = false
      layoutStore.loading = false
      return
    }
  }

  if (setting.saveAction) {
    const result = await setting.saveAction()
    if (result === false) {
      setting.loading = false
      layoutStore.loading = false
      return
    }

    save.value = result as FormSaveViewModel

    if (!save.value.result) {
      toast.add({
        severity: 'error',
        summary: t('Message.Application_Fail'),
        detail: `${save.value.message}`,
        life: 3000
      })

      setting.loading = false
      layoutStore.loading = false
      return
    }
  }

  if (setting.action) {
    const result = await setting.action()
    if (result === false) {
      setting.loading = false
      layoutStore.loading = false
      return
    }
  }

  if (setting.afterAction) {
    const result = await setting.afterAction()
    if (result === false) {
      setting.loading = false
      layoutStore.loading = false
      return
    }
  }

  setting.loading = false
  layoutStore.loading = false
}

async function applicationAction() {
  if (save.value?.result) {
    toast.add({
      severity: 'success',
      summary: t('Message.Application_Success'),
      detail: `${save.value.formId}`,
      life: 3000
    })

    router.push({
      name: 'form/:formPageAction/:formClass/:formId',
      params: {
        formPageAction: FormPageAction.info,
        formClass: save.value.formClass,
        formId: save.value.formId
      }
    })
  }
}

async function approveAction() {
  console.log('approve')
}

async function rejectAction() {
  console.log('reject')
}

defineExpose({
  applicationBtn,
  approveBtn,
  rejectBtn
})
</script>
<template>
  <div class="flex w-full bg-surface-0 dark:bg-surface-900 gap-1 p-1">
    <Button
      v-if="applicationBtn.display"
      :label="$t('Action.Application')"
      icon="pi pi-plus"
      variant="text"
      :loading="applicationBtn.loading"
      @click="handleClick(applicationBtn)"
    />

    <Button
      v-if="approveBtn.display"
      :label="$t('Action.Approve')"
      icon="pi pi-check"
      variant="text"
      :loading="approveBtn.loading"
      @click="handleClick(approveBtn)"
    />

    <Button
      v-if="rejectBtn.display"
      :label="$t('Action.Reject')"
      icon="pi pi-times"
      severity="danger"
      variant="text"
      :loading="rejectBtn.loading"
      @click="handleClick(rejectBtn)"
    />
  </div>
</template>
