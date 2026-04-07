import appConfig from '@/appConfig'
import { orgUserList } from '@/faker/orgUser'
import type { OrgUserQuery, OrgUserQueryView } from '@/libs/models/OrgUser/OrgUserQuery'
import type { QueryModel, QueryViewModel } from '@/libs/models/Query/QueryModel'
import { orgUserService } from '@/libs/services/orgUserService'
import { HttpResponse, delay, http } from 'msw'

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
        (!deptId || u.deptId === deptId)
    )

    const { pageIndex, pageSize } = body
    const start = pageIndex * pageSize
    const data: OrgUserQueryView[] = filtered
      .slice(start, start + pageSize)
      .map(({ userId, employeeId, userName, deptName, jobTitle }) => ({
        userId,
        employeeId,
        userName,
        deptName,
        jobTitle
      }))

    return HttpResponse.json({
      data,
      count: filtered.length,
      pageCount: Math.ceil(filtered.length / pageSize)
    } satisfies QueryViewModel<OrgUserQueryView>)
  })
]
