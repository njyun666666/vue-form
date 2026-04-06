import { FormBaseInfoModel } from '../FormModel'
import { ProductDetailModel } from '../ProductDetail/ProductDetail'

export class AModel {
  baseInfo?: FormBaseInfoModel
  info?: AInfoModel
  productDetail?: ProductDetailModel[]

  constructor(input?: Partial<AModel>) {
    this.baseInfo = input?.baseInfo
    this.info = input?.info
    this.productDetail = input?.productDetail?.map((item) => new ProductDetailModel(item))
  }
}

export class AInfoModel {
  title?: string
  content?: string
  amount?: number
  datetime?: Date
  radio?: number
  checkbox?: string[]
  select?: string

  constructor(input?: Partial<AInfoModel>) {
    this.title = input?.title
    this.content = input?.content
    this.amount = input?.amount
    this.datetime = input?.datetime
    this.radio = input?.radio
    this.checkbox = input?.checkbox
    this.select = input?.select
  }
}
