<script setup lang="ts">
import InputField from '@/components/UI/InputField.vue'
import { FormPageActionEnum } from '@/libs/enums/FormTypes'
import { FormPageInfoModel } from '@/libs/models/Form/FormModel'
import { useLoginStore } from '@/stores/login'
import dayjs from 'dayjs'
// import DatePicker from 'primevue/datepicker'
import InputText from 'primevue/inputtext'
import { useField } from 'vee-validate'
import { type Ref, computed, inject } from 'vue'

const pageInfo = inject<Ref<FormPageInfoModel>>('pageInfo')
const login = useLoginStore()

const field = {
  formId: useField<string>('baseInfo.formId'),
  formClass: useField<string>('baseInfo.formClass'),
  applicationId: useField<string>('baseInfo.applicationId'),
  applicationName: useField<string>('baseInfo.applicationName'),
  applicationDate: useField<Date>('baseInfo.applicationDate')
}

if (pageInfo?.value.formPageAction == FormPageActionEnum.application) {
  field.formClass.value.value = pageInfo?.value.formClass
  field.applicationId.value.value = String(login.tokenPayload?.uid)
  field.applicationName.value.value = String(login.tokenPayload?.sub)
  field.applicationDate.value.value = new Date()
} else {
  if (field.applicationDate.value.value) {
    field.applicationDate.value.value = new Date(field.applicationDate.value.value)
  }
}
</script>
<template>
  <div>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
      <InputField for="formId" :label="$t('Form.BaseInfo.formId')">
        <InputText id="formId" type="text" v-model="field.formId.value.value" disabled />
      </InputField>

      <InputField for="applicationName" :label="$t('Form.BaseInfo.applicationName')">
        <InputText
          id="applicationName"
          type="text"
          v-model="field.applicationName.value.value"
          disabled
        />
      </InputField>

      <InputField for="applicationDate" :label="$t('Form.BaseInfo.applicationDate')">
        <InputText
          id="applicationDate"
          type="text"
          :value="dayjs(field.applicationDate.value.value).format('YYYY/MM/DD HH:mm')"
          disabled
        />
        <!-- <DatePicker
          id="applicationDate"
          showTime
          dateFormat="yy/mm/dd"
          hourFormat="24"
          v-model="applicationDate"
          disabled
        /> -->
      </InputField>
    </div>
  </div>
</template>
