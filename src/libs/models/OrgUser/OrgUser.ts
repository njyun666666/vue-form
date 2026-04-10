import type { OrgUserDept } from './OrgUserDept'

export interface OrgUser {
  userId: string
  employeeId: string
  userName: string
  userDepts: OrgUserDept[]
  roleIds: string[]
  enable: boolean
}
