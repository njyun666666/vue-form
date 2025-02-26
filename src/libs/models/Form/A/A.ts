import { FormBaseInfoModel } from '../FormModel'
import type { ProductDetailModel } from '../ProductDetail/ProductDetail'

export class AModel {
  baseInfo?: FormBaseInfoModel
  info?: AInfoModel
  productDetail?: ProductDetailModel[]
}

export class AInfoModel {
  title?: string
  content?: string
  amount?: number
  datetime?: Date
  radio?: number
  checkbox?: string[]
  select?: string
}
