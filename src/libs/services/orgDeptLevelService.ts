import formAPI from '../api/formAPI'
import type { OrgDeptLevel } from '../models/OrgDeptLevel/OrgDeptLevel'
import type {
  OrgDeptLevelQuery,
  OrgDeptLevelQueryView
} from '../models/OrgDeptLevel/OrgDeptLevelQuery'
import type { QueryModel, QueryViewModel } from '../models/Query/QueryModel'

class OrgDeptLevelService {
  readonly queryUrl = '/OrgDeptLevels/Query'
  readonly getOrgDeptLevelUrl = '/OrgDeptLevels'

  query(data: QueryModel<OrgDeptLevelQuery>) {
    return formAPI.post<QueryViewModel<OrgDeptLevelQueryView>>(this.queryUrl, data)
  }

  getOrgDeptLevel(levelId: string) {
    return formAPI.get<OrgDeptLevel>(`${this.getOrgDeptLevelUrl}/${levelId}`)
  }

  saveOrgDeptLevel(data: OrgDeptLevel) {
    if (data.levelId) {
      return formAPI.put<OrgDeptLevel>(`${this.getOrgDeptLevelUrl}/${data.levelId}`, data)
    }
    return formAPI.post<OrgDeptLevel>(this.getOrgDeptLevelUrl, data)
  }
}

export const orgDeptLevelService = new OrgDeptLevelService()
