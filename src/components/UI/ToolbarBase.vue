<script setup lang="ts">
import { cn } from '@/libs/utils/style'
import type { HTMLAttributes } from 'vue'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>
<template>
  <div :class="cn('w-full h-[50px] flex bg-surface-0 dark:bg-surface-900 gap-1 p-1', props.class)">
    <slot />
  </div>
</template>
