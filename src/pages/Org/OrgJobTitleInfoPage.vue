<script setup lang="ts">
import BasePage from '../BasePage.vue'
import OrgJobTitleInfo from '@/components/Org/JobTitle/OrgJobTitleInfo.vue'
</script>
<template>
  <BasePage>
    <h1>{{ $t('Org.JobTitleInfo') }}</h1>
    <OrgJobTitleInfo />
  </BasePage>
</template>
