<script setup lang="ts">
import NodeBaseToolbar from '../NodeToolbar/NodeBaseToolbar.vue'
import NodeDeleteBtn from '../NodeToolbar/NodeDeleteBtn.vue'
import NodeEditBtn from '../NodeToolbar/NodeEditBtn.vue'
import GetewaySvg from './GetewaySvg.vue'
import type { FlowNodeProps } from '@/libs/models/FlowChart/FlowNode'
import { cn } from '@/libs/utils/style'
import { Handle, Position } from '@vue-flow/core'
import { NodeResizer } from '@vue-flow/node-resizer'

const props = defineProps<FlowNodeProps>()
// console.log(props)
</script>

<template>
  <div>
    <GetewaySvg class="absolute top-0 left-0 z-0" />

    <NodeResizer :min-width="50" :min-height="50" :isVisible="selected" />
    <NodeBaseToolbar>
      <NodeEditBtn />
      <NodeDeleteBtn />
    </NodeBaseToolbar>

    <div class="relative z-[1]">{{ data.label }}</div>

    <Handle
      id="source-t"
      type="source"
      :position="Position.Top"
      :class="cn('opacity-0', { 'opacity-100': selected })"
    />
    <Handle
      id="source-b"
      type="source"
      :position="Position.Bottom"
      :class="cn('opacity-0', { 'opacity-100': selected })"
    />
    <Handle
      id="source-l"
      type="source"
      :position="Position.Left"
      :class="cn('opacity-0', { 'opacity-100': selected })"
    />
    <Handle
      id="source-r"
      type="source"
      :position="Position.Right"
      :class="cn('opacity-0', { 'opacity-100': selected })"
    />
  </div>
</template>
