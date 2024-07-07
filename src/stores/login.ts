import { computed } from 'vue'
import { defineStore } from 'pinia'
import { StorageSerializers, useStorage } from '@vueuse/core'
import { jwtDecode } from 'jwt-decode'
import { useRoute, useRouter } from 'vue-router'
import type { LoginViewModel, UserPayload } from '@/libs/models/Login/Login'
import { loginService } from '@/libs/services/loginService'
import type { RoleType } from '@/appConst'

export const useLoginStore = defineStore('login', () => {
  const router = useRouter()
  const route = useRoute()
  const user = useStorage<LoginViewModel>('user', null, localStorage, {
    serializer: StorageSerializers.object
  })
  const loginState = computed(() => tokenPayload.value !== undefined)
  const tokenPayload = computed(() => {
    try {
      if (user.value) {
        return jwtDecode(user.value.access_token) as UserPayload
      }
    } catch (error) {
      return undefined
    }

    return undefined
  })

  const setUser = (data: LoginViewModel) => {
    user.value = data
  }

  const login = (data: LoginViewModel) => {
    setUser(data)
  }

  const logout = () => {
    user.value = null
  }

  const refresh = async () => {
    return await loginService
      .refresh({
        refresh_token: user.value.refresh_token
      })
      .then(({ data }) => {
        setUser(data)
        return true
      })
      .catch(() => false)
  }

  const checkLogin = () => {
    if (loginState.value) {
      return true
    }

    router.push({ name: 'login', query: { url: route.fullPath } })
    return false
  }

  const checkRole = (roles?: RoleType[]) => {
    if (!roles) return true

    const length = roles.length

    for (let i = 0; i < length; i++) {
      if (tokenPayload.value?.role.includes(roles[i])) {
        return true
      }
    }

    return false
  }

  return {
    user,
    loginState,
    tokenPayload,
    setUser,
    login,
    logout,
    refresh,
    checkLogin,
    checkRole
  }
})
