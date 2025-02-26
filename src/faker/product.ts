import { ProductDetailModel } from '@/libs/models/Form/ProductDetail/ProductDetail'
import { uuid } from '@/libs/utils/uuid'

export const productFaker = (): ProductDetailModel => {
  const item = new ProductDetailModel()
  item.id = uuid().substring(0, 8)
  item.name = 'Asus 5090'
  item.price = 100000
  item.description = 'Asus 5090'
  item.image = uuid()
  item.category = 'gpu'
  return item
}
