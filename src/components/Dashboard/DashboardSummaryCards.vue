<script setup lang="ts">
import { FormStatusEnum } from '@/libs/enums/FormTypes'
import type { MyApplicationModel, PendingApprovalModel } from '@/libs/models/Form/FormModel'
import { formService } from '@/libs/services/formService'
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'

const { data: pendingData } = useQuery({
  queryKey: ['dashboard.pending'],
  queryFn: () =>
    formService
      .pendingApprovalList({ pageIndex: 0, pageSize: 1 } as Parameters<
        typeof formService.pendingApprovalList
      >[0])
      .then(({ data }) => data),
  staleTime: 5 * 60 * 1000
})

const { data: myAppsData } = useQuery({
  queryKey: ['dashboard.myApplications'],
  queryFn: () =>
    formService.myApplicationList({ pageIndex: 0, pageSize: 1 }).then(({ data }) => data),
  staleTime: 5 * 60 * 1000
})

const { data: myHandledData } = useQuery({
  queryKey: ['dashboard.myHandled'],
  queryFn: () => formService.myHandledList({ pageIndex: 0, pageSize: 1 }).then(({ data }) => data),
  staleTime: 5 * 60 * 1000
})

const { data: draftData } = useQuery({
  queryKey: ['dashboard.drafts'],
  queryFn: () =>
    formService
      .myApplicationList({
        pageIndex: 0,
        pageSize: 1,
        filter: { status: FormStatusEnum.draft } as MyApplicationModel
      })
      .then(({ data }) => data),
  staleTime: 5 * 60 * 1000
})

const cards = computed(() => [
  {
    key: 'pending',
    icon: 'fa-solid fa-inbox',
    labelKey: 'Form.PendingApproval.title',
    count: pendingData.value?.count ?? 0,
    route: '/',
    color: 'text-yellow-500'
  },
  {
    key: 'myApps',
    icon: 'fa-solid fa-file-lines',
    labelKey: 'Page.MyApplications',
    count: myAppsData.value?.count ?? 0,
    route: '/form/my-applications',
    color: 'text-blue-500'
  },
  {
    key: 'myHandled',
    icon: 'fa-solid fa-check-double',
    labelKey: 'Page.MyHandled',
    count: myHandledData.value?.count ?? 0,
    route: '/form/my-handled',
    color: 'text-green-500'
  },
  {
    key: 'drafts',
    icon: 'fa-solid fa-floppy-disk',
    labelKey: 'Action.Draft',
    count: draftData.value?.count ?? 0,
    route: '/form/my-applications',
    color: 'text-gray-500'
  }
])
</script>

<template>
  <div class="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
    <RouterLink
      v-for="card in cards"
      :key="card.key"
      :to="card.route"
      class="flex cursor-pointer flex-col items-center gap-2 rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:bg-surface-800"
    >
      <font-awesome-icon :icon="card.icon" :class="['text-3xl', card.color]" />
      <span class="text-3xl font-bold">{{ card.count }}</span>
      <span class="text-center text-sm text-surface-500">{{ $t(card.labelKey) }}</span>
    </RouterLink>
  </div>
</template>
