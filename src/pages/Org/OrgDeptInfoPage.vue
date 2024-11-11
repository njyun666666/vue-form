<script setup lang="ts">
import BasePage from '../BasePage.vue'
import OrgDeptInfo from '@/components/Org/Dept/OrgDeptInfo.vue'

// orgDeptService.query(data).then(async ({ data }) => data)
</script>
<template>
  <BasePage>
    <h1>{{ $t('Org.DeptInfo') }}</h1>
    <OrgDeptInfo />
  </BasePage>
</template>
