<script setup lang="ts">
import BaseInfoForm from '../BaseInfoForm.vue'
import { productDetailSchema } from '../ProductDetail/productDetailSchema'
import type Toolbar from '../Toolbar/Toolbar.vue'
import AFormInfo from './AFormInfo.vue'
import { aFormInfoSchema } from './a'
import { baseInfoSchema } from '@/components/Form/form'
import { FormFieldModeEnum, FormPageActionEnum } from '@/libs/enums/FormTypes'
import { AInfoModel, AModel } from '@/libs/models/Form/A/A'
import { FormBaseInfoModel, FormPageInfoModel } from '@/libs/models/Form/FormModel'
import { aService } from '@/libs/services/forms/aService'
import { useCreateConfirm } from '@/libs/utils/confirm'
import { requiredFieldsValidator } from '@/libs/utils/zod'
import { toTypedSchema } from '@vee-validate/zod'
import Skeleton from 'primevue/skeleton'
import { useConfirm } from 'primevue/useconfirm'
import { useForm } from 'vee-validate'
import { type Ref, inject, onMounted, provide, ref, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'
import * as z from 'zod'

const { t } = useI18n()
const confirm = useCreateConfirm(useConfirm())

const loading = ref(true)
const pageInfo = inject<Ref<FormPageInfoModel>>('pageInfo')!
const toolbar = inject<Ref<InstanceType<typeof Toolbar>>>('toolbar')
const AFormInfoRef = useTemplateRef<InstanceType<typeof AFormInfo>>('AFormInfoRef')

const initialValues: AModel = {
  baseInfo: new FormBaseInfoModel(),
  info: new AInfoModel(),
  productDetail: []
}

const form = useForm<AModel>({
  validationSchema: toTypedSchema(
    z
      .object({
        baseInfo: baseInfoSchema,
        info: aFormInfoSchema,
        productDetail: z.array(productDetailSchema)
      })
      .superRefine((val, ctx) => {
        requiredFieldsValidator(val.info, AFormInfoRef.value?.fieldMode).forEach((field) => {
          ctx.addIssue({
            code: 'custom',
            message: t('Message.Required'),
            path: [`info.${field}`]
          })
        })
      })
      .superRefine((val, ctx) => {
        if (
          AFormInfoRef.value?.fieldMode.productDetail === FormFieldModeEnum.required &&
          val.productDetail.length === 0
        ) {
          ctx.addIssue({
            code: 'custom',
            message: t('Message.At_least_number_entry_is_required', { number: 1 }),
            path: ['productDetail']
          })
        }

        val.productDetail?.forEach((item, index) => {
          requiredFieldsValidator(item, AFormInfoRef.value?.productDetailFieldMode).forEach(
            (field) => {
              ctx.addIssue({
                code: 'custom',
                message: t('Message.Required'),
                path: [`productDetail.${index}.${field}`]
              })
            }
          )
        })
      })
  ),
  initialValues: initialValues
})

if (pageInfo?.value.formPageAction === FormPageActionEnum.application) {
  loading.value = false
} else {
  aService.data(`${pageInfo.value.formId}`).then((data) => {
    form.setValues(data.data)
    loading.value = false
  })
}

async function onValidate() {
  const { valid, errors } = await form.validate()

  if (!valid) {
    console.error(errors)
    confirm.alert({ message: t('Message.Please_check_the_field') })
    return false
  }

  return true
}

async function onSubmit() {
  if (!(await onValidate())) return false

  form.setFieldValue('baseInfo.description', form.values?.info?.title)

  return aService
    .save(form.values || {})
    .then(({ data }) => data)
    .catch((error) => {
      console.error(error)
      return false
    })
}

onMounted(() => {
  toolbar!.value.applicationBtn.validate = onValidate
  toolbar!.value.approveBtn.validate = onValidate

  toolbar!.value.applicationBtn.saveAction = onSubmit
  toolbar!.value.approveBtn.saveAction = onSubmit
})

provide('form', form)
</script>
<template>
  <div v-if="loading" class="flex flex-col gap-5 p-4">
    <Skeleton width="50%" height="2rem"></Skeleton>
    <div class="flex gap-5">
      <div class="flex w-1/4 flex-col gap-5" v-for="n in 4" :key="n">
        <Skeleton width="50%" height="1.5rem"></Skeleton>
        <Skeleton width="100%" height="1.5rem"></Skeleton>
      </div>
    </div>
  </div>
  <form v-else novalidate @submit="onSubmit">
    <h1>{{ $t('Form.Class.A') }}</h1>
    <div>
      <BaseInfoForm />
    </div>

    <div>
      <AFormInfo ref="AFormInfoRef" />
    </div>
  </form>
</template>
