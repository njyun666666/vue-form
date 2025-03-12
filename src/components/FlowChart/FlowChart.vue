<script setup lang="ts">
import ToolbarBase from '../UI/ToolbarBase.vue'
import SpecialEdge from './Edges/SpecialEdge.vue'
import NodeBar from './Nodes/NodeBar.vue'
import StartNode from './Nodes/StartNode.vue'
import useDragAndDrop from './useDnd'
import type { FlowNode } from '@/libs/models/FlowChart/FlowChart'
import type { Edge, Node } from '@vue-flow/core'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import Button from 'primevue/button'
import { ref } from 'vue'

const { onConnect, addEdges, toObject, fromObject } = useVueFlow()
const { onDragOver, onDrop, onDragLeave } = useDragAndDrop()
const nodes = ref<FlowNode[]>([])
const edges = ref<Edge[]>([])

onConnect(addEdges)

const onSave = () => {
  console.log('json', toObject())
}
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <ToolbarBase class="shrink-0">
      <Button :label="$t('Action.Save')" icon="pi pi-save" variant="text" @click="onSave" />
    </ToolbarBase>
    <div class="dnd-flow flex w-full h-full" @drop="onDrop">
      <NodeBar class="h-full w-[100px] border"></NodeBar>
      <div class="grow">
        <VueFlow
          v-model:nodes="nodes"
          v-model:edges="edges"
          @dragover="onDragOver"
          @dragleave="onDragLeave"
          :default-edge-options="{
            type: 'smoothstep',
            markerEnd: 'arrow'
          }"
        >
          <template #node-start="startNodeProps">
            <StartNode v-bind="startNodeProps" />
          </template>
        </VueFlow>
      </div>
    </div>
  </div>
</template>
