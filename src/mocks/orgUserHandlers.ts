import appConfig from '@/appConfig'
import { orgJobTitleMap } from '@/faker/orgJobTitle'
import { orgUserList, orgUserMap } from '@/faker/orgUser'
import type { OrgUser } from '@/libs/models/OrgUser/OrgUser'
import type { OrgUserDept } from '@/libs/models/OrgUser/OrgUserDept'
import type { OrgUserQuery, OrgUserQueryView } from '@/libs/models/OrgUser/OrgUserQuery'
import type { QueryModel, QueryViewModel } from '@/libs/models/Query/QueryModel'
import { orgUserService } from '@/libs/services/orgUserService'
import { HttpResponse, delay, http } from 'msw'
import { v4 as uuid } from 'uuid'

function resolvePrimaryDept(user: OrgUser): { deptName: string; jobTitle: string } {
  const primary = user.userDepts.find((d) => d.isPrimary) ?? user.userDepts[0]
  return { deptName: primary?.deptName ?? '', jobTitle: primary?.jobTitleName ?? '' }
}

function buildUserDepts(payloads: OrgUserDept[]): OrgUserDept[] {
  return payloads.map((p) => {
    const jobTitle = orgJobTitleMap[p.jobTitleId]
    return {
      userDeptId: p.userDeptId ?? uuid(),
      deptId: p.deptId,
      deptName: '',
      jobTitleId: p.jobTitleId,
      jobTitleName: jobTitle?.jobTitleName ?? '',
      isPrimary: p.isPrimary,
      isDeptManager: p.isDeptManager
    }
  })
}

export const orgUserHandlers = [
  // POST /OrgUsers/Query
  http.post(`${appConfig.FORM_API}${orgUserService.queryUrl}`, async ({ request }) => {
    await delay()
    const body = (await request.json()) as QueryModel<OrgUserQuery>
    const { employeeId, userName, deptId } = body.filter ?? {}

    const filtered = orgUserList.filter(
      (u) =>
        (!employeeId || u.employeeId.toLowerCase().includes(employeeId.trim().toLowerCase())) &&
        (!userName || u.userName.includes(userName.trim())) &&
        (!deptId || u.userDepts.some((d) => d.deptId === deptId))
    )

    const { pageIndex, pageSize } = body
    const start = pageIndex * pageSize
    const data: OrgUserQueryView[] = filtered.slice(start, start + pageSize).map((u) => {
      const { deptName, jobTitle } = resolvePrimaryDept(u)
      return {
        userId: u.userId,
        employeeId: u.employeeId,
        userName: u.userName,
        deptName,
        jobTitle
      }
    })

    return HttpResponse.json({
      data,
      count: filtered.length,
      pageCount: Math.ceil(filtered.length / pageSize)
    } satisfies QueryViewModel<OrgUserQueryView>)
  }),

  // GET /OrgUsers/:userId
  http.get(`${appConfig.FORM_API}${orgUserService.getOrgUserUrl}/:userId`, async ({ params }) => {
    await delay()
    const { userId } = params
    const user = orgUserMap[userId as string]
    if (!user) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json(user)
  }),

  // POST /OrgUsers
  http.post(`${appConfig.FORM_API}${orgUserService.getOrgUserUrl}`, async ({ request }) => {
    await delay()
    const body = (await request.json()) as OrgUser
    const newUser: OrgUser = {
      userId: uuid(),
      employeeId: body.employeeId,
      userName: body.userName,
      userDepts: buildUserDepts(body.userDepts ?? []),
      enable: body.enable
    }
    orgUserMap[newUser.userId] = newUser
    orgUserList.push(newUser)
    return HttpResponse.json(newUser, { status: 201 })
  }),

  // PUT /OrgUsers/:userId
  http.put(
    `${appConfig.FORM_API}${orgUserService.getOrgUserUrl}/:userId`,
    async ({ params, request }) => {
      await delay()
      const { userId } = params
      const user = orgUserMap[userId as string]
      if (!user) return new HttpResponse(null, { status: 404 })
      const body = (await request.json()) as OrgUser
      user.employeeId = body.employeeId
      user.userName = body.userName
      user.enable = body.enable
      user.userDepts = buildUserDepts(body.userDepts ?? [])
      return HttpResponse.json(user)
    }
  )
]
