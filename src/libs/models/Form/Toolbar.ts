import type { FormSaveViewModel } from './FormModel'
import type { FormApprovalActionType } from '@/libs/types/FormTypes'

export class FormActionSetting {
  display!: boolean
  beforeAction?: () => Promise<boolean | void>
  saveAction?: () => Promise<boolean | FormSaveViewModel>
  action!: () => Promise<boolean | void>
  afterAction?: () => Promise<boolean | void>
  loading!: boolean

  constructor(action: () => Promise<boolean | void>) {
    this.display = false
    this.action = action
  }
}

export class ActionDialogProps {
  action?: FormApprovalActionType
}
