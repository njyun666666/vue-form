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

  createOrgJobTitle(data: { jobTitleName: string; jobLevel: number }) {
    return formAPI.post<OrgJobTitle>(this.getOrgJobTitleUrl, data)
  }

  updateOrgJobTitle(data: { jobTitleId: string; jobTitleName: string; jobLevel: number }) {
    return formAPI.put<OrgJobTitle>(`${this.getOrgJobTitleUrl}/${data.jobTitleId}`, data)
  }
}

export const orgJobTitleService = new OrgJobTitleService()
