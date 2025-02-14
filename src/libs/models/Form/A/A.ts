import { FormBaseInfoModel } from '../FormModel'

export class AModel {
  baseInfo?: FormBaseInfoModel
  info?: AInfo
}

export class AInfo {
  title!: string
  content!: string
  amount!: number
  datetime!: Date
  checkbox!: string[]
  select!: string[]
}
