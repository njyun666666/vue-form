import AForm from '@/components/Form/A/AForm.vue'
import BForm from '@/components/Form/B/BForm.vue'
import { FormClassEnum } from '@/libs/enums/FormTypes'
import type { Component } from 'vue'

export const formComponentMap: Record<FormClassEnum, Component> = {
  [FormClassEnum.A]: AForm,
  [FormClassEnum.B]: BForm
}
