<script setup lang="ts">
import BasePage from '../BasePage.vue'
import OrgRoleInfo from '@/components/Org/Role/OrgRoleInfo.vue'
</script>
<template>
  <BasePage>
    <h1>{{ $t('Org.RoleInfo') }}</h1>
    <OrgRoleInfo />
  </BasePage>
</template>
