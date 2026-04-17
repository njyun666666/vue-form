<script setup lang="ts">
import { Position, getBezierPath } from '@vue-flow/core'
import { computed } from 'vue'

const props = defineProps<{
  sourceX: number
  sourceY: number
  sourcePosition?: Position
  targetX: number
  targetY: number
  targetPosition?: Position
  curvature?: number
}>()
const path = computed(() => getBezierPath(props))
</script>

<template>
  <g>
    <path :d="path[0]" class="vue-flow__connection-path" />
    <circle
      class="vue-flow__connection-circle"
      :cx="targetX"
      :cy="targetY"
      :r="5"
      :stroke-width="1"
    />
  </g>
</template>
