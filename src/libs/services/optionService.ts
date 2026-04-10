import formAPI from '../api/formAPI'
import type { OptionModel, OptionQueryModel } from '../models/Query/OptionModel'
import qs from 'qs'

class OptionService {
  readonly deptUrl = '/Option/Dept'
  readonly deptLevelUrl = '/Option/DeptLevel'
  readonly cityUrl = '/Option/City'
  readonly productCategoryUrl = '/Option/ProductCategory'
  readonly jobTitleUrl = '/Option/JobTitle'
  readonly roleUrl = '/Option/Role'
  readonly userUrl = '/Option/User'

  deptLevel() {
    return formAPI.get<OptionModel<string>[]>(this.deptLevelUrl)
  }

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

  jobTitle() {
    return formAPI.get<OptionModel<string>[]>(this.jobTitleUrl)
  }

  role() {
    return formAPI.get<OptionModel<string>[]>(this.roleUrl)
  }

  user() {
    return formAPI.get<OptionModel<string>[]>(this.userUrl)
  }
}

export const optionService = new OptionService()
