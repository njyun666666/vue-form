<script setup lang="ts">
import FlowChartViewer from '@/components/FlowChart/FlowChartViewer.vue'
import { formService } from '@/libs/services/formService'
import { useQuery } from '@tanstack/vue-query'
import Dialog from 'primevue/dialog'
import { computed, ref } from 'vue'

interface Props {
  flowSetting: Record<string, unknown>
  activeStepId?: string
  formId?: string
  flowName?: string
  flowId?: string
}

const props = defineProps<Props>()

const visible = ref(false)

const { data: approvalHistory } = useQuery({
  queryKey: computed(() => [formService.approvalHistoryUrl, props.formId]),
  queryFn: () => formService.getApprovalHistory(props.formId!).then(({ data }) => data),
  enabled: computed(() => !!props.formId)
})

defineExpose({ open: () => (visible.value = true) })
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    :style="{ width: '80vw', height: '70vh' }"
    :content-style="{ padding: 0, height: 'calc(100% - 57px)' }"
  >
    <template #header>
      <div class="flex items-baseline gap-2">
        <span>{{ flowName ?? $t('Action.FlowChart') }}</span>
        <span v-if="flowId" class="text-xs text-surface-500">{{ flowId }}</span>
      </div>
    </template>
    <FlowChartViewer
      v-if="visible"
      :flow-setting="flowSetting"
      :active-step-id="activeStepId"
      :approval-history="approvalHistory"
      class="h-full w-full"
    />
  </Dialog>
</template>
