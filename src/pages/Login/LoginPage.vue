<script setup lang="ts">
import appConfig from '@/appConfig'
import Brand from '@/components/Common/Brand.vue'
import ErrorMessage from '@/components/Common/ErrorMessage.vue'
import type { ResponseErrors } from '@/libs/api/formAPI'
import { loginService } from '@/libs/services/loginService'
import { useLoginStore } from '@/stores/login'
import { toTypedSchema } from '@vee-validate/zod'
import type { AxiosError } from 'axios'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { z } from 'zod'

const loginStore = useLoginStore()
const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const routeQueryUrl = route.query['url']
const errorMessage = ref<ResponseErrors>()

const formSchema = z.object({
  email: z
    .string()
    .email({ message: t('Message.InvalidEmail') })
    .trim()
    .min(1, { message: t('Message.Required') })
    .toLowerCase(),
  password: z
    .string()
    .trim()
    .min(1, { message: t('Message.Required') })
})

const { defineField, handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    email: appConfig.VITE_EMAIL,
    password: appConfig.VITE_PASSWORD
  }
})

const [email] = defineField('email')
const [password] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
  errorMessage.value = undefined

  await loginService
    .login(values)
    .then(async ({ data }) => {
      loginStore.login(data)

      if (routeQueryUrl) {
        await router.push(routeQueryUrl as string)
      } else {
        await router.push({ name: 'index' })
      }
    })
    .catch((error: AxiosError<ResponseErrors>) => {
      errorMessage.value = error.response!.data
    })
})
</script>

<template>
  <div className="flex w-full flex-col items-center p-2">
    <div className="mb-16 mt-8">
      <Brand />
    </div>
    <div className="w-full md:w-2/5 text-center">
      <form @submit="onSubmit" novalidate>
        <div class="flex flex-col gap-5 text-left">
          <ErrorMessage keypath="Login" :errors="errorMessage"> </ErrorMessage>

          <div class="flex flex-col gap-2">
            <label for="email">{{ $t('Login.Email') }}</label>
            <InputText
              id="email"
              type="email"
              autoComplete="username"
              v-model="email"
              :invalid="!!errors.email"
            />
            <small class="text-error">{{ errors.email }}</small>
          </div>

          <div class="flex flex-col gap-2">
            <label for="password">{{ $t('Login.Password') }}</label>
            <InputText
              id="password"
              type="password"
              autoComplete="current-password"
              v-model="password"
              :invalid="!!errors.password"
            />
            <small class="text-error">{{ errors.password }}</small>
          </div>

          <div class="text-center">
            <Button rounded type="submit" :label="$t('Action.Login')" :loading="isSubmitting" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
