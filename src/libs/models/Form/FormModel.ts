export class FormBaseInfoModel {
  formId!: string
  serial!: string
  applicationId!: string
  applicationName!: string
  applicationDate!: Date
}

export class FormSaveViewModel {
  result!: boolean
  formId!: string
  message!: string
}
