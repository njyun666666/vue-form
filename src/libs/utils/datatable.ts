import type { ResponseErrors } from '../api/formAPI'
import type { QueryModel, QueryViewModel } from '../models/Query/QueryModel'
import type { AxiosError } from 'axios'
import type { DataTablePageEvent, DataTableProps, DataTableSortMeta } from 'primevue/datatable'
import { type Ref, computed, ref } from 'vue'

export const useDatatable = <TQuery, TView>(
  query: Ref<QueryModel<TQuery>>,
  fetchData: (query: QueryModel<TQuery>) => Promise<QueryViewModel<TView>>
) => {
  const loading = ref(false)
  const first = ref(0)
  const queryView = ref({
    data: [] as TView[],
    pageCount: 0,
    count: 0
  }) as Ref<QueryViewModel<TView>>

  const props = computed<DataTableProps>(() => ({
    first: first.value,
    loading: loading.value,
    lazy: true,
    paginator: true,
    sortMode: 'multiple',
    rows: query.value.pageSize,
    rowsPerPageOptions: [5, 10, 20, 50],
    multiSortMeta: query.value.sort,
    selectionMode: 'single',
    value: queryView.value.data,
    totalRecords: queryView.value.count
  }))

  const resetPage = () => {
    first.value = 0
    query.value.pageIndex = 0
  }

  const onPageChange = async (e: DataTablePageEvent) => {
    first.value = e.first
    query.value.pageSize = e.rows
    query.value.pageIndex = e.page
    handleFetchData()
  }

  const onUpdateMultiSortMeta = async (e: DataTableSortMeta[] | null | undefined) => {
    first.value = 0
    query.value.pageIndex = 0
    query.value.sort = e ?? []
    handleFetchData()
  }

  const handleFetchData = async () => {
    loading.value = true

    await fetchData(query.value)
      .then(async (res) => {
        queryView.value = res
      })
      .catch((error: AxiosError<ResponseErrors>) => {
        console.warn(error)
      })

    loading.value = false
  }

  const onSubmit = async (filter: TQuery) => {
    query.value.filter = filter
    resetPage()
    await handleFetchData()
  }

  return {
    props,
    queryView,
    resetPage,
    onPageChange,
    onUpdateMultiSortMeta,
    handleFetchData,
    onSubmit
  }
}
