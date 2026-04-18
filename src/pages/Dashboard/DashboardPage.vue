<script setup lang="ts">
import BasePage from '../BasePage.vue'
import DashboardSummaryCards from '@/components/Dashboard/DashboardSummaryCards.vue'
import PendingApprovalList from '@/components/Dashboard/PendingApprovalList.vue'
</script>

<template>
  <BasePage>
    <DashboardSummaryCards />
    <PendingApprovalList />
  </BasePage>
</template>
