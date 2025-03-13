<script setup lang="ts">
import { getBezierPath } from '@vue-flow/core'
import type { GetBezierPathParams } from 'node_modules/@vue-flow/core/dist/components/Edges/utils'
import { computed } from 'vue'

const props = defineProps<GetBezierPathParams>()
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
