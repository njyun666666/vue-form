<script setup lang="ts">
import NodeBaseToolbar from '../NodeToolbar/NodeBaseToolbar.vue'
import NodeDeleteBtn from '../NodeToolbar/NodeDeleteBtn.vue'
import TaskNodeEditBtn from '../NodeToolbar/TaskNodeEditBtn.vue'
import type { FlowNodeProps } from '@/libs/models/FlowChart/FlowNode'
import { cn } from '@/libs/utils/style'
import { Handle, Position } from '@vue-flow/core'
import { NodeResizer } from '@vue-flow/node-resizer'

const props = defineProps<FlowNodeProps>()
// console.log(props)
</script>

<template>
  <div>
    <NodeResizer :min-width="50" :min-height="50" :isVisible="selected" />
    <NodeBaseToolbar>
      <TaskNodeEditBtn />
      <NodeDeleteBtn />
    </NodeBaseToolbar>

    <div>{{ data.label }}</div>

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
