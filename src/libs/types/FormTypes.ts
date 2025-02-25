export const FormPageAction = {
  application: 'application',
  info: 'info',
  approval: 'approval'
}

export const FormFieldMode = {
  required: 'required',
  optional: 'optional',
  readonly: 'readonly',
  invisibility: 'invisibility'
}

export const FormApprovalAction = {
  approve: 'approve',
  reject: 'reject'
}

export const FormClass = {
  A: 'A',
  B: 'B'
}

export type FormPageActionType = keyof typeof FormPageAction
export type FormFieldModeType = keyof typeof FormFieldMode
export type FormApprovalActionType = keyof typeof FormApprovalAction
export type FormClassType = keyof typeof FormClass
