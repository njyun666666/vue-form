<script setup lang="ts">
import NodeEditForm from '../Form/NodeEditForm.vue'
import NodeEditFormFooter from '../Form/NodeEditFormFooter.vue'
import { SeverityEnum } from '@/libs/enums/layout'
import type { FlowNode, FlowNodeData, FlowNodeEvents } from '@/libs/models/FlowChart/FlowNode'
import { useCreateConfirm } from '@/libs/utils/confirm'
import { useNode, useVueFlow } from '@vue-flow/core'
import Button from 'primevue/button'
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import { useConfirm } from 'primevue/useconfirm'
import { useDialog } from 'primevue/usedialog'
import { type Ref, markRaw, ref, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const createConfirm = useCreateConfirm(useConfirm())
const dialog = useDialog()
const { updateNode, updateNodeData } = useVueFlow()
const { node } = useNode<FlowNodeData, FlowNodeEvents>()
const save = ref<(e?: Event) => Promise<Promise<void> | undefined>>()

const onClick = async () => {
  const dialogRef = dialog.open(NodeEditForm, {
    data: node,
    props: {
      header: node.data.label,
      style: {
        width: '50vw'
      },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      modal: true
    },
    templates: {
      footer: markRaw(NodeEditFormFooter)
    },
    emits: {
      onSave: (e: (e?: Event) => Promise<Promise<void> | undefined>) => {
        save.value = e
      },
      onSaveBtn: () => {
        if (save.value) save.value()
      },
      onDataSend: (data: FlowNodeData) => {
        updateNodeData(node.id, data)
        dialogRef.close()
      }
    }
  })
}
</script>
<template>
  <Button
    icon="pi pi-pencil"
    v-tooltip.top="$t('Action.Edit')"
    severity="secondary"
    variant="text"
    @click="onClick"
  ></Button>
</template>
