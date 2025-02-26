import formAPI from '@/libs/api/formAPI'
import type { AModel } from '@/libs/models/Form/A/A'
import type { FormSaveViewModel } from '@/libs/models/Form/FormModel'
import { ProductDetailModel } from '@/libs/models/Form/ProductDetail/ProductDetail'

class AService {
  readonly saveUrl = '/api/A/Save'
  readonly dataUrl = '/api/A/Data'

  save(data: AModel) {
    return formAPI.post<FormSaveViewModel>(this.saveUrl, data)
  }

  data(formId: string) {
    return formAPI.get<AModel>(`${this.dataUrl}/${formId}`).then((res) => {
      res.data.productDetail = res.data.productDetail?.map((item) => new ProductDetailModel(item))
      return res
    })
  }
}

export const aService = new AService()
