<script setup lang="ts">
import FlowChart from './FlowChart.vue'
import { onMounted, useTemplateRef } from 'vue'

const props = defineProps<{
  flowSetting: Record<string, unknown>
  activeStepId?: string
}>()

const chart = useTemplateRef<InstanceType<typeof FlowChart>>('chart')

onMounted(() => {
  const setting = JSON.parse(JSON.stringify(props.flowSetting)) as Record<string, unknown>
  if (props.activeStepId && Array.isArray(setting.nodes)) {
    setting.nodes = (setting.nodes as Record<string, unknown>[]).map((node) =>
      node.id === props.activeStepId
        ? {
            ...node,
            style: {
              ...(node.style as Record<string, unknown>),
              outline: '2px solid red',
              borderRadius: '4px'
            }
          }
        : node
    )
  }
  chart.value?.loadFlow(setting)
})
</script>

<template>
  <FlowChart ref="chart" :readonly="true" class="h-full w-full" />
</template>
