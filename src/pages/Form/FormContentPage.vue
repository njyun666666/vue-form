<script setup lang="ts">
import A from '@/components/Form/A/AForm.vue'
import B from '@/components/Form/B/BForm.vue'
import Toolbar from '@/components/Form/Toolbar.vue'
import { formService } from '@/libs/services/formService'
import { type FormClassType, FormPageAction, type FormPageActionType } from '@/libs/types/FormTypes'
import BasePage from '@/pages/BasePage.vue'
import { useLayoutStore } from '@/stores/layout'
import Skeleton from 'primevue/skeleton'
import { computed, onMounted, provide, ref, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

// import type { ComponentExposed } from 'vue-component-type-helpers'

const loading = ref(true)
const auth = ref(false)
const layout = useLayoutStore()
const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const formPageAction = ref(
  (route.params['formPageAction'] as string)?.toLowerCase() as FormPageActionType
)
const formClass = ref((route.params['formClass'] as string)?.toUpperCase() as FormClassType)
const formId = ref((route.params['formId'] as string)?.toUpperCase())
const toolbar = useTemplateRef<InstanceType<typeof Toolbar>>('toolbar')
// const toolbar2 = useTemplateRef<ComponentExposed<typeof Toolbar>>('toolbar2')

const mapping: {
  [key in FormClassType]: any
} = {
  A: A,
  B: B
}

if (!formPageAction.value) {
  console.error(`FormPageActionType is undefined`)
  router.replace('/')
}

if (!formClass.value) {
  console.error(`formClass is undefined`)
  router.replace('/')
}

if (!mapping[formClass.value]) {
  console.error(`formClass component is not mapped`)
  router.replace('/')
}

const webTitle = computed(() => {
  let title = `${t(`Form.Class.${formClass.value}`)} / ${t(`Form.PageType.${formPageAction.value}`)}`

  if (formId.value) {
    title = `${formId.value} / ${title}`
  }

  return title
})

layout.webTitle = webTitle.value

formService
  .checkAuth(formPageAction.value, formClass.value, formId.value)
  .then(({ data }) => {
    if (!data.formPageAction.includes(formPageAction.value)) {
      router.replace(`/form/${FormPageAction.info}/${formClass.value}/${formId.value}`)
      return
    }

    auth.value = true
    loading.value = false
  })
  .catch((error) => {
    console.error(error)
    loading.value = false
  })

provide('toolbar', toolbar)
// provide('toolbar2', toolbar2)

onMounted(() => {
  console.log('content page')
})
</script>
<template>
  <div v-if="loading" class="p-4 flex gap-5 flex-col">
    <Skeleton width="50%" height="2rem"></Skeleton>
    <div class="flex gap-5">
      <div class="flex flex-col gap-5 w-1/4" v-for="n in 4" :key="n">
        <Skeleton width="50%" height="1.5rem"></Skeleton>
        <Skeleton width="100%" height="1.5rem"></Skeleton>
      </div>
    </div>
  </div>
  <div v-if="!loading && !auth">no auth</div>
  <div v-if="auth" class="flex flex-col w-full h-full">
    <Toolbar ref="toolbar" class="shrink-0" :formPageAction="formPageAction" />
    <!-- <Toolbar ref="toolbar2" class="shrink-0"></Toolbar> -->
    <div class="grow overflow-hidden">
      <BasePage>
        <component :is="mapping[formClass]"></component>
      </BasePage>
    </div>
  </div>
</template>
