<script setup lang="ts">
import BaseInfoForm from '../BaseInfoForm.vue'
import type Toolbar from '../Toolbar.vue'
import AFormInfo from './AFormInfo.vue'
import { aFormInfoSchema } from './a'
import { baseInfoSchema } from '@/components/Form/form'
import type { AModel } from '@/libs/models/Form/A/A'
import { aService } from '@/libs/services/forms/aService'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { type Ref, inject, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import * as z from 'zod'

// import type { ComponentExposed } from 'vue-component-type-helpers'

const toolbar = inject<Ref<InstanceType<typeof Toolbar>>>('toolbar')
// const toolbar2 = inject<Ref<ComponentExposed<typeof Toolbar>>>('toolbar2')

const { defineField, handleSubmit, errors, validate, values } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      baseInfo: baseInfoSchema,
      info: aFormInfoSchema
    })
  ),
  initialValues: {
    baseInfo: {
      formId: '111',
      applicationId: 'wwww',
      applicationName: 'eee',
      applicationDate: new Date()
    },
    info: {
      title: 'ttttttt',
      content: '',
      amount: 0,
      datetime: new Date(),
      checkbox: [],
      select: []
    }
  }
})

async function onSubmit() {
  const isValid = await validate()
  console.log(isValid.values)
  console.log(values)

  if (!isValid.valid) {
    console.warn(isValid.errors)
    return false
  }

  return aService
    .save(values)
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
</script>
<template>
  <form novalidate @submit="onSubmit">
    <h1>{{ $t('Form.Class.A') }}</h1>
    <div>
      <BaseInfoForm />
    </div>

    <div>
      <AFormInfo />
    </div>

    <div>
      {{ values }}
    </div>
  </form>
</template>
