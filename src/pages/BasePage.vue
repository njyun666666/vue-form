<script setup lang="ts">
import { cn } from '@/libs/utils/style'
import ScrollPanel from 'primevue/scrollpanel'
import type { HTMLAttributes } from 'vue'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>
<template>
  <ScrollPanel :class="cn('w-full h-full')">
    <div :class="cn('base-page', 'p-4', props.class)">
      <slot />
    </div>
  </ScrollPanel>
</template>
