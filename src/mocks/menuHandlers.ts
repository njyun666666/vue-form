import appConfig from '@/appConfig'
import type { MenuViewModel } from '@/libs/models/Menu/Menu'
import { menuService } from '@/libs/services/menuService'
import { HttpResponse, http } from 'msw'

export const menuHandlers = [
  http.get(`${appConfig.FORM_API}${menuService.menusUrl}`, () => {
    return HttpResponse.json([
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
    ] as MenuViewModel[])
  })
]
