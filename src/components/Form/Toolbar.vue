<script setup lang="ts">
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

function handleClick(setting: FormActionSetting) {
  if (setting.beforeAction) setting.beforeAction()
  setting.action()
  if (setting.afterAction) setting.afterAction()
}

function applicationAction() {
  console.log('application')
}

function approveAction() {
  console.log('approve')
}

function rejectAction() {
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
      label="Application"
      variant="text"
      @click="handleClick(applicationBtn)"
    />
    <Button
      v-if="approveBtn.display"
      label="Approve"
      variant="text"
      @click="handleClick(approveBtn)"
    />
    <Button
      v-if="rejectBtn.display"
      label="Reject"
      severity="danger"
      variant="text"
      @click="handleClick(rejectBtn)"
    />
  </div>
</template>
