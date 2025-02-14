<script setup lang="ts">
import InputField from '@/components/UI/InputField.vue'
import InputText from 'primevue/inputtext'
import { useField } from 'vee-validate'

const { value: formId, errorMessage: formIdError } = useField<string>('baseInfo.formId')
const { value: applicationId, errorMessage: applicationIdError } =
  useField<string>('baseInfo.applicationId')
const { value: applicationName, errorMessage: applicationNameError } = useField<string>(
  'baseInfo.applicationName'
)
const { value: applicationDate, errorMessage: applicationDateError } = useField<Date>(
  'baseInfo.applicationDate'
)
</script>
<template>
  <div>
    <div class="flex flex-wrap gap-5">
      <InputField for="formId" :label="$t('Form.BaseInfo.formId')" :error="formIdError">
        <InputText id="formId" type="formId" v-model="formId" :invalid="!!formIdError" disabled />
      </InputField>

      <InputField
        for="applicationId"
        :label="$t('Form.BaseInfo.applicationId')"
        :error="applicationIdError"
      >
        <InputText
          id="applicationId"
          type="applicationId"
          v-model="applicationId"
          :invalid="!!applicationIdError"
          disabled
        />
      </InputField>

      <InputField
        for="applicationName"
        :label="$t('Form.BaseInfo.applicationName')"
        :error="applicationNameError"
      >
        <InputText
          id="applicationName"
          type="applicationName"
          v-model="applicationName"
          :invalid="!!applicationNameError"
          disabled
        />
      </InputField>

      <InputField
        for="applicationDate"
        :label="$t('Form.BaseInfo.applicationDate')"
        :error="applicationDateError"
      >
        <!-- <InputText
    id="applicationDate"
    type="applicationDate"
    v-model="applicationDate"
        :invalid="!!applicationDateError"
      /> -->
      </InputField>
    </div>
  </div>
</template>
