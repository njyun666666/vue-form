export type RoleType = (typeof appConst.Role)[keyof typeof appConst.Role]

export const appConst = {
  Role: {
    Home: 'home',
    Org: 'org',
    OrgDept: 'org-dept',
    OrgUser: 'org-user',
    Auth: 'auth',
    AuthMenu: 'auth-menu',
    AuthRole: 'auth-role'
  },
  StaleTime: 24 * 60 * 60 * 1000
} as const
