<script setup lang="ts">
import type { FormPageInfoModel } from '@/libs/models/Form/FormModel'
import { ProductDetailModel } from '@/libs/models/Form/ProductDetail/ProductDetail'
import Button from 'primevue/button'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import DataTable from 'primevue/datatable'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Row from 'primevue/row'
import Textarea from 'primevue/textarea'
import { useFieldArray } from 'vee-validate'
import { computed, ref } from 'vue'

interface Props {
  arrayPath: string
  pageInfo: FormPageInfoModel
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  readonly: false
})

const editingRows = computed(() => {
  if (props.readonly) return []

  return fieldArray.fields.value.map((x) => x.value.guid)
})

const fieldArray = useFieldArray<ProductDetailModel>(props.arrayPath)

async function add() {
  fieldArray.push(new ProductDetailModel())
}

async function remove(data: ProductDetailModel) {
  fieldArray.remove(fieldArray.fields.value.findIndex((x) => x.value.guid == data.guid))
}

function getIndex(guid: string) {
  return fieldArray.fields.value.findIndex((x) => x.value.guid == guid)
}
</script>
<template>
  <div>
    <DataTable
      v-model:editingRows="editingRows"
      :value="fieldArray.fields.value"
      editMode="row"
      dataKey="guid"
    >
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-lg font-bold">Products</span>
          <Button icon="pi pi-plus" rounded @click="add" v-tooltip="$t('Action.Add')" />
        </div>
      </template>

      <Column field="id" header="id" bodyClass="content-start min-w-[100px]">
        <template #editor="{ data, field }">
          <!-- {{ data.value }} -->
          <InputText v-model="data.value[field]" fluid />
        </template>
      </Column>

      <Column field="name" header="name" bodyClass="content-start min-w-[150px]">
        <template #editor="{ data, field }">
          <InputText v-model="data.value[field]" fluid />
        </template>
      </Column>

      <Column field="price" header="price" bodyClass="content-start min-w-[150px]">
        <template #editor="{ data, field }">
          <InputNumber
            v-model="data.value[field]"
            inputId="integeronly"
            fluid
            inputClass="text-right"
            @update:modelValue="(val) => fieldArray.update(getIndex(data.value.guid), data.value)"
          />
        </template>
      </Column>

      <Column field="description" header="description" bodyClass="content-start min-w-[200px]">
        <template #editor="{ data, field }">
          <Textarea v-model="data.value[field]" autoResize rows="2" fluid />
        </template>
      </Column>

      <Column field="image" header="image" bodyClass="content-start min-w-[150px]">
        <template #editor="{ data, field }">
          <InputText v-model="data.value[field]" fluid />
        </template>
      </Column>

      <Column field="category" header="category" bodyClass="content-start min-w-[150px]">
        <template #editor="{ data, field }">
          <InputText v-model="data.value[field]" fluid />
        </template>
      </Column>

      <Column v-if="!readonly" class="!text-center" bodyClass="content-start">
        <template #body="{ data }">
          <!-- {{ data.value.guid }} -->
          <Button
            icon="pi pi-trash"
            rounded
            severity="secondary"
            @click="remove(data.value)"
            v-tooltip="$t('Action.Remove')"
          />
        </template>
      </Column>
    </DataTable>
    <!-- <pre>{{ JSON.stringify(fieldArray.fields.value, null, 2) }}</pre> -->
  </div>
</template>
