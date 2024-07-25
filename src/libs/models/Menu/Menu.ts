export class MenuViewModel {
  menuId!: string
  menuName!: string
  icon?: string
  url?: string
  children?: MenuViewModel[]

  get key() {
    return this.menuId
  }
}
