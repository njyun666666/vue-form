<script setup lang="ts">
import FlowChart from '@/components/FlowChart/FlowChart.vue'
import ToolbarBase from '@/components/UI/ToolbarBase.vue'
import Button from 'primevue/button'
import { ref } from 'vue'

const flowChart = ref<InstanceType<typeof FlowChart>>()
</script>
<template>
  <div class="flex h-full w-full flex-col">
    <ToolbarBase class="shrink-0">
      <Button
        :label="$t('Action.Save')"
        icon="pi pi-save"
        variant="text"
        @click="flowChart?.onSave()"
      />
    </ToolbarBase>
    <div class="min-h-0 grow">
      <FlowChart ref="flowChart" />
    </div>
  </div>
</template>
