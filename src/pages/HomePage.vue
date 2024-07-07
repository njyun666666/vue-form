<script setup lang="ts">
import { cn } from '@/libs/utils/style'
import dayjs from 'dayjs'
</script>

<template>
  <main>
    <h1 className="text-3xl font-bold underline">
      <h1>{{ $t('Page.Home') }}</h1>
    </h1>
    <button
      :class="
        cn('bg-sky-300 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3 dark:bg-red-800')
      "
    >
      <font-awesome-icon icon="fa-solid fa-user-secret" />
    </button>

    {{ dayjs().format('LLL') }}

    {{ $t('Message.Required') }}
  </main>
</template>
