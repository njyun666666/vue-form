<script setup lang="ts">
import { cn } from '@/libs/utils/style'
import type { HTMLAttributes } from 'vue'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>
<template>
  <div :class="cn('base-page', 'p-4', props.class)">
    <slot />
  </div>
</template>
