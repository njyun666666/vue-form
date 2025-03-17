<script setup lang="ts">
import NodeBaseToolbar from '../NodeToolbar/NodeBaseToolbar.vue'
import NodeDeleteBtn from '../NodeToolbar/NodeDeleteBtn.vue'
import type { FlowNodeProps } from '@/libs/models/FlowChart/FlowChart'
import { cn } from '@/libs/utils/style'
import { Handle, Position, useVueFlow } from '@vue-flow/core'
import { NodeResizer } from '@vue-flow/node-resizer'

const props = defineProps<FlowNodeProps>()
console.log(props)
const actions = ['👎', '✋', '👍']

const { updateNodeData } = useVueFlow()
</script>

<template>
  <div>
    <NodeResizer :min-width="50" :min-height="50" :isVisible="selected" />
    <NodeBaseToolbar :is-visible="data.toolbarVisible">
      <NodeDeleteBtn />
      <!-- <button
        v-for="action of actions"
        :key="action"
        type="button"
        :class="{ selected: action === data.action }"
        @click="updateNodeData(props.id, { action })"
      >
        {{ action }}
      </button> -->
    </NodeBaseToolbar>

    <div>{{ data.label }} {{ data.action }}</div>

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
