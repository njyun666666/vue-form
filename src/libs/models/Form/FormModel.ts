import type { FormActionEnum, FormClassEnum, FormPageActionEnum } from '@/libs/enums/FormTypes'

export interface FormApplication {
  groupId: string
  list: FormClass[]
}

export interface FormClass {
  formClass: string
}

export class FormBaseInfoModel {
  formId?: string
  formClass?: string
  applicantId?: string
  applicantName?: string
  applicationDate?: Date
  description?: string
  flowId?: string
}

export class PendingApprovalModel extends FormBaseInfoModel {
  approvalId?: string
  arrivedDate?: Date
  approverId?: string
  approverName?: string
  stepId?: string
  stepName?: string
}

export class FormSaveViewModel {
  result?: boolean
  formId?: string
  formClass?: string
  message?: string
}

export interface FormCheckAuthViewModel {
  formPageAction: FormPageActionEnum[]
  flowId?: string
  stepId: string
  flow?: Record<string, unknown>
}

export class FormPageInfoModel {
  formPageAction!: FormPageActionEnum
  formClass!: FormClassEnum
  formId?: string
  flowId?: string
  stepId!: string
}
