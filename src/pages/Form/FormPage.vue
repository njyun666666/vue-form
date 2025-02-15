<script setup lang="ts">
import FormContentPage from './FormContentPage.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
<template>
  <FormContentPage
    :key="`${route.params['formPageType']}/${route.params['formClass']}/${route.params['formId']}`"
  ></FormContentPage>
</template>
