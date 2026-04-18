import type { FlowSaveModel } from '../Flow/FlowModel'
import type {
  FormActionEnum,
  FormClassEnum,
  FormPageActionEnum,
  FormStatusEnum
} from '@/libs/enums/FormTypes'

export class ApprovalHistoryItemModel {
  stepId?: string
  approverName?: string
  result?: FormActionEnum
  comment?: string
  approvalTime?: Date
}

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
  status?: FormStatusEnum
}

export class PendingApprovalModel extends FormBaseInfoModel {
  approvalId?: string
  arrivedDate?: Date
  approverId?: string
  approverName?: string
  stepId?: string
  stepName?: string
}

export class MyApplicationModel extends FormBaseInfoModel {}

export class MyHandledModel extends FormBaseInfoModel {
  stepName?: string
  action?: FormActionEnum
  comment?: string
  approvalTime?: Date
}

export class FormSaveViewModel {
  result?: boolean
  formId?: string
  formClass?: string
  message?: string
  isDraft?: boolean
}

export interface FormCheckAuthViewModel {
  formPageAction: FormPageActionEnum[]
  flowId?: string
  stepId: string
  flow?: FlowSaveModel
  formStatus?: FormStatusEnum
  canRecall?: boolean
}

export class FormPageInfoModel {
  formPageAction!: FormPageActionEnum
  formClass!: FormClassEnum
  formId?: string
  flowId?: string
  stepId!: string
  flow?: FlowSaveModel
  formStatus?: FormStatusEnum
  canRecall?: boolean
}
