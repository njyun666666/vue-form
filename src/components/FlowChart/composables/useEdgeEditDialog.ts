import EdgeEditForm from '../Form/EdgeEditForm.vue'
import NodeEditFormFooter from '../Form/NodeEditFormFooter.vue'
import type { Edge } from '@vue-flow/core'
import { useVueFlow } from '@vue-flow/core'
import { useDialog } from 'primevue/usedialog'
import { markRaw, ref } from 'vue'

export function useEdgeEditDialog() {
  const dialog = useDialog()
  const { getEdges, findNode } = useVueFlow()

  function openDialog(edge: Edge) {
    const save = ref<(e?: Event) => Promise<Promise<void> | undefined>>()

    const sourceLabel = (findNode(edge.source)?.data?.label as string) || edge.source
    const targetLabel = (findNode(edge.target)?.data?.label as string) || edge.target

    const dialogRef = dialog.open(markRaw(EdgeEditForm), {
      data: { id: edge.id, label: edge.label ?? '' },
      props: {
        header: `${sourceLabel} -> ${targetLabel}`,
        style: { width: '40vw' },
        breakpoints: { '960px': '60vw', '640px': '90vw' },
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
        onDataSend: (data: { label: string }) => {
          const target = getEdges.value.find((e) => e.id === edge.id)
          if (target) target.label = data.label
          dialogRef.close()
        }
      }
    })
  }

  return { openDialog }
}
