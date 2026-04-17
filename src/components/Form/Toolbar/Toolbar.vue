<script setup lang="ts">
import FlowChartDialog from './FlowChartDialog.vue'
import { useFormAction } from './useFormAction'
import ToolbarBase from '@/components/UI/ToolbarBase.vue'
import { FormPageActionEnum } from '@/libs/enums/FormTypes'
import type { FormPageInfoModel } from '@/libs/models/Form/FormModel'
import Button from 'primevue/button'
import { type Ref, inject, ref } from 'vue'

const flowChartDialog = ref<InstanceType<typeof FlowChartDialog>>()

interface Props {
  formPageAction: FormPageActionEnum
}

const props = defineProps<Props>()
const pageInfo = inject<Ref<FormPageInfoModel>>('pageInfo')!

const { applicationBtn, approveBtn, rejectBtn, handleClick, commentAction } =
  useFormAction(pageInfo)

switch (props.formPageAction) {
  case FormPageActionEnum.application:
    applicationBtn.value.display = true
    break

  case FormPageActionEnum.approval:
    approveBtn.value.display = true
    rejectBtn.value.display = true
    break

  default:
    break
}

defineExpose({ applicationBtn, approveBtn, rejectBtn })
</script>

<template>
  <ToolbarBase>
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
      @click="commentAction(approveBtn)"
    />

    <Button
      v-if="rejectBtn.display"
      :label="$t('Action.Reject')"
      icon="pi pi-times"
      severity="danger"
      variant="text"
      :loading="rejectBtn.loading"
      @click="commentAction(rejectBtn)"
    />

    <Button
      v-if="pageInfo.flow?.flowSetting"
      :label="$t('Action.FlowChart')"
      icon="pi pi-sitemap"
      severity="secondary"
      variant="text"
      @click="flowChartDialog?.open()"
    />
  </ToolbarBase>

  <FlowChartDialog
    v-if="pageInfo.flow?.flowSetting"
    ref="flowChartDialog"
    :flow-setting="pageInfo.flow.flowSetting as Record<string, unknown>"
    :active-step-id="pageInfo.stepId"
  />
</template>
