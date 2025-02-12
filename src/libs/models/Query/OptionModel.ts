export interface OptionQueryModel<T> {
  initValues?: T[]
  input?: string
}

export interface OptionModel<T> {
  value: T
  label: string
}

export interface OptionGroupModel<T> {
  label: string
  items: OptionModel<T>[]
}
