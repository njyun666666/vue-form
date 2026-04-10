import appConfig from '@/appConfig'
import { orgDeptList } from '@/faker/orgDept'
import { orgUserList } from '@/faker/orgUser'
import type { OrgDept } from '@/libs/models/OrgDept/OrgDept'
import type { OrgTreeNode } from '@/libs/models/OrgTree/OrgTreeNode'
import type { OrgUser } from '@/libs/models/OrgUser/OrgUser'
import { orgTreeService } from '@/libs/services/orgTreeService'
import { HttpResponse, delay, http } from 'msw'

function buildTree(
  parentId: string | undefined,
  deptChildrenMap: Record<string, OrgDept[]>,
  deptUserMap: Record<string, OrgUser[]>
): OrgTreeNode[] {
  const key = parentId ?? '__root__'
  const depts = deptChildrenMap[key] ?? []

  return depts.map((dept) => {
    const users = deptUserMap[dept.deptId] ?? []
    const userNodes: OrgTreeNode[] = users.map((u) => {
      const primaryDept = u.userDepts.find((d) => d.isPrimary) ?? u.userDepts[0]
      return {
        type: 'user',
        id: u.userId,
        label: u.userName,
        jobTitle: primaryDept?.jobTitleName,
        isManager: u.userDepts.some((d) => d.deptId === dept.deptId && d.isDeptManager)
      }
    })
    const childDeptNodes = buildTree(dept.deptId, deptChildrenMap, deptUserMap)
    return {
      type: 'dept',
      id: dept.deptId,
      label: dept.deptName,
      children: [...childDeptNodes, ...userNodes]
    }
  })
}

export const orgTreeHandlers = [
  http.get(`${appConfig.FORM_API}${orgTreeService.treeUrl}`, async () => {
    await delay()

    const deptChildrenMap: Record<string, OrgDept[]> = {}
    for (const dept of orgDeptList) {
      const key = dept.parentDeptId ?? '__root__'
      if (!deptChildrenMap[key]) deptChildrenMap[key] = []
      deptChildrenMap[key].push(dept)
    }

    const deptUserMap: Record<string, OrgUser[]> = {}
    for (const user of orgUserList) {
      for (const dept of user.userDepts) {
        if (!deptUserMap[dept.deptId]) deptUserMap[dept.deptId] = []
        deptUserMap[dept.deptId].push(user)
      }
    }

    const tree = buildTree(undefined, deptChildrenMap, deptUserMap)
    return HttpResponse.json(tree)
  })
]
