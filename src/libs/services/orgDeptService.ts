import formAPI from '../api/formAPI'
import type { OrgDeptModel, OrgDeptViewModel } from '../models/OrgDept/OrgDeptModel'
import type { QueryModel, QueryViewModel } from '../models/Query/QueryModel'

class OrgDeptService {
  readonly queryUrl = '/api/OrgDepts/Query'

  query(data: QueryModel<OrgDeptModel>) {
    return formAPI.post<QueryViewModel<OrgDeptViewModel>>(this.queryUrl, data)
  }
}

export const orgDeptService = new OrgDeptService()
