import type { FormActionEnum, FormClassEnum, FormPageActionEnum } from '@/libs/enums/FormTypes'

export interface FormApplication {
  groupId: string
  groupName: string
  list: FormClass[]
}

export interface FormClass {
  formClass: string
  formClassName: string
}

export class FormBaseInfoModel {
  formId?: string
  formClass?: string
  applicationId?: string
  applicationName?: string
  applicationDate?: Date
  description?: string
}

export class PendingApprovalModel extends FormBaseInfoModel {
  approvalId?: string
  arrivedDate?: Date
  approverId?: string
  approverName?: string
  stepId?: number
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
  step: number
}

export class FormPageInfoModel {
  formPageAction!: FormPageActionEnum
  formClass!: FormClassEnum
  formId?: string
  flowId?: string
  step!: number
}
