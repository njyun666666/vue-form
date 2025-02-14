<script setup lang="ts">
import A from '@/components/Form/A/AForm.vue'
import B from '@/components/Form/B/BForm.vue'
import Toolbar from '@/components/Form/Toolbar.vue'
import { type FormClassType, type FormPageType } from '@/libs/types/FormTypes'
import BasePage from '@/pages/BasePage.vue'
import { useLayoutStore } from '@/stores/layout'
import { computed, onMounted, provide, ref, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

// import type { ComponentExposed } from 'vue-component-type-helpers'
const layout = useLayoutStore()
const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const formPageType = ref((route.params['formPageType'] as string)?.toLowerCase() as FormPageType)
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

if (!formPageType.value) {
  console.error(`formPageType is undefined`)
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
  let title = `${t(`Form.Class.${formClass.value}`)} / ${t(`Form.PageType.${formPageType.value}`)}`

  if (formId.value) {
    title = `${formId.value} / ${title}`
  }

  return title
})

layout.webTitle = webTitle.value

provide('toolbar', toolbar)
// provide('toolbar2', toolbar2)

onMounted(() => {
  console.log('content page')
})
</script>
<template>
  <div class="flex flex-col w-full h-full">
    <Toolbar ref="toolbar" class="shrink-0" :formPageType="formPageType" />
    <!-- <Toolbar ref="toolbar2" class="shrink-0"></Toolbar> -->
    <div class="flex-grow h-full w-full">
      <BasePage class="mb-52">
        <component :is="mapping[formClass]"></component>
      </BasePage>
    </div>
  </div>
</template>
