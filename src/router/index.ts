import { i18n } from '@/i18n/config'
import HttpStatusCodes from '@/libs/api/httpStatusCodes'
import { routeAuthService } from '@/libs/services/routeAuthService'
import { useLayoutStore } from '@/stores/layout'
import { useLoginStore } from '@/stores/login'
import type { AxiosError } from 'axios'
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
          name: 'home',
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
          redirect: { name: 'org-tree' },
          children: [
            {
              path: 'tree',
              name: 'org-tree',
              meta: {
                title: 'Org.OrgTree'
              },
              component: () => import('@/pages/Org/OrgTreePage.vue')
            },
            {
              path: 'dept-level',
              name: 'org-dept-level',
              meta: { title: 'Org.DeptLevel' },
              component: () => import('@/pages/Org/OrgDeptLevelPage.vue')
            },
            {
              path: 'dept-level/new',
              name: 'org-dept-level-new',
              meta: { title: 'Org.DeptLevelInfo' },
              component: () => import('@/pages/Org/OrgDeptLevelInfoPage.vue')
            },
            {
              path: 'dept-level/:levelId',
              name: 'org-dept-level-detail',
              meta: { title: 'Org.DeptLevelInfo' },
              component: () => import('@/pages/Org/OrgDeptLevelInfoPage.vue')
            },
            {
              path: 'dept',
              name: 'org-dept',
              meta: {
                title: 'Org.Dept'
              },
              component: () => import('@/pages/Org/OrgDeptPage.vue')
            },
            {
              path: 'dept/new',
              name: 'org-dept-new',
              meta: {
                title: 'Org.DeptInfo'
              },
              component: () => import('@/pages/Org/OrgDeptInfoPage.vue')
            },
            {
              path: 'dept/:deptId',
              name: 'org-dept-detail',
              meta: {
                title: 'Org.Dept'
              },
              component: () => import('@/pages/Org/OrgDeptInfoPage.vue')
            },
            {
              path: 'role',
              name: 'org-role',
              meta: {
                title: 'Org.Role'
              },
              component: () => import('@/pages/Org/OrgRolePage.vue')
            },
            {
              path: 'role/new',
              name: 'org-role-new',
              meta: {
                title: 'Org.RoleInfo'
              },
              component: () => import('@/pages/Org/OrgRoleInfoPage.vue')
            },
            {
              path: 'role/:roleId',
              name: 'org-role-detail',
              meta: {
                title: 'Org.RoleInfo'
              },
              component: () => import('@/pages/Org/OrgRoleInfoPage.vue')
            },
            {
              path: 'job-title',
              name: 'org-job-title',
              meta: {
                title: 'Org.JobTitle'
              },
              component: () => import('@/pages/Org/OrgJobTitlePage.vue')
            },
            {
              path: 'job-title/new',
              name: 'org-job-title-new',
              meta: {
                title: 'Org.JobTitleInfo'
              },
              component: () => import('@/pages/Org/OrgJobTitleInfoPage.vue')
            },
            {
              path: 'job-title/:jobTitleId',
              name: 'org-job-title-detail',
              meta: {
                title: 'Org.JobTitleInfo'
              },
              component: () => import('@/pages/Org/OrgJobTitleInfoPage.vue')
            },
            {
              path: 'user',
              name: 'org-user',
              meta: {
                title: 'Org.User'
              },
              component: () => import('@/pages/Org/OrgUserPage.vue')
            },
            {
              path: 'user/new',
              name: 'org-user-new',
              meta: {
                title: 'Org.UserInfo'
              },
              component: () => import('@/pages/Org/OrgUserInfoPage.vue')
            },
            {
              path: 'user/:userId',
              name: 'org-user-detail',
              meta: {
                title: 'Org.UserInfo'
              },
              component: () => import('@/pages/Org/OrgUserInfoPage.vue')
            }
          ]
        },
        {
          path: 'form',
          children: [
            {
              path: '',
              name: 'form',
              meta: {
                title: 'Page.ApplicationForm'
              },
              component: () => import('@/pages/Form/ApplicationFormsPage.vue')
            },
            {
              path: 'my-applications',
              name: 'form-my-applications',
              meta: {
                title: 'Page.MyApplications'
              },
              component: () => import('@/pages/Form/MyApplicationsPage.vue')
            },
            {
              path: 'my-handled',
              name: 'form-my-handled',
              meta: {
                title: 'Page.MyHandled'
              },
              component: () => import('@/pages/Form/MyHandledPage.vue')
            },
            {
              path: ':formPageAction/:formClass',
              name: 'form-detail',
              component: () => import('@/pages/Form/FormPage.vue')
            },
            {
              path: ':formPageAction/:formClass/:formId',
              name: 'form-detail-id',
              component: () => import('@/pages/Form/FormPage.vue')
            }
          ]
        },
        {
          path: 'flow',
          children: [
            {
              path: '',
              redirect: { name: 'flow-list' }
            },
            {
              path: 'list',
              name: 'flow-list',
              meta: {
                title: 'Page.FlowList'
              },
              component: () => import('@/pages/Flow/FlowListPage.vue')
            },
            {
              path: 'new',
              name: 'flow-new',
              meta: {
                title: 'Page.FlowNew'
              },
              component: () => import('@/pages/Flow/FlowPage.vue')
            },
            {
              path: 'edit/:flowId',
              name: 'flow-edit',
              meta: {
                title: 'Page.FlowNew'
              },
              component: () => import('@/pages/Flow/FlowPage.vue')
            }
          ]
        },
        {
          path: 'message',
          name: 'message',
          meta: {
            title: 'Page.Message'
          },
          component: () => import('@/pages/Message/MessagePage.vue')
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
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'home' }
    }
  ]
})

router.beforeEach(async (to) => {
  const loginStore = useLoginStore()

  if (to.name === 'login' || to.name === 'message') return

  if (!loginStore.loginState) {
    return { name: 'login', query: { url: to.fullPath } }
  }

  if (to.name) {
    try {
      await routeAuthService.checkRoute(to.name as string)
    } catch (error) {
      const axiosError = error as AxiosError
      if (axiosError.response?.status === HttpStatusCodes.FORBIDDEN) {
        return { name: 'message', query: { type: 'forbidden' } }
      }
    }
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
