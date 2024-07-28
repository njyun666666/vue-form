<script setup lang="ts">
import { cn } from '@/libs/utils/style'
import Button from 'primevue/button'
import { type HTMLAttributes } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const route = useRoute()
const routeQueryUrl = route.query['url']
const to = routeQueryUrl ?? '/'
</script>
<template>
  <RouterLink :to="String(to)">
    <Button text rounded :class="cn('h-10 w-full text-xl font-bold', props.class)">
      <img src="/src/assets/logo.svg" class="h-full max-h-full" />
      <span :class="cn('ml-3')">
        {{ $t('Website.Title') }}
      </span>
    </Button>
  </RouterLink>
</template>
