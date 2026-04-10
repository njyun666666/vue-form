import formAPI from '../api/formAPI'
import type { OrgUser } from '../models/OrgUser/OrgUser'
import type { OrgUserQuery, OrgUserQueryView } from '../models/OrgUser/OrgUserQuery'
import type { QueryModel, QueryViewModel } from '../models/Query/QueryModel'

class OrgUserService {
  readonly queryUrl = '/OrgUsers/Query'
  readonly getOrgUserUrl = '/OrgUsers'

  query(data: QueryModel<OrgUserQuery>) {
    return formAPI.post<QueryViewModel<OrgUserQueryView>>(this.queryUrl, data)
  }

  getOrgUser(userId: string) {
    return formAPI.get<OrgUser>(`${this.getOrgUserUrl}/${userId}`)
  }

  saveOrgUser(data: OrgUser) {
    return formAPI.post<OrgUser>(this.getOrgUserUrl, data)
  }
}

export const orgUserService = new OrgUserService()
