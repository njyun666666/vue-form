import formAPI from '../api/formAPI'
import type {
  FormApplication,
  FormCheckAuthViewModel,
  FormPageInfoModel
} from '../models/Form/FormModel'

class FormService {
  readonly applicationListUrl = '/api/Form/applicationList'
  readonly checkAuthUrl = '/api/Form/checkAuth'

  applicationList() {
    return formAPI.get<FormApplication[]>(this.applicationListUrl)
  }

  checkAuth(pageInfo: FormPageInfoModel) {
    return formAPI.get<FormCheckAuthViewModel>(
      `/api/Form/checkAuth/${pageInfo.formPageAction}/${pageInfo.formClass}/${pageInfo.formId ?? ''}`
    )
  }
}

export const formService = new FormService()
