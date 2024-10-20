<script setup lang="ts">
import MenuNav from './MenuNav.vue'
import UserNav from './UserNav.vue'
import Brand from '@/components/Common/Brand.vue'
import { breakpoints, isMobile } from '@/libs/utils/layout'
import { cn } from '@/libs/utils/style'
import { useLayoutStore } from '@/stores/layout'
import { useLoginStore } from '@/stores/login'
import Button from 'primevue/button'
import ScrollPanel from 'primevue/scrollpanel'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const loginStore = useLoginStore()
const router = useRouter()
const route = useRoute()
const layoutStore = useLayoutStore()
const maskHidden = ref(true)
const maskOpacity0 = ref(true)

const navMouseEnter = () => {
  if (isMobile.value) return

  layoutStore.navExpandedState = true
}

const navMouseLeave = () => {
  if (isMobile.value) return

  if (breakpoints.isGreaterOrEqual('xl') && layoutStore.navDefaultExpanded) {
    layoutStore.navExpandedState = true
    return
  }

  layoutStore.navExpandedState = false
}

watch(breakpoints.active(), () => {
  if (breakpoints.isGreaterOrEqual('xl') && layoutStore.navDefaultExpanded) {
    layoutStore.navExpandedState = true
    return
  }

  if (breakpoints.isSmaller('xl')) {
    layoutStore.navExpandedState = false
    return
  }
})

watch(
  () => layoutStore.navExpandedState,
  (val) => {
    if (val) {
      maskHidden.value = false
      setTimeout(() => (maskOpacity0.value = false), 1)
    } else {
      maskOpacity0.value = true
      setTimeout(() => (maskHidden.value = true), 200)
    }
  }
)

watch(
  () => loginStore.loginState,
  (val) => {
    if (!val) router.push({ name: 'login' })
  }
)

watch(route, () => {
  navMouseLeave()
})
</script>
<template>
  <div class="fixed h-full w-full overflow-hidden">
    <header
      :class="
        cn(
          'flex h-12 w-full items-center gap-2 overflow-hidden border-b bg-surface-0 p-2 text-primary border-surface',
          'dark:bg-surface-900'
        )
      "
    >
      <div class="flex items-center gap-2">
        <Button
          type="button"
          severity="secondary"
          text
          :class="cn('sm:hidden')"
          @click="layoutStore.navExpandedState = true"
        >
          <font-awesome-icon icon="fa-solid fa-bars" />
        </Button>

        <Brand />
      </div>
      <div class="flex grow items-center justify-end gap-2">
        <UserNav class="flex items-center" />
      </div>
    </header>

    <nav
      :class="
        cn(
          'group/nav absolute left-0 top-0 z-10 flex h-full w-0 flex-col overflow-hidden bg-surface-0 duration-200',
          'dark:bg-surface-900',
          'sm:top-12 sm:h-[calc(100%-theme(height.12))] sm:w-13 sm:border-0',
          {
            'border-r': layoutStore.navExpandedState,
            '!w-64': layoutStore.navExpandedState,
            'xl:w-64': layoutStore.navDefaultExpanded
          }
        )
      "
      @mouseenter="navMouseEnter"
      @mouseleave="navMouseLeave"
    >
      <div class="grow shrink w-64 overflow-hidden p-1">
        <ScrollPanel class="h-full w-full">
          <MenuNav />
        </ScrollPanel>
      </div>
      <div class="px-1 pb-1 shrink-0">
        <Button
          type="button"
          :class="cn('hidden xl:block w-full')"
          severity="secondary"
          text
          @click="
            () => {
              layoutStore.navDefaultExpanded = !layoutStore.navDefaultExpanded
              layoutStore.navExpandedState = layoutStore.navDefaultExpanded
            }
          "
        >
          <font-awesome-icon
            icon="fa-solid fa-angles-right"
            :class="cn('duration-200', { 'rotate-180': layoutStore.navDefaultExpanded })"
          />
        </Button>
      </div>
    </nav>

    <div
      :class="
        cn(
          'absolute left-0 top-0 z-[9] h-full w-full bg-mask duration-200',
          'sm:top-12 sm:h-[calc(100%-theme(height.12))]',
          {
            hidden: !layoutStore.navExpandedState && maskHidden,
            'xl:hidden': layoutStore.navDefaultExpanded,
            'opacity-0': maskOpacity0
          }
        )
      "
      @click="layoutStore.navExpandedState = false"
    ></div>

    <main
      :class="
        cn(
          'absolute left-0 top-12 z-[8] h-[calc(100%-theme(height.12))] w-full pl-0 duration-200',
          'sm:pl-13',
          {
            'xl:pl-64': layoutStore.navDefaultExpanded
          }
        )
      "
    >
      <ScrollPanel class="h-full w-full">
        <!-- <div class="pl-64">
          <div class="text-xl font-bold">{{ breakpoints.active() }}</div>
          <div>isMobile: {{ isMobile }}</div>
          <div>navDefaultExpanded: {{ layoutStore.navDefaultExpanded }}</div>
          <div>navExpandedState: {{ layoutStore.navExpandedState }}</div>
          <br />
          <div>maskOpacity0: {{ maskOpacity0 }}</div>
          <div>maskHidden: {{ maskHidden }}</div>
          <br />
        </div> -->
        <RouterView />
      </ScrollPanel>
    </main>
  </div>
</template>
