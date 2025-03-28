<script setup lang="ts">
import useFlowNodeDnd from '../useFlowNodeDnd'
import GetewaySvg from './GetewaySvg.vue'
import { useConfirm } from 'primevue/useconfirm'

const { onDragStart } = useFlowNodeDnd(useConfirm())
</script>
<template>
  <div class="nodes flex flex-col gap-4 p-2">
    <div
      class="vue-flow__node-start w-full"
      :draggable="true"
      @dragstart="onDragStart($event, 'start')"
    >
      Start
    </div>

    <div
      class="vue-flow__node-end w-full"
      :draggable="true"
      @dragstart="onDragStart($event, 'end')"
    >
      End
    </div>

    <div
      class="vue-flow__node-task w-full"
      :draggable="true"
      @dragstart="onDragStart($event, 'task')"
    >
      Task
    </div>

    <div
      class="vue-flow__node-gateway w-full relative aspect-square"
      :draggable="true"
      @dragstart="onDragStart($event, 'gateway')"
    >
      <GetewaySvg class="absolute top-0 left-0 z-0" />
      <div class="z-[1] relative">Gateway</div>
    </div>
  </div>
</template>
