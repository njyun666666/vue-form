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
  queryFn: () => menuService.menus().then(({ data }) => data),
  staleTime: 60 * 60 * 1000
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
    const newKeys = [...keys, menuItem.key as string]

    if (menuItem.url === url) {
      return newKeys
    }

    if (menuItem.items) {
      const result = findRoutePathMenu(url, menuItem.items, newKeys)

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
        panel: '!overflow-hidden !p-0 !border-0',
        rootlist: '!pl-0',
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
            :class="cn('w-full !p-0 group-[.is-exact-active]:!text-primary')"
            severity="secondary"
            text
          >
            <div
              :class="
                cn(
                  'flex w-full items-center justify-start py-2 pr-2 pl-0 transition-all duration-200',
                  {
                    'pl-3': !root && layoutStore.navExpandedState
                  }
                )
              "
            >
              <font-awesome-icon
                v-if="item.icon"
                :icon="item.icon"
                :class="cn('h-4 w-4 shrink-0 px-3.5')"
              />
              <span :class="cn('duration-200', { 'opacity-0': !layoutStore.navExpandedState })">
                {{ $t(item.label as string) }}
              </span>
            </div>
          </Button>
        </RouterLink>

        <Button v-else :class="cn('w-full !p-0')" severity="secondary" text>
          <div class="flex w-full items-center justify-start py-2 pr-2 pl-0">
            <font-awesome-icon
              v-if="item.icon"
              :icon="item.icon"
              :class="cn('h-4 w-4 shrink-0 px-3.5')"
            />
            <span :class="cn('duration-200', { 'opacity-0': !layoutStore.navExpandedState })">
              {{ $t(item.label as string) }}
            </span>
            <font-awesome-icon
              v-if="item.items"
              icon="fa-solid fa-angle-right"
              :class="
                cn('ml-auto h-3 w-3 duration-200', {
                  'rotate-90': active,
                  'opacity-0': !layoutStore.navExpandedState
                })
              "
            />
          </div>
        </Button>
      </template>
    </PanelMenu>
  </div>
</template>
