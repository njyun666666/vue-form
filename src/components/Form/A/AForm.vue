<script setup lang="ts">
import BaseInfoForm from '../BaseInfoForm.vue'
import { productDetailSchema } from '../ProductDetail/productDetail'
import type Toolbar from '../Toolbar.vue'
import AFormInfo from './AFormInfo.vue'
import { aFormInfoSchema } from './a'
import { baseInfoSchema } from '@/components/Form/form'
import { AInfoModel, AModel } from '@/libs/models/Form/A/A'
import { FormBaseInfoModel, FormPageInfoModel } from '@/libs/models/Form/FormModel'
import { aService } from '@/libs/services/forms/aService'
import { requiredFieldsValidator } from '@/libs/utils/zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { type Ref, inject, onMounted, provide, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'
import * as z from 'zod'

const { t } = useI18n()
// import type { ComponentExposed } from 'vue-component-type-helpers'
const pageInfo = inject<Ref<FormPageInfoModel>>('pageInfo')
const toolbar = inject<Ref<InstanceType<typeof Toolbar>>>('toolbar')
// const toolbar2 = inject<Ref<ComponentExposed<typeof Toolbar>>>('toolbar2')
const AFormInfoRef = useTemplateRef<InstanceType<typeof AFormInfo>>('AFormInfoRef')

const form = useForm({
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
            code: z.ZodIssueCode.custom,
            message: t('Message.Required'),
            path: [`info.${field}`]
          })
        })
      })
  ),
  initialValues: {
    baseInfo: new FormBaseInfoModel(),
    info: new AInfoModel(),
    productDetail: []
  }
})

async function onSubmit() {
  const isValid = await form.validate()
  console.log('values', isValid.values)
  // console.log(values)

  const aFormInfoValid = await AFormInfoRef.value?.validate()

  if (!isValid.valid || !aFormInfoValid) {
    console.error(isValid.errors)
    return false
  }

  return aService
    .save(isValid.values || {})
    .then(({ data }) => data)
    .catch((error) => {
      console.error(error)
      return false
    })
}

onMounted(() => {
  // console.log('aform')

  // toolbar!.value.applicationBtn.beforeAction = async () => {
  //   console.log('beforeAction')
  // }

  toolbar!.value.applicationBtn.saveAction = onSubmit

  // toolbar!.value.applicationBtn.afterAction = async () => {
  //   console.log('afterAction')
  // }
})

provide('form', form)
</script>
<template>
  <form novalidate @submit="onSubmit">
    <h1>{{ $t('Form.Class.A') }}</h1>
    <div>
      <BaseInfoForm />
    </div>

    <div>
      <AFormInfo ref="AFormInfoRef" />
    </div>

    <pre>{{ JSON.stringify(form.values, null, 2) }}</pre>
  </form>
</template>
