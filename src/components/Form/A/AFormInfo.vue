<script setup lang="ts">
import ProductDetail from '../ProductDetail/ProductDetail.vue'
import InputField from '@/components/UI/InputField.vue'
import { FormFieldModeEnum, FormPageActionEnum } from '@/libs/enums/FormTypes'
import type { AModel } from '@/libs/models/Form/A/A'
import type { FormPageInfoModel } from '@/libs/models/Form/FormModel'
import type { ProductDetailModel } from '@/libs/models/Form/ProductDetail/ProductDetail'
import { optionService } from '@/libs/services/optionService'
import { useQuery } from '@tanstack/vue-query'
import Checkbox from 'primevue/checkbox'
import DatePicker from 'primevue/datepicker'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import RadioButton from 'primevue/radiobutton'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'
import { type FormContext, useField } from 'vee-validate'
import { type Ref, computed, inject } from 'vue'
import { useI18n } from 'vue-i18n'

const pageInfo = inject<Ref<FormPageInfoModel>>('pageInfo')!
const form = inject<FormContext<AModel>>('form')!
const { t } = useI18n()

const field = {
  title: useField<string>('info.title'),
  content: useField<string>('info.content'),
  amount: useField<number>('info.amount'),
  datetime: useField<Date>('info.datetime'),
  radio: useField<number>('info.radio'),
  checkbox: useField<string[]>('info.checkbox'),
  select: useField<string>('info.select')
}

if (field.datetime.value.value) {
  field.datetime.value.value = new Date(field.datetime.value.value)
}

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

  if (pageInfo.value.formPageAction == FormPageActionEnum.info) return mode

  if (pageInfo?.value.stepId == 1) {
    mode.title = FormFieldModeEnum.required
    mode.content = FormFieldModeEnum.required
    mode.productDetail = FormFieldModeEnum.required
  }

  if (pageInfo?.value.stepId == 2) {
    mode.amount = FormFieldModeEnum.required
    mode.datetime = FormFieldModeEnum.required
  }

  if (pageInfo?.value.stepId == 3) {
    mode.radio = FormFieldModeEnum.required

    switch (field.radio.value.value) {
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

  if (pageInfo.value.formPageAction == FormPageActionEnum.info) return mode

  if (pageInfo?.value.stepId == 1) {
    mode.id = FormFieldModeEnum.required
    mode.name = FormFieldModeEnum.required
    mode.price = FormFieldModeEnum.required
    mode.description = FormFieldModeEnum.required
    mode.image = FormFieldModeEnum.required
    mode.category = FormFieldModeEnum.required
  }

  if (pageInfo?.value.stepId == 2) {
    mode.price = FormFieldModeEnum.required
  }

  return mode
})

const { data: cityList, isFetching: cityIsFetching } = useQuery({
  queryKey: [optionService.cityUrl],
  queryFn: () => optionService.city().then(({ data }) => data),
  staleTime: 24 * 60 * 60 * 1000
})

async function validate() {
  let isValid = true

  return isValid
}

defineExpose({
  fieldMode,
  productDetailFieldMode,
  validate
})
</script>

<template>
  <div>
    <h2>Step 1</h2>
    <div class="grid grid-cols-12 gap-5">
      <InputField
        class="col-span-full"
        for="title"
        :label="$t('Form.A.title')"
        :error="field.title.errorMessage.value"
        :isRequired="fieldMode.title == FormFieldModeEnum.required"
      >
        <InputText
          id="title"
          type="text"
          v-model.trim="field.title.value.value"
          :invalid="!!field.title.errorMessage.value"
          :disabled="fieldMode.title == FormFieldModeEnum.readonly"
        />
      </InputField>

      <InputField
        class="col-span-full"
        for="content"
        :label="$t('Form.A.content')"
        :error="field.content.errorMessage.value"
        :isRequired="fieldMode.content == FormFieldModeEnum.required"
      >
        <Textarea
          v-model.trim="field.content.value.value"
          rows="2"
          class="w-full"
          autoResize
          :invalid="!!field.content.errorMessage.value"
          :disabled="fieldMode.content == FormFieldModeEnum.readonly"
        />
      </InputField>
    </div>

    <ProductDetail
      arrayPath="productDetail"
      class="mt-4"
      :mode="fieldMode.productDetail"
      :fieldMode="productDetailFieldMode"
    />

    <h2>Step 2</h2>
    <div class="grid grid-cols-1 sm:grid-cols-12 gap-5">
      <InputField
        class="col-span-6"
        for="content"
        :label="$t('Form.A.amount')"
        :error="field.amount.errorMessage.value"
        :isRequired="fieldMode.amount == FormFieldModeEnum.required"
      >
        <InputNumber
          v-model="field.amount.value.value"
          :minFractionDigits="2"
          :maxFractionDigits="2"
          :max="9999999.99"
          :invalid="!!field.amount.errorMessage.value"
          :disabled="fieldMode.amount == FormFieldModeEnum.readonly"
        />
      </InputField>

      <InputField
        class="col-span-6"
        for="content"
        :label="$t('Form.A.datetime')"
        :error="field.datetime.errorMessage.value"
        :isRequired="fieldMode.datetime == FormFieldModeEnum.required"
      >
        <DatePicker
          id="datetime"
          v-model="field.datetime.value.value"
          showTime
          hourFormat="24"
          showButtonBar
          :invalid="!!field.datetime.errorMessage.value"
          :disabled="fieldMode.datetime == FormFieldModeEnum.readonly"
        />
      </InputField>
    </div>

    <h2>Step 3</h2>
    <div class="grid grid-cols-1 sm:grid-cols-12 gap-5">
      <InputField
        class="col-span-4"
        for="content"
        :label="$t('Form.A.radio')"
        :error="field.radio.errorMessage.value"
        :isRequired="fieldMode.radio == FormFieldModeEnum.required"
      >
        <div class="flex flex-wrap gap-2">
          <div v-for="n in 3" :key="n" class="flex gap-2 shrink-0">
            <RadioButton
              v-model="field.radio.value.value"
              :inputId="`info.radio.${n}`"
              name="info.radio"
              :value="n"
              :invalid="!!field.radio.errorMessage.value"
              :disabled="fieldMode.radio == FormFieldModeEnum.readonly"
            />
            <label :for="`info.radio.${n}`">{{ n }}</label>
          </div>
        </div>
      </InputField>

      <InputField
        class="col-span-4"
        for="content"
        :label="$t('Form.A.checkbox')"
        :error="field.checkbox.errorMessage.value"
        :isRequired="fieldMode.checkbox == FormFieldModeEnum.required"
      >
        <div class="flex flex-wrap gap-2">
          <div v-for="item of cityList" :key="item.value" class="flex gap-2 shrink-0">
            <Checkbox
              v-model="field.checkbox.value.value"
              :inputId="`info.checkbox.${item.value}`"
              name="info.checkbox"
              :value="item.value"
              :invalid="!!field.checkbox.errorMessage.value"
              :disabled="fieldMode.checkbox == FormFieldModeEnum.readonly"
            />
            <label :for="`info.checkbox.${item.value}`">{{ item.label }}</label>
          </div>
        </div>
      </InputField>

      <InputField
        class="col-span-4"
        for="content"
        :label="$t('Form.A.select')"
        :error="field.select.errorMessage.value"
        :isRequired="fieldMode.select == FormFieldModeEnum.required"
      >
        <Select
          v-model="field.select.value.value"
          :options="cityList"
          optionLabel="label"
          optionValue="value"
          class="w-full"
          :invalid="!!field.select.errorMessage.value"
          :loading="cityIsFetching"
          :disabled="fieldMode.select == FormFieldModeEnum.readonly"
        />
      </InputField>
    </div>
  </div>
</template>
