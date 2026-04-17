<script setup lang="ts">
import FlowChartViewer from '@/components/FlowChart/FlowChartViewer.vue'
import Dialog from 'primevue/dialog'
import { ref } from 'vue'

interface Props {
  flowSetting: Record<string, unknown>
  activeStepId?: string
}

defineProps<Props>()

const visible = ref(false)

defineExpose({ open: () => (visible.value = true) })
</script>

<template>
  <Dialog
    v-model:visible="visible"
    :header="$t('Action.FlowChart')"
    modal
    :style="{ width: '80vw', height: '70vh' }"
    :content-style="{ padding: 0, height: 'calc(100% - 57px)' }"
  >
    <FlowChartViewer
      v-if="visible"
      :flow-setting="flowSetting"
      :active-step-id="activeStepId"
      class="h-full w-full"
    />
  </Dialog>
</template>
