import type { FormPageType } from '@/libs/types/FormTypes'

export interface FormApplication {
  groupId: string
  groupName: string
  list: FormClass[]
}

export interface FormClass {
  formClass: string
  formClassName: string
}

export interface FormCheckAuthViewModel {
  formPageType: FormPageType[]
}
