<script setup lang="ts">
import ApprovalHistoryDialog from './ApprovalHistoryDialog.vue'
import FlowChartDialog from './FlowChartDialog.vue'
import { useFormAction } from './useFormAction'
import ToolbarBase from '@/components/UI/ToolbarBase.vue'
import { FormPageActionEnum } from '@/libs/enums/FormTypes'
import type { FlowNodeData } from '@/libs/models/FlowChart/FlowNode'
import type { FormPageInfoModel } from '@/libs/models/Form/FormModel'
import Button from 'primevue/button'
import { type Ref, computed, inject, ref, watchEffect } from 'vue'

const flowChartDialog = ref<InstanceType<typeof FlowChartDialog>>()
const approvalHistoryDialog = ref<InstanceType<typeof ApprovalHistoryDialog>>()

interface Props {
  formPageAction: FormPageActionEnum
}

const props = defineProps<Props>()
const pageInfo = inject<Ref<FormPageInfoModel>>('pageInfo')!

const flowSetting = computed(
  () => pageInfo.value.flow?.flowSetting as Record<string, unknown> | undefined
)

const stepButtons = computed(() => {
  const nodes = (pageInfo.value.flow?.flowSetting as any)?.nodes as
    | Array<{ id: string; data?: FlowNodeData }>
    | undefined
  return nodes?.find((n) => n.id === pageInfo.value.stepId)?.data?.task?.buttons
})

const {
  applicationBtn,
  approveBtn,
  rejectBtn,
  returnBtn,
  recallBtn,
  draftBtn,
  handleClick,
  commentAction
} = useFormAction(pageInfo)

watchEffect(() => {
  applicationBtn.value.display = props.formPageAction === FormPageActionEnum.application
  draftBtn.value.display = props.formPageAction === FormPageActionEnum.application

  approveBtn.value.display =
    props.formPageAction === FormPageActionEnum.approval &&
    (stepButtons.value?.approve?.enabled ?? true)
  rejectBtn.value.display =
    props.formPageAction === FormPageActionEnum.approval &&
    (stepButtons.value?.reject?.enabled ?? true)
  returnBtn.value.display =
    props.formPageAction === FormPageActionEnum.approval &&
    (stepButtons.value?.return?.enabled ?? false)

  recallBtn.value.display =
    props.formPageAction === FormPageActionEnum.info && !!pageInfo.value.canRecall
})

defineExpose({ applicationBtn, approveBtn, rejectBtn, returnBtn, recallBtn, draftBtn })
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
      v-if="draftBtn.display"
      :label="$t('Action.Draft')"
      icon="pi pi-save"
      severity="secondary"
      variant="text"
      :loading="draftBtn.loading"
      @click="handleClick(draftBtn)"
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
      v-if="returnBtn.display"
      :label="$t('Action.Return')"
      icon="pi pi-undo"
      severity="warn"
      variant="text"
      :loading="returnBtn.loading"
      @click="commentAction(returnBtn)"
    />

    <Button
      v-if="recallBtn.display"
      :label="$t('Action.Recall')"
      icon="pi pi-ban"
      severity="secondary"
      variant="text"
      :loading="recallBtn.loading"
      @click="handleClick(recallBtn)"
    />

    <Button
      v-if="pageInfo.flow?.flowSetting"
      :label="$t('Action.FlowChart')"
      icon="pi pi-sitemap"
      severity="secondary"
      variant="text"
      @click="flowChartDialog?.open()"
    />

    <Button
      v-if="pageInfo.formId"
      :label="$t('Form.ApprovalHistory.title')"
      icon="pi pi-history"
      severity="secondary"
      variant="text"
      @click="approvalHistoryDialog?.open()"
    />
  </ToolbarBase>

  <FlowChartDialog
    v-if="pageInfo.flow?.flowSetting"
    ref="flowChartDialog"
    :flow-setting="pageInfo.flow.flowSetting as Record<string, unknown>"
    :active-step-id="pageInfo.stepId"
    :form-id="pageInfo.formId"
    :flow-name="pageInfo.flow.flowName"
    :flow-id="pageInfo.flow.flowId"
  />

  <ApprovalHistoryDialog
    v-if="pageInfo.formId"
    ref="approvalHistoryDialog"
    :form-id="pageInfo.formId"
    :flow-setting="flowSetting"
  />
</template>
