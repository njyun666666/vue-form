import formAPI from '../api/formAPI'
import type { OrgJobTitle } from '../models/OrgJobTitle/OrgJobTitle'
import type { OrgJobTitleQuery, OrgJobTitleQueryView } from '../models/OrgJobTitle/OrgJobTitleQuery'
import type { QueryModel, QueryViewModel } from '../models/Query/QueryModel'

class OrgJobTitleService {
  readonly queryUrl = '/OrgJobTitles/Query'
  readonly getOrgJobTitleUrl = '/OrgJobTitles'

  query(data: QueryModel<OrgJobTitleQuery>) {
    return formAPI.post<QueryViewModel<OrgJobTitleQueryView>>(this.queryUrl, data)
  }

  getOrgJobTitle(jobTitleId: string) {
    return formAPI.get<OrgJobTitle>(`${this.getOrgJobTitleUrl}/${jobTitleId}`)
  }

  saveOrgJobTitle(data: OrgJobTitle) {
    if (data.jobTitleId) {
      return formAPI.put<OrgJobTitle>(`${this.getOrgJobTitleUrl}/${data.jobTitleId}`, data)
    }
    return formAPI.post<OrgJobTitle>(this.getOrgJobTitleUrl, data)
  }
}

export const orgJobTitleService = new OrgJobTitleService()
