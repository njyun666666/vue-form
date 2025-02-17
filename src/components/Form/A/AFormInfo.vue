<script setup lang="ts">
import InputField from '@/components/UI/InputField.vue'
import type { FormPageInfoModel } from '@/libs/models/Form/FormModel'
import type { OptionModel } from '@/libs/models/Query/OptionModel'
import { toTypedSchema } from '@vee-validate/zod'
import Checkbox from 'primevue/checkbox'
import DatePicker from 'primevue/datepicker'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import RadioButton from 'primevue/radiobutton'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'
import { useField, useForm } from 'vee-validate'
import { type Ref, inject, ref } from 'vue'
import { z } from 'zod'

const pageInfo = inject<Ref<FormPageInfoModel>>('pageInfo')

const { value: title, errorMessage: titleError } = useField<string>('info.title')
const { value: content, errorMessage: contentError } = useField<string>('info.content')
const { value: amount, errorMessage: amountError } = useField<number>('info.amount')
const { value: datetime, errorMessage: datetimeError } = useField<Date>('info.datetime')
const { value: radio, errorMessage: radioError } = useField<string>('info.radio')
const { value: checkbox, errorMessage: checkboxError } = useField<string[]>('info.checkbox')
const { value: select, errorMessage: selectError } = useField<string>('info.select')

const cityList = ref<OptionModel<string>[]>([
  { label: '臺北市', value: 'Taipei' },
  { label: '新北市', value: 'NewTaipei' },
  { label: '桃園市', value: 'Taoyuan' }
])
</script>

<template>
  <div>
    <h2>{{ $t('Form.A.FormInfo') }}</h2>
    <div class="grid grid-cols-12 gap-5">
      <InputField class="col-span-full" for="title" :label="$t('Form.A.title')" :error="titleError">
        <InputText id="title" type="text" v-model="title" :invalid="!!titleError" />
      </InputField>

      <InputField
        class="col-span-full"
        for="content"
        :label="$t('Form.A.content')"
        :error="contentError"
      >
        <Textarea v-model="content" rows="2" class="w-full" autoResize :invalid="!!contentError" />
      </InputField>

      <InputField
        class="col-span-4"
        for="content"
        :label="$t('Form.A.amount')"
        :error="contentError"
      >
        <InputNumber
          v-model="amount"
          :minFractionDigits="2"
          :maxFractionDigits="5"
          :max="9999999.99"
          :invalid="!!amountError"
        />
      </InputField>

      <InputField
        class="col-span-4"
        for="content"
        :label="$t('Form.A.datetime')"
        :error="datetimeError"
      >
        <DatePicker
          id="datetime"
          v-model="datetime"
          showTime
          hourFormat="24"
          showButtonBar
          :invalid="!!datetimeError"
        />
      </InputField>

      <InputField class="col-span-4" for="content" :label="$t('Form.A.radio')" :error="radioError">
        <div class="flex flex-wrap gap-2">
          <div v-for="item of cityList" :key="item.value" class="flex gap-2 shrink-0">
            <RadioButton
              v-model="radio"
              :inputId="`info.radio.${item.value}`"
              name="info.radio"
              :value="item.value"
              :invalid="!!radioError"
            />
            <label :for="`info.radio.${item.value}`">{{ item.label }}</label>
          </div>
        </div>
      </InputField>

      <InputField
        class="col-span-4"
        for="content"
        :label="$t('Form.A.checkbox')"
        :error="checkboxError"
      >
        <div class="flex flex-wrap gap-2">
          <div v-for="item of cityList" :key="item.value" class="flex gap-2 shrink-0">
            <Checkbox
              v-model="checkbox"
              :inputId="`info.checkbox.${item.value}`"
              name="info.checkbox"
              :value="item.value"
              :invalid="!!checkboxError"
            />
            <label :for="`info.checkbox.${item.value}`">{{ item.label }}</label>
          </div>
        </div>
      </InputField>

      <InputField
        class="col-span-4"
        for="content"
        :label="$t('Form.A.select')"
        :error="selectError"
      >
        <Select
          v-model="select"
          :options="cityList"
          optionLabel="label"
          optionValue="value"
          class="w-full"
          :invalid="!!selectError"
        />
      </InputField>
    </div>
  </div>
</template>
