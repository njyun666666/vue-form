<script setup lang="ts">
import useDragAndDrop from '../useDnd'

const { onDragStart } = useDragAndDrop()
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

    <div class="vue-flow__node-input" :draggable="true" @dragstart="onDragStart($event, 'input')">
      Input Node
    </div>

    <div
      class="vue-flow__node-default"
      :draggable="true"
      @dragstart="onDragStart($event, 'default')"
    >
      Default Node
    </div>

    <div class="vue-flow__node-output" :draggable="true" @dragstart="onDragStart($event, 'output')">
      Output Node
    </div>
  </div>
</template>
