import formAPI from '../api/formAPI'
import type { FormApplication } from '../models/Form/Form'

class FormService {
  readonly applicationListUrl = '/api/Form/applicationList'
  applicationList() {
    return formAPI.get<FormApplication[]>(this.applicationListUrl)
  }
}

export const formService = new FormService()
