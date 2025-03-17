<script setup lang="ts">
import { Position, useNode } from '@vue-flow/core'
import { NodeToolbar, type NodeToolbarProps } from '@vue-flow/node-toolbar'

const props = defineProps<NodeToolbarProps>()
const { node } = useNode()
</script>
<template>
  <NodeToolbar v-bind="props" :is-visible="node.selected" :position="Position.Right" :offset="10">
    <slot />
  </NodeToolbar>
</template>
