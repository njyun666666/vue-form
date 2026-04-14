<script setup lang="ts">
import EdgeDeleteBtn from '../EdgeToolbar/EdgeDeleteBtn.vue'
import EdgeEditBtn from '../EdgeToolbar/EdgeEditBtn.vue'
import { BaseEdge, EdgeLabelRenderer, type EdgeProps, getSmoothStepPath } from '@vue-flow/core'
import { computed } from 'vue'

const props = defineProps<EdgeProps>()

const path = computed(() => getSmoothStepPath(props))
</script>

<template>
  <BaseEdge :path="path[0]" :interaction-width="20" />

  <EdgeLabelRenderer>
    <!-- label -->
    <div
      v-if="label"
      :style="{
        pointerEvents: 'none',
        position: 'absolute',
        transform: `translate(-50%, -50%) translate(${path[1]}px, ${path[2]}px)`
      }"
      class="nodrag nopan rounded bg-(--vf-connection-path) px-1 text-xs text-(--vf-node-bg)"
    >
      {{ label }}
    </div>

    <!-- toolbar -->
    <div
      v-if="selected"
      :style="{
        pointerEvents: 'all',
        position: 'absolute',
        transform: `translate(-50%, -100%) translate(${path[1]}px, ${path[2] - 4}px)`
      }"
      class="nodrag nopan flex gap-1 rounded bg-surface-300 p-1 dark:bg-surface-900"
    >
      <EdgeEditBtn />
      <EdgeDeleteBtn />
    </div>
  </EdgeLabelRenderer>
</template>
