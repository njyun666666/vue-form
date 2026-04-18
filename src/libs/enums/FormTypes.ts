export enum FormPageActionEnum {
  application = 'application',
  info = 'info',
  approval = 'approval'
}

export enum FormFieldModeEnum {
  required = 'required',
  optional = 'optional',
  readonly = 'readonly',
  invisibility = 'invisibility'
}

export enum FormActionEnum {
  application = 'application',
  approve = 'approve',
  reject = 'reject',
  return = 'return',
  recall = 'recall',
  draft = 'draft',
  close = 'close'
}

export enum FormStatusEnum {
  draft = 'draft',
  pending = 'pending',
  approved = 'approved',
  rejected = 'rejected',
  returned = 'returned',
  recalled = 'recalled'
}

export enum FormClassEnum {
  A = 'A',
  B = 'B'
}
