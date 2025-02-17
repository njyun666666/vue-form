<script setup lang="ts">
import InputField from '@/components/UI/InputField.vue'
import { FormPageInfoModel } from '@/libs/models/Form/FormModel'
import { useLoginStore } from '@/stores/login'
import DatePicker from 'primevue/datepicker'
import InputText from 'primevue/inputtext'
import { useField } from 'vee-validate'
import { type Ref, inject } from 'vue'

const pageInfo = inject<Ref<FormPageInfoModel>>('pageInfo')
const login = useLoginStore()

const { value: formId } = useField<string>('baseInfo.formId')
const { value: applicationId } = useField<string>('baseInfo.applicationId')
const { value: applicationName } = useField<string>('baseInfo.applicationName')
const { value: applicationDate } = useField<Date>('baseInfo.applicationDate')

if (pageInfo?.value.formPageAction == 'add') {
  applicationId.value = String(login.tokenPayload?.uid)
  applicationName.value = String(login.tokenPayload?.sub)
  applicationDate.value = new Date()
}
</script>
<template>
  <div>
    <div class="flex flex-wrap gap-5">
      <InputField for="formId" :label="$t('Form.BaseInfo.formId')">
        <InputText id="formId" type="text" v-model="formId" disabled />
      </InputField>

      <!-- <InputField
        for="applicationId"
        :label="$t('Form.BaseInfo.applicationId')"
      >
        <InputText
          id="applicationId"
          type="text"
          v-model="applicationId"
          disabled
        />
      </InputField> -->

      <InputField for="applicationName" :label="$t('Form.BaseInfo.applicationName')">
        <InputText id="applicationName" type="text" v-model="applicationName" disabled />
      </InputField>

      <InputField for="applicationDate" :label="$t('Form.BaseInfo.applicationDate')">
        <DatePicker
          id="applicationDate"
          showTime
          hourFormat="24"
          v-model="applicationDate"
          disabled
        />
      </InputField>
    </div>
  </div>
</template>
