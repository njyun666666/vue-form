import ActionDialog from './ApprovalComment.vue'
import { FormActionEnum, FormPageActionEnum } from '@/libs/enums/FormTypes'
import type { FlowApprovalModel, FlowApprovalViewModel } from '@/libs/models/Flow/FlowModel'
import type { FormPageInfoModel, FormSaveViewModel } from '@/libs/models/Form/FormModel'
import { FormActionSetting } from '@/libs/models/Form/Toolbar'
import { flowService } from '@/libs/services/flowService'
import { formService } from '@/libs/services/formService'
import router from '@/router'
import { useLayoutStore } from '@/stores/layout'
import type { AxiosError } from 'axios'
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import { useConfirm } from 'primevue/useconfirm'
import { useDialog } from 'primevue/usedialog'
import { useToast } from 'primevue/usetoast'
import { type Ref, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { RouteLocationRaw } from 'vue-router'

export function useFormAction(pageInfo: Ref<FormPageInfoModel>) {
  const { t } = useI18n()
  const layoutStore = useLayoutStore()
  const toast = useToast()
  const dialog = useDialog()
  useConfirm()

  const save = ref<FormSaveViewModel>({})
  const approval = ref<FlowApprovalModel>({ formId: pageInfo.value.flowId })
  const approvalRes = ref<FlowApprovalViewModel>({})
  const routeTo = ref<RouteLocationRaw>()
  const commentDialog = ref<DynamicDialogInstance>()

  const applicationBtn = ref(new FormActionSetting(FormActionEnum.application, applicationAction))
  const approveBtn = ref(new FormActionSetting(FormActionEnum.approve, approveAction))
  const rejectBtn = ref(new FormActionSetting(FormActionEnum.reject, rejectAction))
  const returnBtn = ref(new FormActionSetting(FormActionEnum.return, returnAction))
  const recallBtn = ref(new FormActionSetting(FormActionEnum.recall, recallAction))
  const draftBtn = ref(new FormActionSetting(FormActionEnum.draft, draftAction))

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

    if (
      [FormActionEnum.approve, FormActionEnum.reject, FormActionEnum.return].includes(
        setting.actionType
      )
    ) {
      approvalRes.value = await flowService
        .approval(approval.value)
        .then(({ data }) => data)
        .catch((error: AxiosError) => {
          console.error(error)
          return { result: false, message: `${error.message}` }
        })

      if (!approvalRes.value.result) {
        const failKey =
          setting.actionType === FormActionEnum.return
            ? 'Message.Return_Fail'
            : 'Message.Approval_Fail'
        toast.add({
          severity: 'error',
          summary: t(failKey),
          detail: `${approvalRes.value.message}`,
          life: 5000
        })
        layoutStore.loading = false
        return
      }
    }

    if (setting.actionType === FormActionEnum.recall) {
      const recallRes = await formService
        .recall(pageInfo.value.formId!)
        .then(({ data }) => data)
        .catch((error: AxiosError) => {
          console.error(error)
          return { result: false, message: `${error.message}` }
        })

      if (!recallRes.result) {
        toast.add({
          severity: 'error',
          summary: t('Message.Recall_Fail'),
          detail: `${recallRes.message}`,
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

  async function commentAction(setting: FormActionSetting) {
    if (setting.validate && !(await setting.validate())) {
      return false
    }

    approval.value.comment = ''

    commentDialog.value = dialog.open(ActionDialog, {
      props: {
        header: t('Form.Approval.comment'),
        modal: true,
        style: { width: '50vw' },
        breakpoints: { '960px': '75vw', '640px': '90vw' }
      },
      data: { action: setting.actionType },
      onClose: () => {},
      emits: {
        onFlowSend: (e: FlowApprovalModel) => {
          approval.value.comment = e.comment
          handleClick(setting)
        }
      }
    })
  }

  async function applicationAction() {
    toast.add({
      severity: 'success',
      summary: t('Message.Application_Success'),
      detail: `${save.value.formId}`,
      life: 3000
    })

    routeTo.value = {
      name: 'form-detail-id',
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
      name: 'form-detail-id',
      params: {
        formPageAction: FormPageActionEnum.info,
        formClass: pageInfo.value.formClass,
        formId: pageInfo.value.formId
      }
    }
  }

  async function rejectAction() {
    await approveAction()
  }

  async function returnAction() {
    commentDialog.value?.close()

    toast.add({
      severity: 'warn',
      summary: t('Message.Return_Success'),
      life: 5000
    })

    routeTo.value = {
      name: 'form-detail-id',
      params: {
        formPageAction: FormPageActionEnum.info,
        formClass: pageInfo.value.formClass,
        formId: pageInfo.value.formId
      }
    }
  }

  async function recallAction() {
    toast.add({
      severity: 'success',
      summary: t('Message.Recall_Success'),
      life: 3000
    })

    routeTo.value = { name: 'form-my-applications' }
  }

  async function draftAction() {
    toast.add({
      severity: 'success',
      summary: t('Message.Draft_Saved'),
      detail: `${save.value.formId}`,
      life: 3000
    })
  }

  return {
    applicationBtn,
    approveBtn,
    rejectBtn,
    returnBtn,
    recallBtn,
    draftBtn,
    handleClick,
    commentAction
  }
}
