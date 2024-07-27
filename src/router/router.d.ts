import 'vue-router'
import type { RoleType } from '@/appConst'

export {}

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    roles?: RoleType[]
  }
}
