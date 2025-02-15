import formAPI from '../api/formAPI'
import type { FormApplication, FormCheckAuthViewModel } from '../models/Form/Form'
import type { FormClassType, FormPageType } from '../types/FormTypes'

class FormService {
  readonly applicationListUrl = '/api/Form/applicationList'
  readonly checkAuthUrl = '/api/Form/checkAuth'

  applicationList() {
    return formAPI.get<FormApplication[]>(this.applicationListUrl)
  }

  checkAuth(formPageType: FormPageType, formClass: FormClassType, formId: string) {
    return formAPI.get<FormCheckAuthViewModel>(
      `/api/Form/checkAuth/${formPageType}/${formClass}/${formId ?? ''}`
    )
  }
}

export const formService = new FormService()
