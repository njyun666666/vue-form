<script setup lang="ts">
import GatewayNodeEditForm from '../Form/GatewayNodeEditForm.vue'
import { useNodeEditDialog } from '../composables/useNodeEditDialog'
import type { FlowNodeData, FlowNodeEvents } from '@/libs/models/FlowChart/FlowNode'
import { useNode, useVueFlow } from '@vue-flow/core'
import Button from 'primevue/button'

const { node } = useNode<FlowNodeData, FlowNodeEvents>()
const { getEdges, findNode } = useVueFlow()
const { openDialog } = useNodeEditDialog()

const onEdit = () => {
  const targetNodes = getEdges.value
    .filter((e) => e.source === node.id)
    .map((e) => ({
      id: e.target,
      label: findNode(e.target)?.data?.label ?? e.target
    }))
  openDialog(GatewayNodeEditForm, node, { targetNodes }, '75vw', (data) => {
    data.gateway?.conditions?.forEach((cond) => {
      const edge = getEdges.value.find(
        (e) => e.source === node.id && e.target === cond.targetNodeId
      )
      if (edge) edge.label = cond.name ?? ''
    })
  })
}
</script>
<template>
  <Button
    icon="pi pi-pencil"
    v-tooltip.top="$t('Action.Edit')"
    severity="secondary"
    variant="text"
    @click="onEdit"
  />
</template>
