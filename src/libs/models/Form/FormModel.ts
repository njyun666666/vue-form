import { FormPageAction } from './../../types/FormTypes'
import type { FormClassType, FormPageActionType } from '@/libs/types/FormTypes'

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
  applicationId?: string
  applicationName?: string
  applicationDate?: Date
}

export class FormSaveViewModel {
  result?: boolean
  formId?: string
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
