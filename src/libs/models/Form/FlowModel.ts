import type { FormActionType } from '@/libs/types/FormTypes'

export class FlowApprovalModel {
  formId?: string
  approvalId?: string
  action?: FormActionType
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
