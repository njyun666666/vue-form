import type { OrgRole } from '@/libs/models/OrgRole/OrgRole'

export const orgRoleList: OrgRole[] = [
  { roleId: 'role-001', roleName: '系統管理員', description: '擁有全系統最高權限', enable: true },
  {
    roleId: 'role-002',
    roleName: '部門主管',
    description: '可管理所屬部門人員及資料',
    enable: true
  },
  { roleId: 'role-003', roleName: '一般員工', description: '可查閱及填寫一般表單', enable: true },
  { roleId: 'role-004', roleName: '業務人員', description: '負責業務相關表單與報表', enable: true },
  { roleId: 'role-005', roleName: '人資專員', description: '管理人員資料與組織架構', enable: true },
  { roleId: 'role-006', roleName: '技術支援', description: '負責系統維護與技術文件', enable: true },
  { roleId: 'role-007', roleName: '審核人員', description: '負責表單審核與簽核流程', enable: true }
]

export const orgRoleMap: Record<string, OrgRole> = Object.fromEntries(
  orgRoleList.map((r) => [r.roleId, r])
)
