export interface OrgUserQuery {
  employeeId?: string
  userName?: string
  deptId?: string | null
}

export interface OrgUserQueryView {
  userId: string
  employeeId: string
  userName: string
  deptName: string
  jobTitle: string
  isDeptManager?: boolean
}
