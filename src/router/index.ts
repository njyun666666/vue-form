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
        },
        {
          path: 'org',
          name: 'org',
          meta: {
            title: 'Org.Org'
          },
          children: [
            {
              path: 'dept',
              name: 'orgdept',
              meta: {
                title: 'Org.Dept'
              },
              component: () => import('@/pages/Org/OrgDeptPage.vue')
            },
            {
              path: 'user',
              name: 'orguser',
              meta: {
                title: 'Org.User'
              },
              component: () => import('@/pages/Org/OrgUserPage.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: 'Page.Login'
      },
      component: () => import('@/pages/Login/LoginPage.vue')
    }
  ]
})

router.beforeEach((to) => {
  const loginStore = useLoginStore()

  if (to.name != 'login' && !loginStore.loginState) {
    return { name: 'login', query: { url: to.fullPath } }
  }

  if (to.meta.roles && !loginStore.checkRole(to.meta.roles)) {
    return { name: 'message', params: { message: 'Forbidden' } }
  }
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
