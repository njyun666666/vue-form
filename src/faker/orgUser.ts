import type { OrgUser } from '@/libs/models/OrgUser/OrgUser'

export const orgUserList: OrgUser[] = [
  {
    userId: 'user-001',
    employeeId: 'E001',
    userName: '王小明',
    deptId: 'dept-031',
    deptName: '前端開發組',
    jobTitle: '前端工程師',
    enable: true
  },
  {
    userId: 'user-002',
    employeeId: 'E002',
    userName: '李美華',
    deptId: 'dept-032',
    deptName: '後端開發組',
    jobTitle: '後端工程師',
    enable: true
  },
  {
    userId: 'user-003',
    employeeId: 'E003',
    userName: '張志豪',
    deptId: 'dept-011',
    deptName: '業務部',
    jobTitle: '業務專員',
    enable: true
  },
  {
    userId: 'user-004',
    employeeId: 'E004',
    userName: '陳雅婷',
    deptId: 'dept-021',
    deptName: '北區業務組',
    jobTitle: '業務經理',
    enable: true
  },
  {
    userId: 'user-005',
    employeeId: 'E005',
    userName: '林建國',
    deptId: 'dept-013',
    deptName: '人力資源部',
    jobTitle: '人資專員',
    enable: true
  },
  {
    userId: 'user-006',
    employeeId: 'E006',
    userName: '黃淑芬',
    deptId: 'dept-031',
    deptName: '前端開發組',
    jobTitle: 'UI設計師',
    enable: true
  },
  {
    userId: 'user-007',
    employeeId: 'E007',
    userName: '吳俊賢',
    deptId: 'dept-032',
    deptName: '後端開發組',
    jobTitle: '系統架構師',
    enable: true
  },
  {
    userId: 'user-008',
    employeeId: 'E008',
    userName: '蔡佳穎',
    deptId: 'dept-022',
    deptName: '南區業務組',
    jobTitle: '業務專員',
    enable: true
  },
  {
    userId: 'user-009',
    employeeId: 'E009',
    userName: '鄭文翔',
    deptId: 'dept-013',
    deptName: '人力資源部',
    jobTitle: '人資主任',
    enable: true
  },
  {
    userId: 'user-010',
    employeeId: 'E010',
    userName: '許雅雯',
    deptId: 'dept-012',
    deptName: '技術部',
    jobTitle: '技術部經理',
    enable: true
  }
]

export const orgUserMap: Record<string, OrgUser> = Object.fromEntries(
  orgUserList.map((u) => [u.userId, u])
)
