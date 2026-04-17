<script setup lang="ts">
import { useEdge, useVueFlow } from '@vue-flow/core'
import Button from 'primevue/button'

const { edge } = useEdge()
const { removeEdges } = useVueFlow()
</script>
<template>
  <Button
    icon="pi pi-trash"
    v-tooltip.top="$t('Action.Remove')"
    severity="danger"
    variant="text"
    @click="removeEdges(edge.id)"
  />
</template>
