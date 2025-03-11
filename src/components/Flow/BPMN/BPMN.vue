<script setup lang="ts">
import axios from 'axios'
//@ts-ignore
import { BpmnPropertiesPanelModule, BpmnPropertiesProviderModule } from 'bpmn-js-properties-panel'
import BpmnModeler from 'bpmn-js/lib/Modeler'
import { onMounted, useTemplateRef } from 'vue'

const container = useTemplateRef('container')
const diagramUrl = '/bpmn/a.bpmn'

let bpmnModeler: BpmnModeler<null>

onMounted(() => {
  bpmnModeler = new BpmnModeler({
    container: container.value!,
    propertiesPanel: {
      parent: '#js-properties-panel'
    },
    additionalModules: [BpmnPropertiesPanelModule, BpmnPropertiesProviderModule]
  })

  axios.get(diagramUrl).then(({ data }) => {
    // console.log(data)
    bpmnModeler.importXML(data)
    // openDiagram(data)
  })

  //   bpmnModeler.on('*', (e) => {
  //     console.log(e)
  //   })
})
</script>
<template>
  <div class="flex w-full h-[400px]">
    <div ref="container" class="bpmn-container w-full h-full border bg-surface-100"></div>
    <div class="properties-panel-parent h-full" id="js-properties-panel"></div>
  </div>
</template>
