<script setup lang="ts">
import type { MenuViewModel } from '@/libs/models/Menu/Menu'
import { menuService } from '@/libs/services/menuService'
import { cn } from '@/libs/utils/style'
import { useLayoutStore } from '@/stores/layout'
import { useQuery } from '@tanstack/vue-query'
import Button from 'primevue/button'
import type { MenuItem } from 'primevue/menuitem'
import PanelMenu, { type PanelMenuContext } from 'primevue/panelmenu'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const layoutStore = useLayoutStore()

const getdata = () => {
  const data: MenuViewModel[] = [
    {
      menuId: 'be001d7baf21420c75d3335ff71d6663',
      menuName: 'Page.Home',
      icon: 'fa-solid fa-house',
      url: '/'
    },
    {
      menuId: 'b607cd761d59e53ac20df9a8d416e6f7',
      menuName: 'Org',
      icon: 'fa-solid fa-sitemap',
      url: '',
      children: [
        {
          menuId: 'f299178acaaacd49f8b488ccf38218ff',
          menuName: 'OrgDept',
          icon: 'fa-solid fa-building',
          url: '/org/dept'
        },
        {
          menuId: '191a783fc56e2ee5d9f9d39bef4d84ea',
          menuName: 'OrgUser',
          icon: 'fa-solid fa-user',
          url: '/org/user'
        }
      ]
    },
    {
      menuId: 'a57c380bb1b8dcc7ac82e8517a4ecbb6',
      menuName: 'Auth',
      icon: 'fa-solid fa-user-shield',
      url: '/auth',
      children: [
        {
          menuId: '72fe7fd63df3166bbd272ceca5eae970',
          menuName: 'AuthMenu',
          icon: 'fa-solid fa-user-shield',
          url: '/auth/menu'
        },
        {
          menuId: '22d9325a4ccd6c186d3803b625685f82',
          menuName: 'AuthRole',
          icon: 'fa-solid fa-user-shield',
          url: '/auth/role'
        }
      ]
    }
  ]

  return data
}

const { isPending, isFetching, isError, data, error } = useQuery({
  queryKey: ['menuService.menus'],
  queryFn: getdata //() => menuService.menus().then(({ data }) => data)
})

const items = computed(() => {
  return data.value?.map((x) => transformToMenuItem(x))
})

const transformToMenuItem = (menu: MenuViewModel): MenuItem => {
  const menuItem: MenuItem = {
    key: menu.menuId,
    label: menu.menuName,
    icon: menu.icon,
    url: menu.url,
    items: menu.children ? menu.children.map(transformToMenuItem) : undefined
  }
  return menuItem
}
</script>
<template>
  <div class="">
    <PanelMenu
      :model="items"
      multiple
      class="w-full"
      :pt="{
        panel: 'overflow-hidden rounded-md',
        content: ''
      }"
    >
      <template #item="{ item, active, root }">
        <RouterLink v-if="!item.items" :to="item.url">
          <Button
            :class="
              cn('flex !justify-start w-full pl-0 py-2 pr-2 duration-200 transition-all', {
                'pl-3': !root && layoutStore.navExpandedState
              })
            "
            severity="secondary"
            text
          >
            <font-awesome-icon
              v-if="item.icon"
              :icon="item.icon"
              :class="cn('w-4 h-4 px-3.5 shrink-0')"
            />
            <span :class="cn('duration-200', { 'opacity-0': !layoutStore.navExpandedState })">
              {{ $t(item.label) }}
            </span>
          </Button>
        </RouterLink>

        <Button
          v-else
          :class="cn('pl-0 py-2 pr-2 w-full flex items-center duration-200')"
          severity="secondary"
          text
        >
          <span :class="item.icon" />
          <font-awesome-icon
            v-if="item.icon"
            :icon="item.icon"
            :class="cn('w-4 h-4 px-3.5 shrink-0')"
          />
          <span :class="cn('duration-200', { 'opacity-0': !layoutStore.navExpandedState })">
            {{ $t(item.label) }}
          </span>
          <font-awesome-icon
            v-if="item.items"
            icon="fa-solid fa-angle-right"
            :class="
              cn('ml-auto duration-200 w-3 h-3', {
                'rotate-90': active,
                'opacity-0': !layoutStore.navExpandedState
              })
            "
          />
        </Button>
      </template>
    </PanelMenu>
  </div>
</template>
