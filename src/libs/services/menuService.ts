import formAPI from '../api/formAPI'
import type { MenuViewModel } from '../models/Menu/Menu'

class MenuService {
  menus() {
    return formAPI.get<MenuViewModel>(`/api/Menus`)
  }
}

export const menuService = new MenuService()
