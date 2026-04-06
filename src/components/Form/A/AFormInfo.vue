<script setup lang="ts">
import ProductDetail from '../ProductDetail/ProductDetail.vue'
import { useAFieldMode } from './useAFieldMode'
import InputField from '@/components/UI/InputField.vue'
import { FormFieldModeEnum } from '@/libs/enums/FormTypes'
import type { AModel } from '@/libs/models/Form/A/A'
import type { FormPageInfoModel } from '@/libs/models/Form/FormModel'
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
import { type Ref, inject } from 'vue'

const pageInfo = inject<Ref<FormPageInfoModel>>('pageInfo')!
const form = inject<FormContext<AModel>>('form')!

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

const { fieldMode, productDetailFieldMode } = useAFieldMode(pageInfo, form)

const { data: cityList, isFetching: cityIsFetching } = useQuery({
  queryKey: [optionService.cityUrl],
  queryFn: () => optionService.city().then(({ data }) => data),
  staleTime: 24 * 60 * 60 * 1000
})

defineExpose({ fieldMode, productDetailFieldMode })
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
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-12">
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
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-12">
      <InputField
        class="col-span-4"
        for="content"
        :label="$t('Form.A.radio')"
        :error="field.radio.errorMessage.value"
        :isRequired="fieldMode.radio == FormFieldModeEnum.required"
      >
        <div class="flex flex-wrap gap-2">
          <div v-for="n in 3" :key="n" class="flex shrink-0 gap-2">
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
          <div v-for="item of cityList" :key="item.value" class="flex shrink-0 gap-2">
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
