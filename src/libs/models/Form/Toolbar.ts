import type { FormSaveViewModel } from './FormModel'
import type { FormActionType } from '@/libs/types/FormTypes'

export class FormActionSetting {
  actionType!: FormActionType
  display!: boolean
  beforeAction?: () => Promise<boolean | void>
  saveAction?: () => Promise<boolean | FormSaveViewModel>
  action!: () => Promise<boolean | void>
  afterAction?: () => Promise<boolean | void>
  validate?: () => Promise<boolean | void>
  loading!: boolean

  constructor(actionType: FormActionType, action: () => Promise<boolean | void>) {
    this.actionType = actionType
    this.display = false
    this.action = action
  }
}

export class ActionDialogProps {
  action?: FormActionType
}
