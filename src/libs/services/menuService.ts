import formAPI from '../api/formAPI'
import type { MenuViewModel } from '../models/Menu/Menu'

class MenuService {
  readonly menusUrl = '/Menus'

  menus() {
    return formAPI.get<MenuViewModel[]>(`${this.menusUrl}`)
  }
}

export const menuService = new MenuService()
