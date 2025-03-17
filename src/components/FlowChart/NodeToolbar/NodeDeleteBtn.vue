<script setup lang="ts">
import { SeverityEnum } from '@/libs/enums/layout'
import type { FlowNodeData, FlowNodeEvents } from '@/libs/models/FlowChart/FlowChart'
import { useCreateConfirm } from '@/libs/utils/confirm'
import { useNode, useVueFlow } from '@vue-flow/core'
import Button from 'primevue/button'
import { useConfirm } from 'primevue/useconfirm'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const createConfirm = useCreateConfirm(useConfirm())
const { removeNodes } = useVueFlow()
const { node } = useNode<FlowNodeData, FlowNodeEvents>()

const onClick = async () => {
  if (
    !(await createConfirm.open({
      message: t('Title.ConfirmText', {
        action: t('Action.Remove'),
        title: node.data.label as string
      }),
      acceptProps: {
        label: t('Action.Remove'),
        severity: SeverityEnum.danger
      }
    }))
  )
    return

  removeNodes(node.id)
}
</script>
<template>
  <Button
    icon="pi pi-trash"
    v-tooltip="$t('Action.Remove')"
    severity="danger"
    variant="text"
    @click="onClick"
  ></Button>
</template>
