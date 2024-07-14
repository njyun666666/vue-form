<script setup lang="ts">
import { cn } from '@/libs/utils/style'
import { breakpoints, isMobile } from '@/libs/utils/layout'
import { useLayoutStore } from '@/stores/layout'
import { ref, watch } from 'vue'

const layoutStore = useLayoutStore()
const maskHidden = ref(true)
const maskOpacity0 = ref(true)

const navMouseEnter = () => {
  if (isMobile.value) return

  layoutStore.navExpandedState = true
}

const navMouseLeave = () => {
  if (isMobile.value) return

  layoutStore.navExpandedState = false
}

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
</script>
<template>
  <div class="fixed h-full w-full overflow-hidden">
    <header
      :class="
        cn('bg-green-0 flex h-12 w-full items-center gap-2 overflow-hidden p-2 dark:bg-green-900')
      "
    >
      <button
        type="button"
        :class="cn('bg-white sm:hidden')"
        @click="layoutStore.navExpandedState = true"
      >
        aaa
      </button>
    </header>

    <nav
      :class="
        cn(
          'group/nav bg-blue-0 absolute left-0 top-0 z-10 flex h-full w-0 flex-col overflow-hidden duration-200 dark:bg-blue-200',
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
      <button
        type="button"
        :class="cn('hidden xl:block')"
        @click="
          () => {
            layoutStore.navDefaultExpanded = !layoutStore.navDefaultExpanded
            layoutStore.navExpandedState = layoutStore.navDefaultExpanded
          }
        "
      >
        {{ layoutStore.navDefaultExpanded }}
      </button>
    </nav>

    <div
      :class="
        cn(
          'absolute left-0 top-0 z-[9] h-full w-full bg-black/50 duration-200',
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
          'bg-yellow-200',
          'absolute left-0 top-12 h-[calc(100%-theme(height.12))] w-full overflow-hidden pl-0 duration-200',
          'sm:pl-13',
          {
            'xl:pl-64': layoutStore.navDefaultExpanded
          }
        )
      "
    >
      <div class="pl-64">
        <div class="text-xl font-bold">{{ breakpoints.active() }}</div>
        <div>isMobile: {{ isMobile }}</div>
        <div>navDefaultExpanded: {{ layoutStore.navDefaultExpanded }}</div>
        <div>navExpandedState: {{ layoutStore.navExpandedState }}</div>
        <br />
        <div>maskOpacity0: {{ maskOpacity0 }}</div>
        <div>maskHidden: {{ maskHidden }}</div>
        <br />
      </div>
      <RouterView />
    </main>
  </div>
</template>
