<script setup lang="ts">
import type { FormSaveViewModel } from '@/libs/models/Form/FormModel'
import { FormActionSetting } from '@/libs/models/Form/Toolbar'
import type { FormPageType } from '@/libs/types/FormTypes'
import Button from 'primevue/button'
import { ref } from 'vue'

interface Props {
  formPageType: FormPageType
}

const props = defineProps<Props>()

const applicationBtn = ref(new FormActionSetting(applicationAction))
const approveBtn = ref(new FormActionSetting(approveAction))
const rejectBtn = ref(new FormActionSetting(rejectAction))

switch (props.formPageType) {
  case 'add':
    applicationBtn.value.display = true
    break

  case 'info':
    break

  case 'sign':
    approveBtn.value.display = true
    rejectBtn.value.display = true
    break

  default:
    break
}

async function handleClick(setting: FormActionSetting) {
  setting.loading = true

  if (setting.beforeAction) {
    const result = await setting.beforeAction()
    if (result === false) {
      setting.loading = false
      return
    }
  }

  if (setting.saveAction) {
    const result = await setting.saveAction()
    if (result === false) {
      setting.loading = false
      return
    }

    const save = result as FormSaveViewModel

    if (save.result) {
      //
    } else {
      //
    }
  }

  if (setting.action) {
    const result = await setting.action()
    if (result === false) {
      setting.loading = false
      return
    }
  }

  if (setting.afterAction) {
    const result = await setting.afterAction()
    if (result === false) {
      setting.loading = false
      return
    }
  }

  setting.loading = false
}

async function applicationAction() {
  console.log('application')
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
