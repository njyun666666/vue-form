<script setup lang="ts">
import BasePage from '../BasePage.vue'
import OrgDeptLevelInfo from '@/components/Org/DeptLevel/OrgDeptLevelInfo.vue'
</script>
<template>
  <BasePage>
    <h1>{{ $t('Org.DeptLevelInfo') }}</h1>
    <OrgDeptLevelInfo />
  </BasePage>
</template>
