import appConfig from '@/appConfig'
import { orgDeptMap, orgDeptQueryViewList } from '@/faker/orgDept'
import type { OrgDeptQuery } from '@/libs/models/OrgDept/OrgDeptQuery'
import type { QueryModel, QueryViewModel } from '@/libs/models/Query/QueryModel'
import { orgDeptService } from '@/libs/services/orgDeptService'
import { HttpResponse, delay, http } from 'msw'

export const orgDeptHandlers = [
  // POST /OrgDepts/Query
  http.post(`${appConfig.FORM_API}${orgDeptService.queryUrl}`, async ({ request }) => {
    await delay()
    const body = (await request.json()) as QueryModel<OrgDeptQuery>
    const keyword = body.filter?.deptName?.trim().toLowerCase() ?? ''

    const filtered = keyword
      ? orgDeptQueryViewList.filter((d) => d.deptName.toLowerCase().includes(keyword))
      : orgDeptQueryViewList

    const { pageIndex, pageSize } = body
    const start = pageIndex * pageSize
    const data = filtered.slice(start, start + pageSize)

    return HttpResponse.json({
      data,
      count: filtered.length,
      pageCount: Math.ceil(filtered.length / pageSize)
    } satisfies QueryViewModel<(typeof orgDeptQueryViewList)[number]>)
  }),

  // GET /OrgDepts/:deptId
  http.get(`${appConfig.FORM_API}${orgDeptService.getOrgDeptUrl}/:deptId`, async ({ params }) => {
    await delay()
    const { deptId } = params
    const dept = orgDeptMap[deptId as string]
    if (!dept) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json(dept)
  })
]
