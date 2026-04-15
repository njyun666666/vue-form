import type { FormActionEnum } from '@/libs/enums/FormTypes'

export class FlowApprovalModel {
  formId?: string
  approvalId?: string
  action?: FormActionEnum
  comment?: string
}

export class FlowApprovalViewModel {
  result?: boolean
  message?: string
  formId?: string
  nextApproverId?: string
  nextApproverName?: string
  nextStep?: number
  nextStepName?: string
}

export class FlowListItem {
  flowId?: string
  flowName?: string
  modifiedAt?: string
  modifiedBy?: string
}

export class FlowSaveModel {
  flowId?: string
  flowName?: string
  flowSetting?: Record<string, unknown>
}
