import type {
  FormApprovalActionType,
  FormClassType,
  FormPageActionType
} from '@/libs/types/FormTypes'

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
  formPageAction: FormPageActionType[]
  flowId?: string
  step: number
}

export class FormPageInfoModel {
  formPageAction!: FormPageActionType
  formClass!: FormClassType
  formId?: string
  flowId?: string
  step!: number
}

export class ApprovalModel {
  formId?: string
  approvalId?: string
  action?: FormApprovalActionType
  comment?: string
}
