import formAPI from '../api/formAPI'
import type { OrgUserQuery, OrgUserQueryView } from '../models/OrgUser/OrgUserQuery'
import type { QueryModel, QueryViewModel } from '../models/Query/QueryModel'

class OrgUserService {
  readonly queryUrl = '/OrgUsers/Query'
  readonly getOrgUserUrl = '/OrgUsers'

  query(data: QueryModel<OrgUserQuery>) {
    return formAPI.post<QueryViewModel<OrgUserQueryView>>(this.queryUrl, data)
  }
}

export const orgUserService = new OrgUserService()
