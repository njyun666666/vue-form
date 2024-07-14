import { i18n } from '@/i18n/config'
import { useLayoutStore } from '@/stores/layout'
import { useLoginStore } from '@/stores/login'
import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: '/',
          name: 'index',
          meta: {
            title: 'Page.Home'
          },
          component: () => import('@/pages/Dashboard/DashboardPage.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to) => {
  const loginStore = useLoginStore()

  // if (to.name != 'login' && !loginStore.loginState) {
  //   return { name: 'login', query: { url: to.fullPath } }
  // }

  // if (to.meta.roles && !loginStore.checkRole(to.meta.roles)) {
  //   return { name: 'message', params: { message: 'Forbidden' } }
  // }
})

router.afterEach((to, from, failure) => {
  const { t } = i18n.global
  const layoutStore = useLayoutStore()

  if (!failure && to.meta.title) {
    nextTick(() => {
      layoutStore.webTitle = t(to.meta.title as string)
    })
  }
})

export default router
