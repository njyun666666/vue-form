<script setup lang="ts">
import { cn } from '@/libs/utils/style'
import { Handle, Position, useVueFlow } from '@vue-flow/core'
import type { NodeProps } from '@vue-flow/core'
import { NodeResizer } from '@vue-flow/node-resizer'
import { NodeToolbar } from '@vue-flow/node-toolbar'

const props = defineProps<NodeProps>()
console.log(props)
const actions = ['👎', '✋', '👍']

const { updateNodeData } = useVueFlow()
</script>

<template>
  <div>
    <NodeResizer :min-width="50" :min-height="50" :isVisible="selected" />
    <NodeToolbar :is-visible="data.toolbarVisible" :position="Position.Right" :offset="10">
      <button
        v-for="action of actions"
        :key="action"
        type="button"
        :class="{ selected: action === data.action }"
        @click="updateNodeData(props.id, { action })"
      >
        {{ action }}
      </button>
    </NodeToolbar>

    <div>
      {{ data.label }}
    </div>

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
