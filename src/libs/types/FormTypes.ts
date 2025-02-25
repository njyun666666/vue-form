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

export const FormClass = {
  A: 'A',
  B: 'B'
}

export type FormPageActionType = keyof typeof FormPageAction
export type FormClassType = keyof typeof FormClass
export type FormFieldModeType = keyof typeof FormFieldMode
