import type { OrgUser } from '@/libs/models/OrgUser/OrgUser'

export const orgUserList: OrgUser[] = [
  {
    userId: 'user-001',
    employeeId: 'E001',
    userName: '王小明',
    roleIds: ['role-001', 'role-002'],
    userDepts: [
      {
        userDeptId: 'udept-001-1',
        deptId: 'dept-031',
        deptName: '前端開發組',
        jobTitleId: 'jobtitle-001',
        jobTitleName: '工程師',
        isPrimary: true,
        isDeptManager: true
      },
      {
        userDeptId: 'udept-001-2',
        deptId: 'dept-013',
        deptName: '人力資源部',
        jobTitleId: 'jobtitle-006',
        jobTitleName: '人資專員',
        isPrimary: false,
        isDeptManager: true
      }
    ],
    enable: true
  },
  {
    userId: 'user-002',
    employeeId: 'E002',
    userName: '李美華',
    roleIds: ['role-003'],
    userDepts: [
      {
        userDeptId: 'udept-002-1',
        deptId: 'dept-032',
        deptName: '後端開發組',
        jobTitleId: 'jobtitle-001',
        jobTitleName: '工程師',
        isPrimary: true,
        isDeptManager: false
      }
    ],
    enable: true
  },
  {
    userId: 'user-003',
    employeeId: 'E003',
    userName: '張志豪',
    roleIds: ['role-004'],
    userDepts: [
      {
        userDeptId: 'udept-003-1',
        deptId: 'dept-011',
        deptName: '業務部',
        jobTitleId: 'jobtitle-004',
        jobTitleName: '業務專員',
        isPrimary: true,
        isDeptManager: false
      }
    ],
    enable: true
  },
  {
    userId: 'user-004',
    employeeId: 'E004',
    userName: '陳雅婷',
    roleIds: ['role-002', 'role-004'],
    userDepts: [
      {
        userDeptId: 'udept-004-1',
        deptId: 'dept-021',
        deptName: '北區業務組',
        jobTitleId: 'jobtitle-005',
        jobTitleName: '業務經理',
        isPrimary: true,
        isDeptManager: true
      },
      {
        userDeptId: 'udept-004-2',
        deptId: 'dept-011',
        deptName: '業務部',
        jobTitleId: 'jobtitle-004',
        jobTitleName: '業務專員',
        isPrimary: false,
        isDeptManager: true
      }
    ],
    enable: true
  },
  {
    userId: 'user-005',
    employeeId: 'E005',
    userName: '林建國',
    roleIds: ['role-005'],
    userDepts: [
      {
        userDeptId: 'udept-005-1',
        deptId: 'dept-013',
        deptName: '人力資源部',
        jobTitleId: 'jobtitle-006',
        jobTitleName: '人資專員',
        isPrimary: true,
        isDeptManager: false
      }
    ],
    enable: true
  },
  {
    userId: 'user-006',
    employeeId: 'E006',
    userName: '黃淑芬',
    roleIds: ['role-003'],
    userDepts: [
      {
        userDeptId: 'udept-006-1',
        deptId: 'dept-031',
        deptName: '前端開發組',
        jobTitleId: 'jobtitle-009',
        jobTitleName: 'UI設計師',
        isPrimary: true,
        isDeptManager: false
      }
    ],
    enable: true
  },
  {
    userId: 'user-007',
    employeeId: 'E007',
    userName: '吳俊賢',
    roleIds: ['role-006'],
    userDepts: [
      {
        userDeptId: 'udept-007-1',
        deptId: 'dept-032',
        deptName: '後端開發組',
        jobTitleId: 'jobtitle-008',
        jobTitleName: '系統架構師',
        isPrimary: true,
        isDeptManager: false
      },
      {
        userDeptId: 'udept-007-2',
        deptId: 'dept-012',
        deptName: '技術部',
        jobTitleId: 'jobtitle-003',
        jobTitleName: '主任工程師',
        isPrimary: false,
        isDeptManager: false
      }
    ],
    enable: true
  },
  {
    userId: 'user-008',
    employeeId: 'E008',
    userName: '蔡佳穎',
    roleIds: ['role-004'],
    userDepts: [
      {
        userDeptId: 'udept-008-1',
        deptId: 'dept-022',
        deptName: '南區業務組',
        jobTitleId: 'jobtitle-004',
        jobTitleName: '業務專員',
        isPrimary: true,
        isDeptManager: false
      }
    ],
    enable: true
  },
  {
    userId: 'user-009',
    employeeId: 'E009',
    userName: '鄭文翔',
    roleIds: ['role-005', 'role-007'],
    userDepts: [
      {
        userDeptId: 'udept-009-1',
        deptId: 'dept-013',
        deptName: '人力資源部',
        jobTitleId: 'jobtitle-007',
        jobTitleName: '人資主任',
        isPrimary: true,
        isDeptManager: true
      }
    ],
    enable: true
  },
  {
    userId: 'user-010',
    employeeId: 'E010',
    userName: '許雅雯',
    roleIds: ['role-001', 'role-006'],
    userDepts: [
      {
        userDeptId: 'udept-010-1',
        deptId: 'dept-012',
        deptName: '技術部',
        jobTitleId: 'jobtitle-010',
        jobTitleName: '技術部經理',
        isPrimary: true,
        isDeptManager: true
      }
    ],
    enable: true
  }
]

export const orgUserMap: Record<string, OrgUser> = Object.fromEntries(
  orgUserList.map((u) => [u.userId, u])
)
