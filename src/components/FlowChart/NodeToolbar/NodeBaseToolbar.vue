<script setup lang="ts">
import { Position } from '@vue-flow/core'
import { NodeToolbar, type NodeToolbarProps } from '@vue-flow/node-toolbar'

const props = defineProps<NodeToolbarProps>()
</script>
<template>
  <NodeToolbar v-bind="props" :position="Position.Right" :offset="10">
    <slot />
  </NodeToolbar>
</template>
