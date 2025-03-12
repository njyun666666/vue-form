<script setup lang="ts">
import ActionDialog from './ApprovalComment.vue'
import ToolbarBase from '@/components/UI/ToolbarBase.vue'
import { FormActionEnum, FormPageActionEnum } from '@/libs/enums/FormTypes'
import type { FlowApprovalModel, FlowApprovalViewModel } from '@/libs/models/Form/FlowModel'
import type { FormPageInfoModel, FormSaveViewModel } from '@/libs/models/Form/FormModel'
import { FormActionSetting } from '@/libs/models/Form/Toolbar'
import { flowService } from '@/libs/services/flowService'
import { createConfirm } from '@/libs/utils/confirm'
import router from '@/router'
import { useLayoutStore } from '@/stores/layout'
import type { AxiosError } from 'axios'
import Button from 'primevue/button'
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import { useConfirm } from 'primevue/useconfirm'
import { useDialog } from 'primevue/usedialog'
import { useToast } from 'primevue/usetoast'
import { type Ref, inject, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { RouteLocationRaw } from 'vue-router'

interface Props {
  formPageAction: FormPageActionEnum
}

const props = defineProps<Props>()
const { t } = useI18n()
const layoutStore = useLayoutStore()
const toast = useToast()
const dialog = useDialog()
const commentDialog = ref<DynamicDialogInstance>()
const pageInfo = inject<Ref<FormPageInfoModel>>('pageInfo')!

const applicationBtn = ref(new FormActionSetting(FormActionEnum.application, applicationAction))
const approveBtn = ref(new FormActionSetting(FormActionEnum.approve, approveAction))
const rejectBtn = ref(new FormActionSetting(FormActionEnum.reject, rejectAction))
const save = ref<FormSaveViewModel>({})
const approval = ref<FlowApprovalModel>({ formId: pageInfo.value.flowId, approvalId: 'aaa' })
const approvalRes = ref<FlowApprovalViewModel>({})
const routeTo = ref<RouteLocationRaw>()

switch (props.formPageAction) {
  case FormPageActionEnum.application:
    applicationBtn.value.display = true
    break

  case FormPageActionEnum.info:
    break

  case FormPageActionEnum.approval:
    approveBtn.value.display = true
    rejectBtn.value.display = true
    break

  default:
    break
}

async function handleClick(setting: FormActionSetting) {
  save.value.result = undefined
  save.value.message = undefined
  approval.value.action = setting.actionType
  routeTo.value = undefined

  layoutStore.loading = true

  if (setting.beforeAction) {
    const result = await setting.beforeAction()
    if (result === false) {
      layoutStore.loading = false
      return
    }
  }

  // form
  if (setting.saveAction) {
    const result = await setting.saveAction()
    if (result === false) {
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

      layoutStore.loading = false

      return
    }
  }

  // flow
  if ([FormActionEnum.approve, FormActionEnum.reject].includes(setting.actionType)) {
    approvalRes.value = await flowService
      .approval(approval.value)
      .then(({ data }) => data)
      .catch((error: AxiosError) => {
        console.error(error)
        return { result: false, message: `${error.message}` }
      })

    if (!approvalRes.value.result) {
      toast.add({
        severity: 'error',
        summary: t('Message.Approval_Fail'),
        detail: `${approvalRes.value.message}`,
        life: 5000
      })

      layoutStore.loading = false

      return
    }
  }

  if (setting.action) {
    const result = await setting.action()
    if (result === false) {
      layoutStore.loading = false
      return
    }
  }

  if (setting.afterAction) {
    const result = await setting.afterAction()
    if (result === false) {
      layoutStore.loading = false
      return
    }
  }

  layoutStore.loading = false

  if (routeTo.value) {
    router.push(routeTo.value)
  }
}

async function applicationAction() {
  toast.add({
    severity: 'success',
    summary: t('Message.Application_Success'),
    detail: `${save.value.formId}`,
    life: 3000
  })

  routeTo.value = {
    name: 'form/:formPageAction/:formClass/:formId',
    params: {
      formPageAction: FormPageActionEnum.info,
      formClass: save.value.formClass,
      formId: save.value.formId
    }
  }
}

async function approveAction() {
  commentDialog.value?.close()

  toast.add({
    severity: 'success',
    summary: t('Message.Approval_Completed'),
    detail: `${t('Message.Next_Approver')}: ${approvalRes.value.nextStepName}, ${approvalRes.value.nextApproverName}`,
    life: 5000
  })

  routeTo.value = {
    name: 'form/:formPageAction/:formClass/:formId',
    params: {
      formPageAction: FormPageActionEnum.info,
      formClass: pageInfo.value.formClass,
      formId: pageInfo.value.formId
    }
  }
}

async function rejectAction() {
  approveAction()
}

async function commentAction(setting: FormActionSetting) {
  if (setting.validate && !(await setting.validate())) {
    return false
  }

  approval.value.comment = ''

  commentDialog.value = dialog.open(ActionDialog, {
    props: {
      header: t('Form.Approval.comment'),
      modal: true,
      style: {
        width: '50vw'
      },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      }
    },
    data: {
      action: setting.actionType
    },
    onClose: (e) => {
      // console.log(e)
    },
    emits: {
      onFlowSend: (e: FlowApprovalModel) => {
        // console.log('onFlowSend', e)
        approval.value.comment = e.comment
        handleClick(setting)
      }
    }
  })
}

defineExpose({
  applicationBtn,
  approveBtn,
  rejectBtn
})
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
  </ToolbarBase>
</template>
