import formAPI from '../api/formAPI'
import type { OrgRole } from '../models/OrgRole/OrgRole'
import type { OrgRoleQuery, OrgRoleQueryView } from '../models/OrgRole/OrgRoleQuery'
import type { QueryModel, QueryViewModel } from '../models/Query/QueryModel'

class OrgRoleService {
  readonly queryUrl = '/OrgRoles/Query'
  readonly getOrgRoleUrl = '/OrgRoles'

  query(data: QueryModel<OrgRoleQuery>) {
    return formAPI.post<QueryViewModel<OrgRoleQueryView>>(this.queryUrl, data)
  }

  getOrgRole(roleId: string) {
    return formAPI.get<OrgRole>(`${this.getOrgRoleUrl}/${roleId}`)
  }

  createOrgRole(data: { roleName: string; description: string }) {
    return formAPI.post<OrgRole>(this.getOrgRoleUrl, data)
  }

  updateOrgRole(data: { roleId: string; roleName: string; description: string }) {
    return formAPI.put<OrgRole>(`${this.getOrgRoleUrl}/${data.roleId}`, data)
  }
}

export const orgRoleService = new OrgRoleService()
