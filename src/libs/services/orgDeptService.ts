import formAPI from '../api/formAPI'
import type { OrgDept } from '../models/OrgDept/OrgDept'
import type { OrgDeptQuery, OrgDeptQueryView } from '../models/OrgDept/OrgDeptQuery'
import type { QueryModel, QueryViewModel } from '../models/Query/QueryModel'

class OrgDeptService {
  readonly queryUrl = '/OrgDepts/Query'
  readonly getOrgDeptUrl = '/OrgDepts'

  query(data: QueryModel<OrgDeptQuery>) {
    return formAPI.post<QueryViewModel<OrgDeptQueryView>>(this.queryUrl, data)
  }

  getOrgDept(deptId: string) {
    return formAPI.get<OrgDept>(`${this.getOrgDeptUrl}/${deptId}`)
  }

  saveOrgDept(data: OrgDept) {
    if (data.deptId) {
      return formAPI.put<OrgDept>(`${this.getOrgDeptUrl}/${data.deptId}`, data)
    }
    return formAPI.post<OrgDept>(this.getOrgDeptUrl, data)
  }
}

export const orgDeptService = new OrgDeptService()
