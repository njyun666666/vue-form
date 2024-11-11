import formAPI from '../api/formAPI'
import type { OrgDept } from '../models/OrgDept/OrgDept'
import type { OrgDeptQuery, OrgDeptQueryView } from '../models/OrgDept/OrgDeptQuery'
import type { QueryModel, QueryViewModel } from '../models/Query/QueryModel'

class OrgDeptService {
  readonly queryUrl = '/api/OrgDepts/Query'
  readonly getOrgDeptUrl = '/api/OrgDepts'

  query(data: QueryModel<OrgDeptQuery>) {
    return formAPI.post<QueryViewModel<OrgDeptQueryView>>(this.queryUrl, data)
  }

  getOrgDept(deptId: string) {
    return formAPI.get<OrgDept>(`${this.getOrgDeptUrl}/${deptId}`)
  }
}

export const orgDeptService = new OrgDeptService()
