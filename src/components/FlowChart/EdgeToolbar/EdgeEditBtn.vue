<script setup lang="ts">
import { useEdgeEditDialog } from '../composables/useEdgeEditDialog'
import { useEdge } from '@vue-flow/core'
import Button from 'primevue/button'

const { edge } = useEdge()
const { openDialog } = useEdgeEditDialog()
</script>
<template>
  <Button
    icon="pi pi-pencil"
    v-tooltip.top="$t('Action.Edit')"
    severity="secondary"
    variant="text"
    @click="openDialog(edge)"
  />
</template>
