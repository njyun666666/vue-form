<script setup lang="ts">
import InputField from '@/components/UI/InputField.vue'
import { toTypedSchema } from '@vee-validate/zod'
import InputText from 'primevue/inputtext'
import { useField, useForm } from 'vee-validate'
import { z } from 'zod'

const { value: title, errorMessage: titleError } = useField<string>('info.title')
const { value: content, errorMessage: contentError } = useField<string>('info.content')
const { value: amount, errorMessage: amountError } = useField<string>('info.amount')
const { value: datetime, errorMessage: datetimeError } = useField<string>('info.datetime')
const { value: checkbox, errorMessage: checkboxError } = useField<string>('info.checkbox')
const { value: select, errorMessage: selectError } = useField<string>('info.select')
</script>

<template>
  <div>
    <h2>Info</h2>
    <InputField for="title" :label="$t('Form.BaseInfo.title')" :error="titleError">
      <InputText id="title" type="title" v-model="title" :invalid="!!titleError" />
    </InputField>
  </div>
</template>
