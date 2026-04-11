<script setup lang="ts">
import StartNodeEditForm from '../Form/StartNodeEditForm.vue'
import { useNodeEditDialog } from '../composables/useNodeEditDialog'
import type { FlowNodeData, FlowNodeEvents } from '@/libs/models/FlowChart/FlowNode'
import { useNode } from '@vue-flow/core'
import Button from 'primevue/button'

const { node } = useNode<FlowNodeData, FlowNodeEvents>()
const { openDialog } = useNodeEditDialog()
</script>
<template>
  <Button
    icon="pi pi-pencil"
    v-tooltip.top="$t('Action.Edit')"
    severity="secondary"
    variant="text"
    @click="openDialog(StartNodeEditForm, node)"
  />
</template>
