<script setup lang="ts">
import { formService } from '@/libs/services/formService'
import { FormPageAction } from '@/libs/types/FormTypes'
import BasePage from '@/pages/BasePage.vue'
import { useQuery } from '@tanstack/vue-query'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Skeleton from 'primevue/skeleton'

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
      <template v-if="isFetching">
        <Card v-for="n in 3" :key="n">
          <template #content>
            <div class="grid grid-cols-1 gap-2">
              <template v-for="j in 3" :key="j">
                <Skeleton width="150px" height="2.5rem"></Skeleton>
              </template>
            </div>
          </template>
        </Card>
      </template>

      <Card v-for="item in data" :key="item.groupId">
        <template #title>{{ $t(item.groupName) }}</template>
        <template #content>
          <div class="grid grid-cols-1 gap-2">
            <RouterLink
              v-for="formClass in item.list"
              :key="formClass.formClass"
              :to="{
                name: 'form/:formPageAction/:formClass',
                params: {
                  formPageAction: FormPageAction.application,
                  formClass: formClass.formClass
                }
              }"
            >
              <Button label="Secondary" severity="secondary" variant="text">
                {{ $t(formClass.formClassName) }}
              </Button>
            </RouterLink>
          </div>
        </template>
      </Card>
    </div>
  </BasePage>
</template>
