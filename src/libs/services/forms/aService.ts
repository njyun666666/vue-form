import formAPI from '@/libs/api/formAPI'
import { AModel } from '@/libs/models/Form/A/A'
import type { FormSaveViewModel } from '@/libs/models/Form/FormModel'

class AService {
  readonly saveUrl = '/A/Save'
  readonly dataUrl = '/A/Data'

  save(data: AModel) {
    return formAPI.post<FormSaveViewModel>(this.saveUrl, data)
  }

  data(formId: string) {
    return formAPI.get<AModel>(`${this.dataUrl}/${formId}`).then((res) => {
      res.data = new AModel(res.data)
      return res
    })
  }
}

export const aService = new AService()
