<script setup lang="ts">
import { Position, useConnection, useNode } from '@vue-flow/core'
import { NodeToolbar, type NodeToolbarProps } from '@vue-flow/node-toolbar'

const props = defineProps<NodeToolbarProps>()
const { node } = useNode()
const { startHandle } = useConnection()
</script>
<template>
  <NodeToolbar
    v-bind="props"
    :is-visible="node.selected && !startHandle"
    :position="Position.Right"
    :offset="10"
    class="flex gap-1"
  >
    <slot />
  </NodeToolbar>
</template>
