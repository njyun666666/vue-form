import formAPI from '@/libs/api/formAPI'
import type { AModel } from '@/libs/models/Form/A/A'
import type { FormSaveViewModel } from '@/libs/models/Form/FormModel'

class AService {
  readonly saveUrl = '/api/A/Save'

  save(data: AModel) {
    return formAPI.post<FormSaveViewModel>(this.saveUrl, data)
  }
}
export const aService = new AService()
