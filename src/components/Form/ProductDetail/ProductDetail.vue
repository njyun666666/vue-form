<script setup lang="ts">
import RequiredMark from '@/components/Common/RequiredMark.vue'
import FileImageUpload from '@/components/UI/FileImageUpload.vue'
import FileUpload from '@/components/UI/FileUpload.vue'
import InputField from '@/components/UI/InputField.vue'
import { FormFieldModeEnum } from '@/libs/enums/FormTypes'
import type { AModel } from '@/libs/models/Form/A/A'
import type { FormPageInfoModel } from '@/libs/models/Form/FormModel'
import { ProductDetailModel } from '@/libs/models/Form/ProductDetail/ProductDetail'
import { optionService } from '@/libs/services/optionService'
import { cn } from '@/libs/utils/style'
import { uuid } from '@/libs/utils/uuid'
import { useQuery } from '@tanstack/vue-query'
import Button from 'primevue/button'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'
import { type FormContext, useFieldArray } from 'vee-validate'
import { type Ref, computed, inject } from 'vue'

interface Props {
  arrayPath: string
  // pageInfo: FormPageInfoModel
  mode?: FormFieldModeEnum
  fieldMode?: Partial<Record<keyof ProductDetailModel, FormFieldModeEnum>>
}

const props = withDefaults(defineProps<Props>(), {
  mode: FormFieldModeEnum.readonly
})

const pageInfo = inject<Ref<FormPageInfoModel>>('pageInfo')!
const form = inject<FormContext<AModel>>('form')!
// form.errors.value['productDetail.0.id']
// form.errors.value.productDetail
// form.values.productDetail
const editingRows = computed(() => fieldArray.fields.value.map((x) => x.value.guid))
const fieldArray = useFieldArray<ProductDetailModel>(props.arrayPath)
const getError = (index: number, field: string) =>
  (form.errors.value as any)[`productDetail[${index}].${field}`]
const add = () => {
  const item = new ProductDetailModel()
  item.id = uuid().substring(0, 8)
  item.name = 'Asus 5090'
  item.price = 100000
  item.description = 'Asus 5090'
  item.image = uuid()
  item.category = 'gpu'

  fieldArray.push(item)
}
const remove = (index: number, data: ProductDetailModel) => {
  if (data.id) data.isDeleted = true
  else fieldArray.remove(index)
}
const { data: productCategoryList, isFetching: productCategoryIsFetching } = useQuery({
  queryKey: [optionService.productCategoryUrl],
  queryFn: () => optionService.productCategory().then(({ data }) => data),
  staleTime: 24 * 60 * 60 * 1000
})
</script>
<template>
  <div>
    <!-- {{ form.errors }} -->
    <DataTable
      v-model:editingRows="editingRows"
      :value="fieldArray.fields.value"
      editMode="row"
      dataKey="guid"
      :rowClass="(data) => cn({ hidden: data.value.isDeleted })"
    >
      <template #header>
        <div class="flex flex-wrap items-center gap-2">
          <RequiredMark v-if="mode == FormFieldModeEnum.required" />
          <span class="text-lg font-bold">{{ $t('Form.productDetail.title') }}</span>
          <div class="grow"></div>
          <Button
            v-if="mode != FormFieldModeEnum.readonly"
            icon="pi pi-plus"
            rounded
            @click="add"
            v-tooltip="$t('Action.Add')"
          />
        </div>
      </template>

      <Column field="id" bodyClass="content-start min-w-[100px]">
        <template #header>
          <RequiredMark v-if="fieldMode?.id == FormFieldModeEnum.required" />
          <span>{{ $t('Form.productDetail.id') }}</span>
        </template>
        <template #editor="{ data, field, index }">
          <InputField :error="getError(index, field)">
            <InputText
              v-model.trim="data.value[field]"
              fluid
              :invalid="!!getError(index, field)"
              :disabled="fieldMode?.id == FormFieldModeEnum.readonly"
            />
          </InputField>
        </template>
      </Column>

      <Column field="name" bodyClass="content-start min-w-[150px]">
        <template #header>
          <RequiredMark v-if="fieldMode?.name == FormFieldModeEnum.required" />
          <span>{{ $t('Form.productDetail.name') }}</span>
        </template>
        <template #editor="{ data, field, index }">
          <InputField :error="getError(index, field)">
            <InputText
              v-model="data.value[field]"
              fluid
              :invalid="!!getError(index, field)"
              :disabled="fieldMode?.name == FormFieldModeEnum.readonly"
            />
          </InputField>
        </template>
      </Column>

      <Column field="price" bodyClass="content-start min-w-[150px]">
        <template #header>
          <RequiredMark v-if="fieldMode?.price == FormFieldModeEnum.required" />
          <span>{{ $t('Form.productDetail.price') }}</span>
        </template>
        <template #editor="{ data, field, index }">
          <InputField :error="getError(index, field)">
            <InputNumber
              v-model="data.value[field]"
              inputId="integeronly"
              fluid
              inputClass="text-right"
              @update:modelValue="(val) => fieldArray.update(index, data.value)"
              :invalid="!!getError(index, field)"
              :disabled="fieldMode?.price == FormFieldModeEnum.readonly"
            />
          </InputField>
        </template>
      </Column>

      <Column field="description" bodyClass="content-start min-w-[200px]">
        <template #header>
          <RequiredMark v-if="fieldMode?.description == FormFieldModeEnum.required" />
          <span>{{ $t('Form.productDetail.description') }}</span>
        </template>
        <template #editor="{ data, field, index }">
          <InputField :error="getError(index, field)">
            <Textarea
              v-model="data.value[field]"
              autoResize
              rows="2"
              fluid
              :invalid="!!getError(index, field)"
              :disabled="fieldMode?.description == FormFieldModeEnum.readonly"
            />
          </InputField>
        </template>
      </Column>

      <Column field="image" bodyClass="content-start min-w-[150px]">
        <template #header>
          <RequiredMark v-if="fieldMode?.image == FormFieldModeEnum.required" />
          <span>{{ $t('Form.productDetail.image') }}</span>
        </template>
        <template #editor="{ data, field, index }">
          <InputField :error="getError(index, field)">
            <!-- <InputText
              v-model="data.value[field]"
              fluid
              :invalid="!!getError(index, field)"
              :disabled="fieldMode?.image == FormFieldModeEnum.readonly"
            /> -->
            <FileImageUpload :groupId="data.value[field]" :mode="fieldMode?.image" />
          </InputField>
        </template>
      </Column>

      <Column field="category" bodyClass="content-start min-w-[150px]">
        <template #header>
          <RequiredMark v-if="fieldMode?.category == FormFieldModeEnum.required" />
          <span>{{ $t('Form.productDetail.category') }}</span>
        </template>
        <template #editor="{ data, field, index }">
          <InputField :error="getError(index, field)">
            <Select
              v-model="data.value[field]"
              :options="productCategoryList"
              optionLabel="label"
              optionValue="value"
              class="w-full"
              :invalid="!!getError(index, field)"
              :loading="productCategoryIsFetching"
              :disabled="fieldMode?.category == FormFieldModeEnum.readonly"
            />
          </InputField>
        </template>
      </Column>

      <Column
        v-if="mode != FormFieldModeEnum.readonly"
        class="!text-center"
        bodyClass="content-start"
      >
        <template #body="{ data, index }">
          <Button
            icon="pi pi-trash"
            rounded
            severity="secondary"
            @click="remove(index, data.value)"
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
