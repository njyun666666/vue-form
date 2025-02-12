<script setup lang="ts">
import { formService } from '@/libs/services/formService'
import BasePage from '@/pages/BasePage.vue'
import { useQuery } from '@tanstack/vue-query'
import Button from 'primevue/button'
import Card from 'primevue/card'

const { isFetching, data } = useQuery({
  queryKey: ['formService.applicationList'],
  queryFn: () => formService.applicationList().then(({ data }) => data),
  staleTime: 60 * 60 * 1000
})
</script>
<template>
  <BasePage>
    <h1>{{ $t('Page.ApplicationForm') }}</h1>

    <div class="flex flex-wrap gap-4">
      <Card v-for="item in data" :key="item.groupId">
        <template #title>{{ $t(item.groupName) }}</template>
        <template #content>
          <div class="grid grid-cols-1 gap-2">
            <RouterLink
              v-for="formClass in item.list"
              :key="formClass.formClass"
              :to="{ name: 'add/:formClass', params: { formClass: formClass.formClass } }"
            >
              {{ $t(formClass.formClassName) }}
            </RouterLink>
          </div>
        </template>
      </Card>
    </div>
  </BasePage>
</template>
