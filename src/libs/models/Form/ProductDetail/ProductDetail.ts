import { uuid } from '@/libs/utils/uuid'

export class ProductDetailModel {
  guid?: string
  id?: string
  name?: string
  price?: number
  description?: string
  image?: string
  category?: string
  isDeleted?: boolean

  constructor(guid?: string) {
    this.guid = guid || uuid()
    this.id = undefined
    this.name = undefined
    this.price = undefined
    this.description = undefined
    this.image = undefined
    this.category = undefined
    this.isDeleted = undefined
  }
}
