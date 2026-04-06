export interface OrgDept {
  deptId: string
  deptName: string
  parentDeptId?: string
  rootDeptId: string
  enable: boolean
  expand: boolean
  parentDept?: Omit<OrgDept, 'parentDept'>
}
