<script setup lang="ts">
import type { ResponseErrors } from '@/libs/api/formAPI'
import Message from 'primevue/message'

defineProps<{
  keypath: string
  errors?: ResponseErrors
}>()
</script>
<template>
  <Message severity="error" :closable="false" v-if="errors">
    <span v-if="typeof errors.message === 'string'">
      {{ $t('Message.' + errors.message.replace(/ /g, '_')) }}
    </span>

    <template v-else-if="Array.isArray(errors.message)">
      <div v-for="item in errors.message" :key="item">
        <span>
          {{ $t('Message.' + item.replace(/ /g, '_')) }}
        </span>
      </div>
    </template>

    <template v-else>
      <div v-for="[key, items] in Object.entries(errors.message)" :key="key">
        <template v-if="key !== 'error'">
          <span class="font-bold">
            {{ $t(keypath + '.' + key.replace(/ /g, '_')) }}
          </span>
          <span> : </span>
        </template>

        <span v-if="typeof items === 'string'">
          {{ $t('Message.' + items.replace(/ /g, '_')) }}
        </span>
        <span v-else>
          {{ items.map((item) => $t('Message.' + item.replace(/ /g, '_'))).join(', ') }}
        </span>
      </div>
    </template>
  </Message>
</template>
