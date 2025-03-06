import formAPI from '../api/formAPI'
import type { OptionModel, OptionQueryModel } from '../models/Query/OptionModel'
import qs from 'qs'

class OptionService {
  readonly deptUrl = '/Option/Dept'
  readonly cityUrl = '/Option/City'
  readonly productCategoryUrl = '/Option/ProductCategory'

  dept(data: OptionQueryModel<string>) {
    return formAPI.get<OptionModel<string>[]>(this.deptUrl, {
      params: data,
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'comma' })
    })
  }

  city() {
    return formAPI.get<OptionModel<string>[]>(this.cityUrl)
  }

  productCategory() {
    return formAPI.get<OptionModel<string>[]>(this.productCategoryUrl)
  }
}

export const optionService = new OptionService()
