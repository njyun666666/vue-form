<script setup lang="ts">
import NodeEditForm from '../Form/NodeEditForm.vue'
import { SeverityEnum } from '@/libs/enums/layout'
import type { FlowNodeData, FlowNodeEvents } from '@/libs/models/FlowChart/FlowNode'
import { useCreateConfirm } from '@/libs/utils/confirm'
import { useNode, useVueFlow } from '@vue-flow/core'
import Button from 'primevue/button'
import { useConfirm } from 'primevue/useconfirm'
import { useDialog } from 'primevue/usedialog'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const createConfirm = useCreateConfirm(useConfirm())
const dialog = useDialog()
const { updateNode } = useVueFlow()
const { node } = useNode<FlowNodeData, FlowNodeEvents>()

const onClick = async () => {
  dialog.open(NodeEditForm, {
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
