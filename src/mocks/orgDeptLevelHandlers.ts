import appConfig from '@/appConfig'
import { orgDeptLevelList, orgDeptLevelMap } from '@/faker/orgDeptLevel'
import type { OrgDeptLevel } from '@/libs/models/OrgDeptLevel/OrgDeptLevel'
import type {
  OrgDeptLevelQuery,
  OrgDeptLevelQueryView
} from '@/libs/models/OrgDeptLevel/OrgDeptLevelQuery'
import type { QueryModel, QueryViewModel } from '@/libs/models/Query/QueryModel'
import { orgDeptLevelService } from '@/libs/services/orgDeptLevelService'
import { HttpResponse, delay, http } from 'msw'
import { v4 as uuid } from 'uuid'

export const orgDeptLevelHandlers = [
  // POST /OrgDeptLevels/Query
  http.post(`${appConfig.FORM_API}${orgDeptLevelService.queryUrl}`, async ({ request }) => {
    await delay()
    const body = (await request.json()) as QueryModel<OrgDeptLevelQuery>
    const { levelName } = body.filter ?? {}

    const filtered = orgDeptLevelList.filter(
      (l) => !levelName || l.levelName.toLowerCase().includes(levelName.trim().toLowerCase())
    )

    const { pageIndex, pageSize } = body
    const start = pageIndex * pageSize
    const data: OrgDeptLevelQueryView[] = filtered
      .slice(start, start + pageSize)
      .map(({ levelId, levelName, level }) => ({ levelId, levelName, level }))

    return HttpResponse.json({
      data,
      count: filtered.length,
      pageCount: Math.ceil(filtered.length / pageSize)
    } satisfies QueryViewModel<OrgDeptLevelQueryView>)
  }),

  // GET /OrgDeptLevels/:levelId
  http.get(
    `${appConfig.FORM_API}${orgDeptLevelService.getOrgDeptLevelUrl}/:levelId`,
    async ({ params }) => {
      await delay()
      const { levelId } = params
      const level = orgDeptLevelMap[levelId as string]
      if (!level) return new HttpResponse(null, { status: 404 })
      return HttpResponse.json(level)
    }
  ),

  // POST /OrgDeptLevels
  http.post(
    `${appConfig.FORM_API}${orgDeptLevelService.getOrgDeptLevelUrl}`,
    async ({ request }) => {
      await delay()
      const body = (await request.json()) as { levelName: string; level: number }
      const newLevel: OrgDeptLevel = {
        levelId: uuid(),
        levelName: body.levelName,
        level: body.level
      }
      orgDeptLevelMap[newLevel.levelId] = newLevel
      orgDeptLevelList.push(newLevel)
      return HttpResponse.json(newLevel, { status: 201 })
    }
  ),

  // PUT /OrgDeptLevels/:levelId
  http.put(
    `${appConfig.FORM_API}${orgDeptLevelService.getOrgDeptLevelUrl}/:levelId`,
    async ({ params, request }) => {
      await delay()
      const { levelId } = params
      const item = orgDeptLevelMap[levelId as string]
      if (!item) return new HttpResponse(null, { status: 404 })
      const body = (await request.json()) as { levelName: string; level: number }
      item.levelName = body.levelName
      item.level = body.level
      return HttpResponse.json(item)
    }
  )
]
