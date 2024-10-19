<script setup lang="ts">
import { cn } from '@/libs/utils/style'
import { useLocaleStore } from '@/stores/locale'
import { useLoginStore } from '@/stores/login'
import { useDark } from '@vueuse/core'
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import type { MenuItem } from 'primevue/menuitem'
import TieredMenu from 'primevue/tieredmenu'
import { computed, ref } from 'vue'

const dark = useDark()
const loginStore = useLoginStore()
const localeStore = useLocaleStore()
const menu = ref()
const items = computed<MenuItem[]>(() => [
  {
    label: 'Layout.Theme',
    icon: 'fa-solid fa-palette',
    items: [
      {
        label: 'Layout.Light',
        selected: !dark.value,
        command: () => (dark.value = false)
      },
      {
        label: 'Layout.Dark',
        selected: dark.value,
        command: () => (dark.value = true)
      }
    ]
  },
  {
    label: 'Layout.Language',
    icon: 'fa-solid fa-globe',
    items: [
      {
        label: 'Language.zh-tw',
        selected: localeStore.lang == 'zh-tw',
        command: () => localeStore.setLang('zh-tw')
      },
      {
        label: 'Language.en',
        selected: localeStore.lang == 'en',
        command: () => localeStore.setLang('en')
      }
    ]
  },
  {
    separator: true
  },
  {
    label: 'Action.Logout',
    icon: 'fa-solid fa-right-from-bracket',
    command: () => loginStore.logout()
  }
])

const toggle = (event: MouseEvent) => {
  menu.value.toggle(event)
}
</script>
<template>
  <div>
    <Button type="button" label="Toggle" @click="toggle" text rounded class="!p-0">
      <Avatar
        :image="loginStore.photoUrl?.photoUrl"
        :label="
          !loginStore.photoUrl?.photoUrl ? loginStore.photoUrl?.sub?.substring(0, 1) : undefined
        "
        shape="circle"
        class="font-bold"
      />
    </Button>
    <TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup>
      <template #item="{ item, props, hasSubmenu }">
        <a class="flex items-center" v-bind="props.action" aria-hidden="false">
          <font-awesome-icon
            v-if="item.selected !== undefined"
            icon="fa-solid fa-circle"
            :class="
              cn('text-2xs', {
                'opacity-0': !item.selected
              })
            "
          />
          <font-awesome-icon v-if="item.icon" :icon="item.icon" />
          <span class="ml-2">{{ $t(item.label as string) }}</span>
          <font-awesome-icon v-if="hasSubmenu" icon="fa-solid fa-angle-right" class="ml-auto" />
        </a>
      </template>
    </TieredMenu>
  </div>
</template>
