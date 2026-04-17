import { FormFieldModeEnum, FormPageActionEnum } from '@/libs/enums/FormTypes'
import type { AModel } from '@/libs/models/Form/A/A'
import type { FormPageInfoModel } from '@/libs/models/Form/FormModel'
import type { ProductDetailModel } from '@/libs/models/Form/ProductDetail/ProductDetail'
import type { FormContext } from 'vee-validate'
import { type Ref, computed } from 'vue'

export function useAFieldMode(pageInfo: Ref<FormPageInfoModel>, form: FormContext<AModel>) {
  const fieldMode = computed(() => {
    const mode: Record<string, FormFieldModeEnum> = {
      title: FormFieldModeEnum.readonly,
      content: FormFieldModeEnum.readonly,
      amount: FormFieldModeEnum.readonly,
      datetime: FormFieldModeEnum.readonly,
      radio: FormFieldModeEnum.readonly,
      checkbox: FormFieldModeEnum.readonly,
      select: FormFieldModeEnum.readonly,
      productDetail: FormFieldModeEnum.readonly
    }

    if (pageInfo.value.formPageAction === FormPageActionEnum.info) return mode

    if (pageInfo.value.stepId === 'start-4f49f5d3a4914dfabb9c25f88484d545') {
      mode.title = FormFieldModeEnum.required
      mode.content = FormFieldModeEnum.required
      mode.productDetail = FormFieldModeEnum.required
    }

    if (pageInfo.value.stepId === 'task-675a9047c9b8478da2098886e1183de7') {
      mode.amount = FormFieldModeEnum.required
      mode.datetime = FormFieldModeEnum.required
    }

    if (pageInfo.value.stepId === 'task-66896d1e4e914ed4a0f60cd685c2f563') {
      mode.radio = FormFieldModeEnum.required

      switch (form.values.info?.radio) {
        case 1:
          mode.checkbox = FormFieldModeEnum.required
          mode.select = FormFieldModeEnum.readonly
          break
        case 2:
          mode.checkbox = FormFieldModeEnum.readonly
          mode.select = FormFieldModeEnum.required
          break
        case 3:
          mode.checkbox = FormFieldModeEnum.required
          mode.select = FormFieldModeEnum.required
          break
        default:
          break
      }
    }

    return mode
  })

  const productDetailFieldMode = computed(() => {
    const mode: Partial<Record<keyof ProductDetailModel, FormFieldModeEnum>> = {
      id: FormFieldModeEnum.readonly,
      name: FormFieldModeEnum.readonly,
      price: FormFieldModeEnum.readonly,
      description: FormFieldModeEnum.readonly,
      image: FormFieldModeEnum.readonly,
      category: FormFieldModeEnum.readonly
    }

    if (pageInfo.value.formPageAction === FormPageActionEnum.info) return mode

    if (pageInfo.value.stepId === 'start-4f49f5d3a4914dfabb9c25f88484d545') {
      mode.id = FormFieldModeEnum.required
      mode.name = FormFieldModeEnum.required
      mode.price = FormFieldModeEnum.required
      mode.description = FormFieldModeEnum.required
      mode.image = FormFieldModeEnum.required
      mode.category = FormFieldModeEnum.required
    }

    if (pageInfo.value.stepId === 'task-675a9047c9b8478da2098886e1183de7') {
      mode.price = FormFieldModeEnum.required
    }

    return mode
  })

  return { fieldMode, productDetailFieldMode }
}
