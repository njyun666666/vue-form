import NodeEditFormFooter from '../Form/NodeEditFormFooter.vue'
import type { FlowNodeData } from '@/libs/models/FlowChart/FlowNode'
import type { GraphNode } from '@vue-flow/core'
import { useVueFlow } from '@vue-flow/core'
import { useDialog } from 'primevue/usedialog'
import { type Component, markRaw, ref, toRaw } from 'vue'

export function useNodeEditDialog() {
  const dialog = useDialog()
  const { updateNodeData } = useVueFlow()

  function openDialog(
    formComponent: Component,
    node: GraphNode<FlowNodeData>,
    extraData?: Record<string, unknown>,
    width?: string
  ) {
    const save = ref<(e?: Event) => Promise<Promise<void> | undefined>>()

    const dialogRef = dialog.open(markRaw(formComponent), {
      data: { ...toRaw(node), ...extraData },
      props: {
        header: node.data.label,
        style: { width: width ?? '50vw' },
        breakpoints: { '960px': '75vw', '640px': '90vw' },
        modal: true
      },
      templates: { footer: markRaw(NodeEditFormFooter) },
      emits: {
        onSave: (fn: (e?: Event) => Promise<Promise<void> | undefined>) => {
          save.value = fn
        },
        onSaveBtn: () => {
          save.value?.()
        },
        onDataSend: (data: FlowNodeData) => {
          updateNodeData(node.id, data)
          dialogRef.close()
        }
      }
    })
  }

  return { openDialog }
}
