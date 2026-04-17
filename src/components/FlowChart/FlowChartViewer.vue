<script setup lang="ts">
import FlowChart from './FlowChart.vue'
import FormActionTag from '@/components/Form/FormActionTag.vue'
import type { ApprovalHistoryItemModel } from '@/libs/models/Form/FormModel'
import type { MouseTouchEvent } from '@vue-flow/core'
import dayjs from 'dayjs'
import Popover from 'primevue/popover'
import { computed, onMounted, ref, useTemplateRef } from 'vue'

const props = defineProps<{
  flowSetting: Record<string, unknown>
  activeStepId?: string
  approvalHistory?: ApprovalHistoryItemModel[]
}>()
const chart = useTemplateRef<InstanceType<typeof FlowChart>>('chart')
const popover = ref<InstanceType<typeof Popover>>()
const hoveredNodeId = ref<string | null>(null)

const hoveredHistory = computed(() => {
  if (!hoveredNodeId.value || !props.approvalHistory) return []
  return props.approvalHistory.filter((h) => h.stepId === hoveredNodeId.value)
})

const onNodeHover = (payload: { nodeId: string; event: MouseTouchEvent } | null) => {
  if (!payload) {
    popover.value?.hide()
    hoveredNodeId.value = null
    return
  }
  hoveredNodeId.value = payload.nodeId
  if (hoveredHistory.value.length > 0) {
    popover.value?.show(payload.event)
  }
}

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
  <div class="h-full w-full">
    <FlowChart ref="chart" :readonly="true" class="h-full w-full" @node-hover="onNodeHover" />

    <Popover ref="popover">
      <div class="text-sm">
        <div
          v-for="(item, i) in hoveredHistory"
          :key="i"
          class="flex items-center gap-2 border-b py-1 last:border-0"
        >
          <span>{{ item.approverName }}</span>
          <FormActionTag v-if="item.result" :result="item.result" />
          <span class="text-xs text-gray-400">
            {{ item.approvalTime ? dayjs(item.approvalTime).format('YYYY/MM/DD HH:mm') : '' }}
          </span>
        </div>
      </div>
    </Popover>
  </div>
</template>
