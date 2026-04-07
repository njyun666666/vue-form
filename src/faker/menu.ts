import type { MenuViewModel } from '@/libs/models/Menu/Menu'

export const menus: MenuViewModel[] = [
  {
    menuId: 'home',
    menuName: 'Page.Home',
    icon: 'fa-solid fa-house',
    url: '/'
  },
  {
    menuId: 'form',
    menuName: 'Page.ApplicationForm',
    icon: 'fa-solid fa-file-circle-plus',
    url: '/form'
  },
  {
    menuId: 'flow-list',
    menuName: 'Page.FlowList',
    icon: 'fa-solid fa-diagram-project',
    url: '/flow/list'
  },
  {
    menuId: 'org',
    menuName: 'Org.Org',
    icon: 'fa-solid fa-sitemap',
    url: '',
    children: [
      {
        menuId: 'org-tree',
        menuName: 'Org.OrgTree',
        icon: 'fa-solid fa-sitemap',
        url: '/org/tree'
      },
      {
        menuId: 'org-dept',
        menuName: 'Org.Dept',
        icon: 'fa-solid fa-building',
        url: '/org/dept'
      },
      {
        menuId: 'org-user',
        menuName: 'Org.User',
        icon: 'fa-solid fa-user',
        url: '/org/user'
      }
    ]
  }
]
