<script setup lang="ts">
import InputField from '@/components/UI/InputField.vue'
import type { AModel } from '@/libs/models/Form/A/A'
import type { FormPageInfoModel } from '@/libs/models/Form/FormModel'
import { ProductDetailModel } from '@/libs/models/Form/ProductDetail/ProductDetail'
import type { FormFieldModeType } from '@/libs/types/FormTypes'
import Button from 'primevue/button'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import DataTable from 'primevue/datatable'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Row from 'primevue/row'
import Textarea from 'primevue/textarea'
import { type FormContext, useField, useFieldArray } from 'vee-validate'
import { type Ref, computed, inject, ref } from 'vue'

interface Props {
  arrayPath: string
  // pageInfo: FormPageInfoModel
  mode?: FormFieldModeType
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'readonly'
})

const pageInfo = inject<Ref<FormPageInfoModel>>('pageInfo')!
const form = inject<FormContext<AModel>>('form')!
// form.errors.value['productDetail.0.id']
// form.errors.value.productDetail
// form.values.productDetail
const editingRows = computed(() => {
  if (props.mode == 'readonly') return []

  return fieldArray.fields.value.map((x) => x.value.guid)
})

const fieldArray = useFieldArray<ProductDetailModel>(props.arrayPath)

const getError = (index: number, field: string) =>
  (form.errors.value as any)[`productDetail[${index}].${field}`]

const add = () => fieldArray.push(new ProductDetailModel())
const remove = (data: ProductDetailModel) => {
  fieldArray.remove(fieldArray.fields.value.findIndex((x) => x.value.guid == data.guid))
}
const getIndex = (guid: string) => fieldArray.fields.value.findIndex((x) => x.value.guid == guid)
</script>
<template>
  <div>
    {{ form.errors }}
    <DataTable
      v-model:editingRows="editingRows"
      :value="fieldArray.fields.value"
      editMode="row"
      dataKey="guid"
    >
      <template #header>
        <div class="flex flex-wrap items-center gap-2">
          <span v-if="mode == 'required'" class="text-error font-bold">*</span>
          <span class="text-lg font-bold">Products</span>
          <div class="grow"></div>
          <Button
            v-if="mode != 'readonly'"
            icon="pi pi-plus"
            rounded
            @click="add"
            v-tooltip="$t('Action.Add')"
          />
        </div>
      </template>

      <Column field="id" header="id" bodyClass="content-start min-w-[100px]">
        <template #editor="{ data, field, index }">
          <!-- :error="field.title.errorMessage.value"
          :isRequired="fieldMode.title == 'required'" -->

          <InputField :error="getError(index, field)">
            <InputText v-model.trim="data.value[field]" fluid :invalid="!!getError(index, field)" />
          </InputField>
        </template>
      </Column>

      <Column field="name" header="name" bodyClass="content-start min-w-[150px]">
        <template #editor="{ data, field, index }">
          <InputField :error="getError(index, field)">
            <InputText v-model="data.value[field]" fluid :invalid="!!getError(index, field)" />
          </InputField>
        </template>
      </Column>

      <Column field="price" header="price" bodyClass="content-start min-w-[150px]">
        <template #editor="{ data, field, index }">
          <InputField :error="getError(index, field)">
            <InputNumber
              v-model="data.value[field]"
              inputId="integeronly"
              fluid
              inputClass="text-right"
              @update:modelValue="(val) => fieldArray.update(getIndex(data.value.guid), data.value)"
              :invalid="!!getError(index, field)"
            />
          </InputField>
        </template>
      </Column>

      <Column field="description" header="description" bodyClass="content-start min-w-[200px]">
        <template #editor="{ data, field, index }">
          <InputField :error="getError(index, field)">
            <Textarea
              v-model="data.value[field]"
              autoResize
              rows="2"
              fluid
              :invalid="!!getError(index, field)"
            />
          </InputField>
        </template>
      </Column>

      <Column field="image" header="image" bodyClass="content-start min-w-[150px]">
        <template #editor="{ data, field, index }">
          <InputField :error="getError(index, field)">
            <InputText v-model="data.value[field]" fluid :invalid="!!getError(index, field)" />
          </InputField>
        </template>
      </Column>

      <Column field="category" header="category" bodyClass="content-start min-w-[150px]">
        <template #editor="{ data, field, index }">
          <InputField :error="getError(index, field)">
            <InputText v-model="data.value[field]" fluid :invalid="!!getError(index, field)" />
          </InputField>
        </template>
      </Column>

      <Column v-if="mode != 'readonly'" class="!text-center" bodyClass="content-start">
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

    <small class="text-error">
      {{ form.errors.value.productDetail }}
    </small>
    <!-- <pre>{{ JSON.stringify(fieldArray.fields.value, null, 2) }}</pre> -->
  </div>
</template>
