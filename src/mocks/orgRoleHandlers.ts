import appConfig from '@/appConfig'
import { orgRoleList, orgRoleMap } from '@/faker/orgRole'
import { orgUserList, orgUserMap } from '@/faker/orgUser'
import type { OrgRole } from '@/libs/models/OrgRole/OrgRole'
import type { OrgRoleMember } from '@/libs/models/OrgRole/OrgRoleMember'
import type { OrgRoleQuery, OrgRoleQueryView } from '@/libs/models/OrgRole/OrgRoleQuery'
import type { QueryModel, QueryViewModel } from '@/libs/models/Query/QueryModel'
import { orgRoleService } from '@/libs/services/orgRoleService'
import { HttpResponse, delay, http } from 'msw'
import { v4 as uuid } from 'uuid'

export const orgRoleHandlers = [
  // POST /OrgRoles/Query
  http.post(`${appConfig.FORM_API}${orgRoleService.queryUrl}`, async ({ request }) => {
    await delay()
    const body = (await request.json()) as QueryModel<OrgRoleQuery>
    const { roleName } = body.filter ?? {}

    const filtered = orgRoleList.filter(
      (r) => !roleName || r.roleName.toLowerCase().includes(roleName.trim().toLowerCase())
    )

    const { pageIndex, pageSize } = body
    const start = pageIndex * pageSize
    const data: OrgRoleQueryView[] = filtered
      .slice(start, start + pageSize)
      .map(({ roleId, roleName, description }) => ({ roleId, roleName, description }))

    return HttpResponse.json({
      data,
      count: filtered.length,
      pageCount: Math.ceil(filtered.length / pageSize)
    } satisfies QueryViewModel<OrgRoleQueryView>)
  }),

  // GET /OrgRoles/:roleId
  http.get(`${appConfig.FORM_API}${orgRoleService.getOrgRoleUrl}/:roleId`, async ({ params }) => {
    await delay()
    const { roleId } = params
    const role = orgRoleMap[roleId as string]
    if (!role) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json(role)
  }),

  // POST /OrgRoles
  http.post(`${appConfig.FORM_API}${orgRoleService.getOrgRoleUrl}`, async ({ request }) => {
    await delay()
    const body = (await request.json()) as { roleName: string; description: string }
    const newRole: OrgRole = {
      roleId: uuid(),
      roleName: body.roleName,
      description: body.description,
      enable: true
    }
    orgRoleMap[newRole.roleId] = newRole
    orgRoleList.push(newRole)
    return HttpResponse.json(newRole, { status: 201 })
  }),

  // GET /OrgRoles/:roleId/Members
  http.get(
    `${appConfig.FORM_API}${orgRoleService.getOrgRoleUrl}/:roleId/Members`,
    async ({ params }) => {
      await delay()
      const { roleId } = params
      const members: OrgRoleMember[] = orgUserList
        .filter((u) => u.roleIds.includes(roleId as string))
        .map(({ userId, employeeId, userName }) => ({ userId, employeeId, userName }))
      return HttpResponse.json(members)
    }
  ),

  // POST /OrgRoles/:roleId/Members
  http.post(
    `${appConfig.FORM_API}${orgRoleService.getOrgRoleUrl}/:roleId/Members`,
    async ({ params, request }) => {
      await delay()
      const { roleId } = params
      const { userId } = (await request.json()) as { userId: string }
      const user = orgUserMap[userId]
      if (!user) return new HttpResponse(null, { status: 404 })
      if (!user.roleIds.includes(roleId as string)) {
        user.roleIds.push(roleId as string)
      }
      const member: OrgRoleMember = {
        userId: user.userId,
        employeeId: user.employeeId,
        userName: user.userName
      }
      return HttpResponse.json(member, { status: 201 })
    }
  ),

  // DELETE /OrgRoles/:roleId/Members/:userId
  http.delete(
    `${appConfig.FORM_API}${orgRoleService.getOrgRoleUrl}/:roleId/Members/:userId`,
    async ({ params }) => {
      await delay()
      const { roleId, userId } = params
      const user = orgUserMap[userId as string]
      if (!user) return new HttpResponse(null, { status: 404 })
      user.roleIds = user.roleIds.filter((id) => id !== roleId)
      return new HttpResponse(null, { status: 204 })
    }
  ),

  // PUT /OrgRoles/:roleId
  http.put(
    `${appConfig.FORM_API}${orgRoleService.getOrgRoleUrl}/:roleId`,
    async ({ params, request }) => {
      await delay()
      const { roleId } = params
      const role = orgRoleMap[roleId as string]
      if (!role) return new HttpResponse(null, { status: 404 })
      const body = (await request.json()) as { roleName: string; description: string }
      role.roleName = body.roleName
      role.description = body.description
      return HttpResponse.json(role)
    }
  )
]
