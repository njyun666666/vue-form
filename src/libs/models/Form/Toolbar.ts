import type { FormSaveViewModel } from './FormModel'
import type { FormActionEnum } from '@/libs/enums/FormTypes'

export class FormActionSetting {
  actionType!: FormActionEnum
  display!: boolean
  beforeAction?: () => Promise<boolean | void>
  saveAction?: () => Promise<boolean | FormSaveViewModel>
  action!: () => Promise<boolean | void>
  afterAction?: () => Promise<boolean | void>
  validate?: () => Promise<boolean | void>
  loading!: boolean

  constructor(actionType: FormActionEnum, action: () => Promise<boolean | void>) {
    this.actionType = actionType
    this.display = false
    this.action = action
  }
}

export class ActionDialogProps {
  action?: FormActionEnum
}
