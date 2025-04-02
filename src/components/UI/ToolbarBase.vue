<script setup lang="ts">
import { cn } from '@/libs/utils/style'
import type { HTMLAttributes } from 'vue'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>
<template>
  <div :class="cn('flex h-[50px] w-full gap-1 bg-surface-0 p-1 dark:bg-surface-900', props.class)">
    <slot />
  </div>
</template>
