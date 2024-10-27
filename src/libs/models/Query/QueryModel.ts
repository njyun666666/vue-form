import type { DataTableSortMeta } from 'primevue/datatable'

export interface QueryModel<T> {
  filter?: T
  pageIndex: number
  pageSize: number
  sort?: DataTableSortMeta[]
}

export interface QueryViewModel<T> {
  data: T
  pageCount: number
  count: number
}
