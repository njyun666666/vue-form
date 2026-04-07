<script setup lang="ts">
import BasePage from '../BasePage.vue'
import OrgUserInfo from '@/components/Org/User/OrgUserInfo.vue'
</script>
<template>
  <BasePage>
    <h1>{{ $t('Org.UserInfo') }}</h1>
    <OrgUserInfo />
  </BasePage>
</template>
