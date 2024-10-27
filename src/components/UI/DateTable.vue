<script setup lang="ts">
import type { QueryModel, QueryViewModel } from '@/libs/models/Query/QueryModel'
import type { AxiosResponse } from 'axios'
import Column, { type ColumnProps } from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import DataTable from 'primevue/datatable'
import Row from 'primevue/row'
import { ref, watch } from 'vue'

interface Props {
  query: QueryModel<any>
  queryView: QueryViewModel<any>
  columns: ColumnProps[]
  //   queryFn: (data: QueryModel<any>) => Promise<AxiosResponse<QueryViewModel<any>, any>>
}

const props = defineProps<Props>()
// const datas = ref<any[]>([])

// watch(props.query, (val) => {
//   console.log(props.queryFn, val)

//   props.queryFn(val).then(({ data }) => {
//     console.log(data)
//     datas.value = data.Data
//   })
// })
</script>
<template>
  {{ query }}
  <br />
  {{ columns }}
  <DataTable
    :value="queryView.data"
    paginator
    :rows="query.pageSize"
    :rowsPerPageOptions="[5, 10, 20, 50]"
    tableStyle="min-width: 50rem"
  >
    <Column
      v-for="col of columns"
      :key="String(col.field)"
      :field="col.field"
      :header="col.header"
    ></Column>

    <!-- <Column field="name" header="Name" style="width: 25%"></Column>
            <Column field="country.name" header="Country" style="width: 25%"></Column>
            <Column field="company" header="Company" style="width: 25%"></Column>
            <Column field="representative.name" header="Representative" style="width: 25%"></Column> -->
  </DataTable>
</template>
