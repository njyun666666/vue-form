import appConfig from '@/appConfig'
import { getLevelName, orgDeptMap, orgDeptQueryViewList } from '@/faker/orgDept'
import type { OrgDept } from '@/libs/models/OrgDept/OrgDept'
import type { OrgDeptQuery } from '@/libs/models/OrgDept/OrgDeptQuery'
import type { QueryModel, QueryViewModel } from '@/libs/models/Query/QueryModel'
import { orgDeptService } from '@/libs/services/orgDeptService'
import { HttpResponse, delay, http } from 'msw'
import { v4 as uuid } from 'uuid'

type DeptBody = { deptName: string; parentDeptId: string | null; levelId: string | null }

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
  }),

  // POST /OrgDepts
  http.post(`${appConfig.FORM_API}${orgDeptService.getOrgDeptUrl}`, async ({ request }) => {
    await delay()
    const body = (await request.json()) as DeptBody
    const newDept: OrgDept = {
      deptId: uuid(),
      deptName: body.deptName,
      parentDeptId: body.parentDeptId ?? undefined,
      levelId: body.levelId ?? undefined,
      rootDeptId: body.parentDeptId ? (orgDeptMap[body.parentDeptId]?.rootDeptId ?? '') : '',
      enable: true,
      expand: false
    }
    orgDeptMap[newDept.deptId] = newDept
    orgDeptQueryViewList.push({
      deptId: newDept.deptId,
      deptName: newDept.deptName,
      levelName: getLevelName(newDept.levelId)
    })
    return HttpResponse.json(newDept, { status: 201 })
  }),

  // PUT /OrgDepts/:deptId
  http.put(
    `${appConfig.FORM_API}${orgDeptService.getOrgDeptUrl}/:deptId`,
    async ({ params, request }) => {
      await delay()
      const { deptId } = params
      const dept = orgDeptMap[deptId as string]
      if (!dept) return new HttpResponse(null, { status: 404 })
      const body = (await request.json()) as DeptBody
      dept.deptName = body.deptName
      dept.parentDeptId = body.parentDeptId ?? undefined
      dept.levelId = body.levelId ?? undefined
      const listItem = orgDeptQueryViewList.find((d) => d.deptId === deptId)
      if (listItem) {
        listItem.deptName = body.deptName
        listItem.levelName = getLevelName(body.levelId ?? undefined)
      }
      return HttpResponse.json(dept)
    }
  )
]
