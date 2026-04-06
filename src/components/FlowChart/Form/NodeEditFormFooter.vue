<script setup lang="ts">
import Button from 'primevue/button'

const emit = defineEmits<{
  saveBtn: []
}>()

const save = () => {
  emit('saveBtn')
}
</script>
<template>
  <div class="flex justify-end gap-5">
    <Button :label="$t('Action.Save')" icon="pi pi-save" @click="save" />
  </div>
</template>
