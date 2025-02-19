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
  }
}
