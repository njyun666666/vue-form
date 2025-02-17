import type { FormSaveViewModel } from './FormModel'

export class FormActionSetting {
  display!: boolean
  beforeAction?: () => Promise<boolean | void>
  saveAction?: () => Promise<boolean | FormSaveViewModel>
  action!: () => Promise<boolean | void>
  afterAction?: () => Promise<boolean | void>
  loading!: boolean

  constructor(action: () => Promise<void>) {
    this.display = false
    this.action = action
  }
}
