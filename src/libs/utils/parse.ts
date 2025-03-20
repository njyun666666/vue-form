import type { OptionModel } from '../models/Query/OptionModel'
import { i18n } from '@/i18n/config'

export const parseOptions = <T, TT>(enumObj: T, keypath?: string): OptionModel<TT>[] => {
  const { t } = i18n.global

  return Object.keys(enumObj as object).map(
    (key) =>
      ({
        label: keypath ? t(`${keypath}.${key}`) : key,
        value: (enumObj as any)[key]
      }) as OptionModel<TT>
  )
}
