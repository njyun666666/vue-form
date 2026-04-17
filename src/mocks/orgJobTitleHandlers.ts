import appConfig from '@/appConfig'
import { orgJobTitleList, orgJobTitleMap } from '@/faker/orgJobTitle'
import type { OrgJobTitle } from '@/libs/models/OrgJobTitle/OrgJobTitle'
import type {
  OrgJobTitleQuery,
  OrgJobTitleQueryView
} from '@/libs/models/OrgJobTitle/OrgJobTitleQuery'
import type { QueryModel, QueryViewModel } from '@/libs/models/Query/QueryModel'
import { orgJobTitleService } from '@/libs/services/orgJobTitleService'
import { HttpResponse, delay, http } from 'msw'
import { v4 as uuid } from 'uuid'

export const orgJobTitleHandlers = [
  // POST /OrgJobTitles/Query
  http.post(`${appConfig.FORM_API}${orgJobTitleService.queryUrl}`, async ({ request }) => {
    await delay()
    const body = (await request.json()) as QueryModel<OrgJobTitleQuery>
    const { jobTitleName } = body.filter ?? {}

    const filtered = orgJobTitleList.filter(
      (t) =>
        !jobTitleName || t.jobTitleName.toLowerCase().includes(jobTitleName.trim().toLowerCase())
    )

    const { pageIndex, pageSize } = body
    const start = pageIndex * pageSize
    const data: OrgJobTitleQueryView[] = filtered
      .slice(start, start + pageSize)
      .map(({ jobTitleId, jobTitleName, jobLevel }) => ({ jobTitleId, jobTitleName, jobLevel }))

    return HttpResponse.json({
      data,
      count: filtered.length,
      pageCount: Math.ceil(filtered.length / pageSize)
    } satisfies QueryViewModel<OrgJobTitleQueryView>)
  }),

  // GET /OrgJobTitles/:jobTitleId
  http.get(
    `${appConfig.FORM_API}${orgJobTitleService.getOrgJobTitleUrl}/:jobTitleId`,
    async ({ params }) => {
      await delay()
      const { jobTitleId } = params
      const item = orgJobTitleMap[jobTitleId as string]
      if (!item) return new HttpResponse(null, { status: 404 })
      return HttpResponse.json(item)
    }
  ),

  // POST /OrgJobTitles
  http.post(`${appConfig.FORM_API}${orgJobTitleService.getOrgJobTitleUrl}`, async ({ request }) => {
    await delay()
    const body = (await request.json()) as { jobTitleName: string; jobLevel: number }
    const newItem: OrgJobTitle = {
      jobTitleId: uuid(),
      jobTitleName: body.jobTitleName,
      jobLevel: body.jobLevel
    }
    orgJobTitleMap[newItem.jobTitleId] = newItem
    orgJobTitleList.push(newItem)
    return HttpResponse.json(newItem, { status: 201 })
  }),

  // PUT /OrgJobTitles/:jobTitleId
  http.put(
    `${appConfig.FORM_API}${orgJobTitleService.getOrgJobTitleUrl}/:jobTitleId`,
    async ({ params, request }) => {
      await delay()
      const { jobTitleId } = params
      const item = orgJobTitleMap[jobTitleId as string]
      if (!item) return new HttpResponse(null, { status: 404 })
      const body = (await request.json()) as { jobTitleName: string; jobLevel: number }
      item.jobTitleName = body.jobTitleName
      item.jobLevel = body.jobLevel
      return HttpResponse.json(item)
    }
  )
]
