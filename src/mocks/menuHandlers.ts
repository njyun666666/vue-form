import appConfig from '@/appConfig'
import { menuService } from '@/libs/services/menuService'
import { HttpResponse, http } from 'msw'

export const menuHandlers = [
  http.get(`${appConfig.FORM_API}${menuService.menusUrl}`, () => {
    return HttpResponse.json([
      {
        menuId: 'be001d7baf21420c75d3335ff71d6663',
        menuName: 'Page.Home',
        icon: 'fa-solid fa-house',
        url: '/'
      },
      {
        menuId: 'b607cd761d59e53ac20df9a8d416e6f7',
        menuName: 'Org.Org',
        icon: 'fa-solid fa-sitemap',
        url: '',
        children: [
          {
            menuId: 'f299178acaaacd49f8b488ccf38218ff',
            menuName: 'Org.Dept',
            icon: 'fa-solid fa-building',
            url: '/org/dept'
          },
          {
            menuId: '191a783fc56e2ee5d9f9d39bef4d84ea',
            menuName: 'Org.User',
            icon: 'fa-solid fa-user',
            url: '/org/user'
          }
        ]
      }
    ])
  })
]
