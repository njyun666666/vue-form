<script setup lang="ts">
import FlowChart from '@/components/FlowChart/FlowChart.vue'
import FlowInfoDialog from '@/components/FlowChart/Form/FlowInfoDialog.vue'
import NodeEditFormFooter from '@/components/FlowChart/Form/NodeEditFormFooter.vue'
import ToolbarBase from '@/components/UI/ToolbarBase.vue'
import type { FlowListItem } from '@/libs/models/Flow/FlowModel'
import { flowService } from '@/libs/services/flowService'
import { toTypedSchema } from '@vee-validate/zod'
import Button from 'primevue/button'
import { useDialog } from 'primevue/usedialog'
import { useForm } from 'vee-validate'
import { markRaw, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import * as z from 'zod'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const dialog = useDialog()
const flowChart = ref<InstanceType<typeof FlowChart>>()

const isNew = route.name === 'flow-new'
const flowId = route.params.flowId as string | undefined

const schema = z.object({
  flowId: z.string().min(1, { message: t('Message.Required') }),
  flowName: z.string().min(1, { message: t('Message.Required') })
})

const form = useForm({ validationSchema: toTypedSchema(schema) })

const openInfoDialog = () => {
  const save = ref<(e?: Event) => Promise<Promise<void> | undefined>>()

  const dialogRef = dialog.open(markRaw(FlowInfoDialog), {
    data: { ...form.values },
    props: {
      header: t('Flow.InfoTitle'),
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
      onDataSend: (data: FlowListItem) => {
        form.setValues({ flowId: data.flowId, flowName: data.flowName })
        dialogRef.close()
      }
    }
  })
}

const onSave = async () => {
  const { valid } = await form.validate()
  if (!valid) {
    openInfoDialog()
    return
  }

  const payload = {
    ...form.values,
    flowSetting: flowChart.value?.getFlowObject() as unknown as Record<string, unknown>
  }

  if (isNew) {
    const { data } = await flowService.createFlow(payload)
    router.replace({ name: 'flow-edit', params: { flowId: data.flowId } })
  } else {
    await flowService.updateFlow(flowId!, payload)
  }
}

onMounted(async () => {
  if (!isNew && flowId) {
    const { data } = await flowService.getFlow(flowId)
    form.setValues({ flowId: data.flowId, flowName: data.flowName })
    if (data.flowSetting) {
      flowChart.value?.loadFlow(data.flowSetting)
    }
  }
})
</script>
<template>
  <div class="flex h-full w-full flex-col">
    <ToolbarBase class="shrink-0">
      <Button
        :label="$t('Flow.InfoTitle')"
        icon="pi pi-info-circle"
        variant="text"
        severity="secondary"
        @click="openInfoDialog"
      />
      <Button :label="$t('Action.Save')" icon="pi pi-save" variant="text" @click="onSave" />
    </ToolbarBase>
    <div class="min-h-0 grow">
      <FlowChart ref="flowChart" />
    </div>
  </div>
</template>
