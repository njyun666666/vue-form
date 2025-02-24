import { uuid } from '@/libs/utils/uuid'

export class ProductDetailModel {
  private _guid?: string
  id?: string
  name?: string
  price?: number
  description?: string
  image?: string
  category?: string
  isDeleted?: boolean

  constructor() {}

  get guid() {
    this._guid = this.id || this._guid || uuid()
    return this._guid
  }
}
