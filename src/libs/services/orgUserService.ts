import formAPI from '../api/formAPI'
import type { OrgUser } from '../models/OrgUser/OrgUser'
import type { OrgUserDept } from '../models/OrgUser/OrgUserDept'
import type { OrgUserQuery, OrgUserQueryView } from '../models/OrgUser/OrgUserQuery'
import type { QueryModel, QueryViewModel } from '../models/Query/QueryModel'

export interface UserDeptPayload {
  userDeptId?: string
  deptId: string
  jobTitleId: string
  isPrimary: boolean
}

class OrgUserService {
  readonly queryUrl = '/OrgUsers/Query'
  readonly getOrgUserUrl = '/OrgUsers'

  query(data: QueryModel<OrgUserQuery>) {
    return formAPI.post<QueryViewModel<OrgUserQueryView>>(this.queryUrl, data)
  }

  getOrgUser(userId: string) {
    return formAPI.get<OrgUser>(`${this.getOrgUserUrl}/${userId}`)
  }

  createOrgUser(data: { employeeId: string; userName: string; userDepts: UserDeptPayload[] }) {
    return formAPI.post<OrgUser>(this.getOrgUserUrl, data)
  }

  updateOrgUser(data: {
    userId: string
    employeeId: string
    userName: string
    userDepts: UserDeptPayload[]
  }) {
    return formAPI.put<OrgUser>(`${this.getOrgUserUrl}/${data.userId}`, data)
  }
}

export const orgUserService = new OrgUserService()
