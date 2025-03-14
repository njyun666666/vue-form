<script setup lang="ts">
import ToolbarBase from '../UI/ToolbarBase.vue'
import SnappableConnectionLine from './ConnectionLine/SnappableConnectionLine.vue'
import NodeBar from './Nodes/NodeBar.vue'
import StartNode from './Nodes/StartNode.vue'
import useDragAndDrop from './useDnd'
import type { FlowNode } from '@/libs/models/FlowChart/FlowChart'
import { uuid } from '@/libs/utils/uuid'
import { Background } from '@vue-flow/background'
import type { Edge, Node, NodeMouseEvent } from '@vue-flow/core'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import Button from 'primevue/button'
import { ref } from 'vue'

const { onConnect, addEdges, toObject, fromObject, setNodes } = useVueFlow()
const { onDragOver, onDrop, onDragLeave } = useDragAndDrop()
const nodes = ref<FlowNode[]>([])
const edges = ref<Edge[]>([])

onConnect(addEdges)

const onSave = () => {
  console.log('json', toObject())
}

// const nodeMouseEnter = ({ event, node }: NodeMouseEvent) => {
//   console.log(event, node)
// }

const flowDivClick = (e: MouseEvent) => {
  const dom = e.target as HTMLDivElement
  if (!dom.classList.contains('vue-flow__pane')) return
  setNodes((currentNodes) => currentNodes.map((node) => ({ ...node, selected: false })))
}

const nodeClick = () => {}
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <ToolbarBase class="shrink-0">
      <Button :label="$t('Action.Save')" icon="pi pi-save" variant="text" @click="onSave" />
    </ToolbarBase>
    <div class="dnd-flow flex w-full h-full" @drop="onDrop">
      <NodeBar class="h-full w-[100px] border"></NodeBar>
      <div class="grow" @click="flowDivClick">
        <VueFlow
          v-model:nodes="nodes"
          v-model:edges="edges"
          :connection-radius="40"
          delete-key-code="Delete"
          :zoomOnDoubleClick="false"
          @dragover="onDragOver"
          @dragleave="onDragLeave"
          :default-edge-options="{
            type: 'smoothstep',
            markerEnd: 'arrowclosed'
          }"
        >
          <template #node-start="startNodeProps">
            <StartNode v-bind="startNodeProps" />
          </template>

          <template
            #connection-line="{
              sourceX,
              sourceY,
              targetX,
              targetY,
              sourcePosition,
              targetPosition
            }"
          >
            <SnappableConnectionLine
              :source-x="sourceX"
              :source-y="sourceY"
              :target-x="targetX"
              :target-y="targetY"
              :source-position="sourcePosition"
              :target-position="targetPosition"
            />
          </template>

          <Background />
        </VueFlow>
      </div>
    </div>
  </div>
</template>
