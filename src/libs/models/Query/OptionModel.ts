export interface OptionQueryModel<T> {
  initValues?: T[]
  input?: string
}

export interface OptionModel<T, TData = any> {
  value: T
  label: string
  data?: TData
}

export interface OptionGroupModel<T, TData = any> {
  label: string
  items: OptionModel<T, TData>[]
}
