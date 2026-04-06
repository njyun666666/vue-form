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
  applicantId: useField<string>('baseInfo.applicantId'),
  applicantName: useField<string>('baseInfo.applicantName'),
  applicationDate: useField<Date>('baseInfo.applicationDate')
}

if (pageInfo?.value.formPageAction == FormPageActionEnum.application) {
  field.formClass.value.value = pageInfo?.value.formClass
  field.applicantId.value.value = String(login.tokenPayload?.uid)
  field.applicantName.value.value = String(login.tokenPayload?.sub)
  field.applicationDate.value.value = new Date()
} else {
  if (field.applicationDate.value.value) {
    field.applicationDate.value.value = new Date(field.applicationDate.value.value)
  }
}
</script>
<template>
  <div>
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-3">
      <InputField for="formId" :label="$t('Form.BaseInfo.formId')">
        <InputText id="formId" type="text" v-model="field.formId.value.value" disabled />
      </InputField>

      <InputField for="applicantName" :label="$t('Form.BaseInfo.applicantName')">
        <InputText
          id="applicantName"
          type="text"
          v-model="field.applicantName.value.value"
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
