<script setup lang="ts">
import type Toolbar from '../Toolbar.vue'
import { type Ref, inject, onMounted } from 'vue'

// import type { ComponentExposed } from 'vue-component-type-helpers'

const toolbar = inject<Ref<InstanceType<typeof Toolbar>>>('toolbar')
// const toolbar2 = inject<Ref<ComponentExposed<typeof Toolbar>>>('toolbar2')

onMounted(() => {
  console.log('aform')

  toolbar!.value.applicationBtn.beforeAction = () => {
    console.log('beforeAction')
  }

  toolbar!.value.applicationBtn.afterAction = () => {
    console.log('afterAction')
  }
})
</script>
<template>
  <div>A Form</div>
</template>
