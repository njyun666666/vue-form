<script setup lang="ts">
import ProductDetail from '../ProductDetail/ProductDetail.vue'
import InputField from '@/components/UI/InputField.vue'
import type { AModel } from '@/libs/models/Form/A/A'
import type { FormPageInfoModel } from '@/libs/models/Form/FormModel'
import type { ProductDetailModel } from '@/libs/models/Form/ProductDetail/ProductDetail'
import { optionService } from '@/libs/services/optionService'
import { type FormFieldModeType, FormPageAction } from '@/libs/types/FormTypes'
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
  const mode: Record<string, FormFieldModeType> = {
    title: 'readonly',
    content: 'readonly',
    amount: 'readonly',
    datetime: 'readonly',
    radio: 'readonly',
    checkbox: 'readonly',
    select: 'readonly',
    productDetail: 'readonly'
  }

  if (pageInfo.value.formPageAction == FormPageAction.info) return mode

  if (pageInfo?.value.step == 1) {
    mode.title = 'required'
    mode.content = 'required'
    mode.productDetail = 'required'
  }

  if (pageInfo?.value.step == 2) {
    mode.amount = 'required'
    mode.datetime = 'required'
  }

  if (pageInfo?.value.step == 3) {
    mode.radio = 'required'

    switch (field.radio.value.value) {
      case 1:
        mode.checkbox = 'required'
        mode.select = 'readonly'
        break

      case 2:
        mode.checkbox = 'readonly'
        mode.select = 'required'
        break

      case 3:
        mode.checkbox = 'required'
        mode.select = 'required'
        break

      default:
        break
    }
  }

  return mode
})

const productDetailFieldMode = computed(() => {
  const mode: Partial<Record<keyof ProductDetailModel, FormFieldModeType>> = {
    id: 'readonly',
    name: 'readonly',
    price: 'readonly',
    description: 'readonly',
    image: 'readonly',
    category: 'readonly'
  }

  if (pageInfo.value.formPageAction == FormPageAction.info) return mode

  if (pageInfo?.value.step == 1) {
    mode.id = 'required'
    mode.name = 'required'
    mode.price = 'required'
    mode.description = 'required'
    mode.image = 'required'
    mode.category = 'required'
  }

  if (pageInfo?.value.step == 2) {
    mode.price = 'required'
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
        :isRequired="fieldMode.title == 'required'"
      >
        <InputText
          id="title"
          type="text"
          v-model.trim="field.title.value.value"
          :invalid="!!field.title.errorMessage.value"
          :disabled="fieldMode.title == 'readonly'"
        />
      </InputField>

      <InputField
        class="col-span-full"
        for="content"
        :label="$t('Form.A.content')"
        :error="field.content.errorMessage.value"
        :isRequired="fieldMode.content == 'required'"
      >
        <Textarea
          v-model.trim="field.content.value.value"
          rows="2"
          class="w-full"
          autoResize
          :invalid="!!field.content.errorMessage.value"
          :disabled="fieldMode.content == 'readonly'"
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
        :isRequired="fieldMode.amount == 'required'"
      >
        <InputNumber
          v-model="field.amount.value.value"
          :minFractionDigits="2"
          :maxFractionDigits="2"
          :max="9999999.99"
          :invalid="!!field.amount.errorMessage.value"
          :disabled="fieldMode.amount == 'readonly'"
        />
      </InputField>

      <InputField
        class="col-span-6"
        for="content"
        :label="$t('Form.A.datetime')"
        :error="field.datetime.errorMessage.value"
        :isRequired="fieldMode.datetime == 'required'"
      >
        <DatePicker
          id="datetime"
          v-model="field.datetime.value.value"
          showTime
          hourFormat="24"
          showButtonBar
          :invalid="!!field.datetime.errorMessage.value"
          :disabled="fieldMode.datetime == 'readonly'"
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
        :isRequired="fieldMode.radio == 'required'"
      >
        <div class="flex flex-wrap gap-2">
          <div v-for="n in 3" :key="n" class="flex gap-2 shrink-0">
            <RadioButton
              v-model="field.radio.value.value"
              :inputId="`info.radio.${n}`"
              name="info.radio"
              :value="n"
              :invalid="!!field.radio.errorMessage.value"
              :disabled="fieldMode.radio == 'readonly'"
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
        :isRequired="fieldMode.checkbox == 'required'"
      >
        <div class="flex flex-wrap gap-2">
          <div v-for="item of cityList" :key="item.value" class="flex gap-2 shrink-0">
            <Checkbox
              v-model="field.checkbox.value.value"
              :inputId="`info.checkbox.${item.value}`"
              name="info.checkbox"
              :value="item.value"
              :invalid="!!field.checkbox.errorMessage.value"
              :disabled="fieldMode.checkbox == 'readonly'"
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
        :isRequired="fieldMode.select == 'required'"
      >
        <Select
          v-model="field.select.value.value"
          :options="cityList"
          optionLabel="label"
          optionValue="value"
          class="w-full"
          :invalid="!!field.select.errorMessage.value"
          :loading="cityIsFetching"
          :disabled="fieldMode.select == 'readonly'"
        />
      </InputField>
    </div>
  </div>
</template>
