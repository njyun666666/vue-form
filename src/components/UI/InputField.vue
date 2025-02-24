<script setup lang="ts">
import RequiredMark from '../Common/RequiredMark.vue'
import { cn } from '@/libs/utils/style'
import type { HTMLAttributes } from 'vue'

interface Props {
  clsss?: HTMLAttributes['class']
  for?: string
  label?: string
  error?: string
  isRequired?: boolean
}
const props = defineProps<Props>()
</script>
<template>
  <div :class="cn('flex flex-col gap-2', props.clsss)">
    <label v-if="label" :for="props.for">
      <RequiredMark v-if="isRequired" />
      {{ label }}
    </label>
    <slot />
    <small v-if="props.error" class="text-error">{{ error }}</small>
  </div>
</template>
