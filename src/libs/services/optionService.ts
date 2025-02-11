import formAPI from '../api/formAPI'
import type { OptionModel, OptionQueryModel } from '../models/Query/OptionModel'
import qs from 'qs'

class OptionService {
  readonly deptUrl = '/api/Option/Dept'

  dept(data: OptionQueryModel<string>) {
    return formAPI.get<OptionModel<string>[]>(this.deptUrl, {
      params: data,
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'comma' })
    })
  }
}

export const optionService = new OptionService()
