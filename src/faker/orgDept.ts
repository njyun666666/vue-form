import type { OrgDept } from '@/libs/models/OrgDept/OrgDept'
import type { OrgDeptQueryView } from '@/libs/models/OrgDept/OrgDeptQuery'
import { omit } from 'lodash'

const omitParentDept = (dept: OrgDept) => omit(dept, 'parentDept')

// Level 1 — 根節點
const 台灣總公司: OrgDept = {
  deptId: 'dept-001',
  deptName: '台灣總公司',
  rootDeptId: 'dept-001',
  enable: true,
  expand: true
}

// Level 2
const 業務部: OrgDept = {
  deptId: 'dept-011',
  deptName: '業務部',
  parentDeptId: 'dept-001',
  rootDeptId: 'dept-001',
  enable: true,
  expand: true,
  parentDept: omitParentDept(台灣總公司)
}

const 技術部: OrgDept = {
  deptId: 'dept-012',
  deptName: '技術部',
  parentDeptId: 'dept-001',
  rootDeptId: 'dept-001',
  enable: true,
  expand: true,
  parentDept: omitParentDept(台灣總公司)
}

const 人力資源部: OrgDept = {
  deptId: 'dept-013',
  deptName: '人力資源部',
  parentDeptId: 'dept-001',
  rootDeptId: 'dept-001',
  enable: true,
  expand: false,
  parentDept: omitParentDept(台灣總公司)
}

// Level 3 — 業務部底下
const 北區業務組: OrgDept = {
  deptId: 'dept-021',
  deptName: '北區業務組',
  parentDeptId: 'dept-011',
  rootDeptId: 'dept-001',
  enable: true,
  expand: false,
  parentDept: omitParentDept(業務部)
}

const 南區業務組: OrgDept = {
  deptId: 'dept-022',
  deptName: '南區業務組',
  parentDeptId: 'dept-011',
  rootDeptId: 'dept-001',
  enable: true,
  expand: false,
  parentDept: omitParentDept(業務部)
}

const 海外業務組: OrgDept = {
  deptId: 'dept-023',
  deptName: '海外業務組',
  parentDeptId: 'dept-011',
  rootDeptId: 'dept-001',
  enable: false,
  expand: false,
  parentDept: omitParentDept(業務部)
}

// Level 3 — 技術部底下
const 前端開發組: OrgDept = {
  deptId: 'dept-031',
  deptName: '前端開發組',
  parentDeptId: 'dept-012',
  rootDeptId: 'dept-001',
  enable: true,
  expand: false,
  parentDept: omitParentDept(技術部)
}

const 後端開發組: OrgDept = {
  deptId: 'dept-032',
  deptName: '後端開發組',
  parentDeptId: 'dept-012',
  rootDeptId: 'dept-001',
  enable: true,
  expand: false,
  parentDept: omitParentDept(技術部)
}

export const orgDeptList: OrgDept[] = [
  台灣總公司,
  業務部,
  技術部,
  人力資源部,
  北區業務組,
  南區業務組,
  海外業務組,
  前端開發組,
  後端開發組
]

export const orgDeptMap: Record<string, OrgDept> = Object.fromEntries(
  orgDeptList.map((d) => [d.deptId, d])
)

export const orgDeptQueryViewList: OrgDeptQueryView[] = orgDeptList.map(({ deptId, deptName }) => ({
  deptId,
  deptName
}))
