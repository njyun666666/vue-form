import { FormBaseInfoModel } from '../FormModel'

export class AModel {
  baseInfo?: FormBaseInfoModel
  info?: AInfoModel
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
