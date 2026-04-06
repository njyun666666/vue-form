import appConfig from '@/appConfig'
import { menus } from '@/faker/menu'
import { menuService } from '@/libs/services/menuService'
import { HttpResponse, http } from 'msw'

export const menuHandlers = [
  http.get(`${appConfig.FORM_API}${menuService.menusUrl}`, () => {
    return HttpResponse.json(menus)
  })
]
