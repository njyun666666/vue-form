<script setup lang="ts">
import SnappableConnectionLine from './ConnectionLine/SnappableConnectionLine.vue'
import SpecialEdge from './Edges/SpecialEdge.vue'
import EndNode from './Nodes/EndNode.vue'
import GatewayNode from './Nodes/GatewayNode.vue'
import NodeBar from './Nodes/NodeBar.vue'
import StartNode from './Nodes/StartNode.vue'
import TaskNode from './Nodes/TaskNode.vue'
import useFlowNodeDnd from './useFlowNodeDnd'
import { SeverityEnum } from '@/libs/enums/layout'
import type { FlowNode } from '@/libs/models/FlowChart/FlowNode'
import { useCreateConfirm } from '@/libs/utils/confirm'
import { uuid } from '@/libs/utils/uuid'
import { Background } from '@vue-flow/background'
import type { Edge, EdgeChange, EdgeRemoveChange, Node, NodeMouseEvent } from '@vue-flow/core'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { useConfirm } from 'primevue/useconfirm'
import { markRaw, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const comfrim = useConfirm()
const createComfrim = useCreateConfirm(comfrim)
const {
  onConnect,
  onNodesChange,
  applyNodeChanges,
  onEdgesChange,
  applyEdgeChanges,
  addEdges,
  removeEdges,
  toObject,
  fromObject,
  setNodes,
  findNode,
  getEdges
} = useVueFlow()
const { onDragOver, onDrop, onDragLeave } = useFlowNodeDnd(comfrim)
const nodes = ref<FlowNode[]>([])
const edges = ref<Edge[]>([])
const nodeTypes = {
  start: markRaw(StartNode),
  end: markRaw(EndNode),
  task: markRaw(TaskNode),
  gateway: markRaw(GatewayNode)
}
const edgeTypes = {
  special: markRaw(SpecialEdge)
}

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

onNodesChange(async (changes) => {
  const nextChanges = []
  const edgeNextChanges: EdgeChange[] = []

  for (const change of changes) {
    if (change.type === 'remove') {
      const node = findNode<FlowNode>(change.id)
      // console.log('node change', node)

      const isConfirmed = await createComfrim.open({
        message: t('Title.ConfirmText', {
          action: t('Action.Remove'),
          title: node?.data.label as string
        }),
        acceptProps: {
          label: t('Action.Remove'),
          severity: SeverityEnum.danger
        }
      })

      if (isConfirmed) {
        nextChanges.push(change)

        getEdges.value
          .filter((edge) => edge.source === change.id || edge.target === change.id)
          .forEach((edge) => {
            // console.log('edge', edge)
            const e: EdgeRemoveChange = {
              id: edge.id,
              type: 'remove',
              source: edge.source,
              target: edge.target,
              sourceHandle: edge.sourceHandle ?? null,
              targetHandle: edge.targetHandle ?? null
            }
            edgeNextChanges.push(e)
          })
      }
    } else {
      nextChanges.push(change)
    }
  }

  applyNodeChanges(nextChanges)
  applyEdgeChanges(edgeNextChanges)
})

onEdgesChange(async (changes) => {
  const nextChanges = []

  for (const change of changes) {
    if (change.type === 'remove') {
      // console.log('edge change', change)

      const sourceLabel = (findNode(change.source)?.data?.label as string) || change.source
      const targetLabel = (findNode(change.target)?.data?.label as string) || change.target

      const isConfirmed = await createComfrim.open({
        message: t('Title.ConfirmText', {
          action: t('Action.Remove'),
          title: `${sourceLabel} -> ${targetLabel}`
        }),
        acceptProps: {
          label: t('Action.Remove'),
          severity: SeverityEnum.danger
        }
      })

      if (isConfirmed) {
        nextChanges.push(change)
      }
    } else {
      nextChanges.push(change)
    }
  }

  applyEdgeChanges(nextChanges)
})

const nodeClick = () => {}

defineExpose({ onSave })
</script>

<template>
  <div class="flex h-full w-full flex-col">
    <div class="dnd-flow flex h-full w-full" @drop="onDrop">
      <NodeBar class="h-full w-25 border"></NodeBar>
      <div class="grow" @click="flowDivClick">
        <VueFlow
          v-model:nodes="nodes"
          v-model:edges="edges"
          :connection-radius="40"
          delete-key-code="Delete"
          :default-edge-options="{
            type: 'special',
            markerEnd: 'arrowclosed'
          }"
          :node-types="nodeTypes"
          :edge-types="edgeTypes"
          :zoomOnDoubleClick="false"
          @dragover="onDragOver"
          @dragleave="onDragLeave"
          :apply-default="false"
        >
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
