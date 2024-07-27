import type { RoleType } from '@/appConst'
import 'vue-router'

export {}

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    roles?: RoleType[]
  }
}
