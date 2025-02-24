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

  constructor(input?: ProductDetailModel) {
    this.id = input?.id
    this.name = input?.name
    this.price = input?.price
    this.description = input?.description
    this.image = input?.image
    this.category = input?.category
    this.isDeleted = input?.isDeleted
  }

  get guid() {
    this._guid = this.id || this._guid || uuid()
    return this._guid
  }
}
