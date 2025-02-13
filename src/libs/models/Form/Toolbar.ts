export class FormActionSetting {
  display!: boolean
  action!: () => void
  beforeAction?: () => void
  afterAction?: () => void

  constructor(action: () => void) {
    this.display = false
    this.action = action
  }
}
