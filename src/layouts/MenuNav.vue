<script setup lang="ts">
import type { MenuViewModel } from '@/libs/models/Menu/Menu'
import { menuService } from '@/libs/services/menuService'
import { cn } from '@/libs/utils/style'
import { useLayoutStore } from '@/stores/layout'
import { useQuery } from '@tanstack/vue-query'
import Button from 'primevue/button'
import type { MenuItem } from 'primevue/menuitem'
import PanelMenu from 'primevue/panelmenu'
import Skeleton from 'primevue/skeleton'
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const layoutStore = useLayoutStore()
const expandedKeys = ref<Record<string, boolean>>({})

const { isFetching, data } = useQuery({
  queryKey: ['menuService.menus'],
  queryFn: () => menuService.menus().then(({ data }) => data)
})

const items = computed(() => {
  return data.value?.map((x) => transformToMenuItem(x)) || []
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

const findRoutePathMenu = (url: string, menuItems: MenuItem[], keys: string[] = []): string[] => {
  for (const menuItem of menuItems) {
    const newPath = [...keys, menuItem.key as string]

    if (menuItem.url === url) {
      return newPath
    }

    if (menuItem.items) {
      const result = findRoutePathMenu(url, menuItem.items, newPath)

      if (result.length > 0) {
        return result
      }
    }
  }

  return []
}

watch(
  isFetching,
  () => {
    if (!isFetching) return

    const keys = findRoutePathMenu(route.path, items.value)

    expandedKeys.value = keys.reduce(
      (prve, val) => {
        prve[val] = true
        return prve
      },
      {} as Record<string, boolean>
    )
  },
  { once: true }
)
</script>
<template>
  <div class="">
    <div v-if="isFetching" class="flex flex-col gap-1">
      <template v-for="n in 3" :key="n">
        <Skeleton width="100%" height="2.5rem"></Skeleton>
      </template>
    </div>
    <PanelMenu
      v-else
      :model="items"
      v-model:expandedKeys="expandedKeys"
      multiple
      class="w-full"
      :pt="{
        root: 'gap-0',
        panel: 'overflow-hidden p-0 border-0',
        rootlist: 'pl-0',
        content: ''
      }"
    >
      <template #item="{ item, active, root }">
        <RouterLink
          v-if="!item.items"
          :to="String(item.url)"
          exactActiveClass="group is-exact-active"
        >
          <Button
            :class="
              cn(
                'flex !justify-start w-full pl-0 py-2 pr-2 duration-200 transition-all group-[.is-exact-active]:!text-primary',
                {
                  'pl-3': !root && layoutStore.navExpandedState
                }
              )
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
              {{ $t(item.label as string) }}
            </span>
          </Button>
        </RouterLink>

        <Button
          v-else
          :class="cn('flex !justify-start w-full pl-0 py-2 pr-2 duration-200 transition-all')"
          severity="secondary"
          text
        >
          <font-awesome-icon
            v-if="item.icon"
            :icon="item.icon"
            :class="cn('w-4 h-4 px-3.5 shrink-0')"
          />
          <span :class="cn('duration-200', { 'opacity-0': !layoutStore.navExpandedState })">
            {{ $t(item.label as string) }}
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
