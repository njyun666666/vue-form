# /new-form — 新增表單型別

依照此專案的表單架構，完整新增一個新的表單型別。

## 使用方式

```
/new-form <FormClass>
```

例：`/new-form C` 會新增 C 表單所需的全部檔案與設定。

---

## 執行步驟

你需要完成以下 **9 個步驟**，每一步完成後繼續下一步，直到全部完成。

### 步驟 1 — Enum

檔案：`src/libs/enums/FormTypes.ts`

在 `FormClassEnum` 加入新的 enum 值：

```ts
export enum FormClassEnum {
  A = 'A',
  B = 'B',
  $ARG = '$ARG' // 新增這行，$ARG 替換為實際表單代碼
}
```

---

### 步驟 2 — Model

建立 `src/libs/models/Form/$ARG/$ARG.ts`，參考 A 表單的 model 結構：

```ts
export interface $ARGInfoInterface {
  // 依需求定義欄位
  title?: string
}

export class $ARGInfoModel implements $ARGInfoInterface {
  title?: string = undefined

  constructor(data?: Partial<$ARGInfoInterface>) {
    if (data) Object.assign(this, data)
  }
}

export interface $ARGModel {
  baseInfo: import('@/libs/models/Form/FormModel').FormBaseInfoModel
  info: $ARGInfoModel
}
```

---

### 步驟 3 — Zod Schema

建立 `src/components/Form/$ARG/$ARG_lower.ts`（例：`c.ts`）：

```ts
import * as z from 'zod'

export const $ARGFormInfoSchema = z
  .object({
    title: z.string().optional()
    // 依 model 欄位定義
  })
  .partial()
```

---

### 步驟 4 — Service

建立 `src/libs/services/forms/$ARG_lowerService.ts`：

```ts
import formAPI from '@/libs/api/formAPI'
import type { $ARGModel } from '@/libs/models/Form/$ARG/$ARG'
import type { FormSaveViewModel } from '@/libs/models/Form/FormModel'

class $ARGService {
  readonly saveUrl = '/$ARG/Save'
  readonly dataUrl = '/$ARG/Data'

  save(data: $ARGModel) {
    return formAPI.post<FormSaveViewModel>(this.saveUrl, data)
  }

  data(formId: string) {
    return formAPI.get<$ARGModel>(`${this.dataUrl}/${formId}`)
  }
}

export const $ARG_lowerService = new $ARGService()
```

---

### 步驟 5 — 表單元件

建立 `src/components/Form/$ARG/$ARGForm.vue`（主表單）和 `$ARGFormInfo.vue`（區塊表單）。

**`$ARGForm.vue` 關鍵結構：**

```vue
<script setup lang="ts">
import BaseInfoForm from '../BaseInfoForm.vue'
import type Toolbar from '../Toolbar/Toolbar.vue'
import $ARGFormInfo from './$ARGFormInfo.vue'
import { $ARGFormInfoSchema } from './$ARG_lower'
import { baseInfoSchema } from '@/components/Form/form'
import { FormPageActionEnum } from '@/libs/enums/FormTypes'
import { $ARGInfoModel, type $ARGModel } from '@/libs/models/Form/$ARG/$ARG'
import { FormBaseInfoModel, type FormPageInfoModel } from '@/libs/models/Form/FormModel'
import { $ARG_lowerService } from '@/libs/services/forms/$ARG_lowerService'
import { useCreateConfirm } from '@/libs/utils/confirm'
import { requiredFieldsValidator } from '@/libs/utils/zod'
import Skeleton from 'primevue/skeleton'
import { useConfirm } from 'primevue/useconfirm'
import { useForm } from 'vee-validate'
import { type Ref, inject, onMounted, provide, ref, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'
import * as z from 'zod'

const { t } = useI18n()
const confirm = useCreateConfirm(useConfirm())
const loading = ref(true)
const pageInfo = inject<Ref<FormPageInfoModel>>('pageInfo')!
const toolbar = inject<Ref<InstanceType<typeof Toolbar>>>('toolbar')
const $ARGFormInfoRef = useTemplateRef<InstanceType<typeof $ARGFormInfo>>('$ARGFormInfoRef')

const form = useForm<$ARGModel>({
  validationSchema: z
    .object({ baseInfo: baseInfoSchema, info: $ARGFormInfoSchema })
    .superRefine((val, ctx) => {
      requiredFieldsValidator(val.info, $ARGFormInfoRef.value?.fieldMode).forEach((field) => {
        ctx.addIssue({ code: 'custom', message: t('Message.Required'), path: [`info.${field}`] })
      })
    }),
  initialValues: { baseInfo: new FormBaseInfoModel(), info: new $ARGInfoModel() }
})

if (pageInfo.value.formPageAction === FormPageActionEnum.application) {
  loading.value = false
} else {
  $ARG_lowerService.data(`${pageInfo.value.formId}`).then(({ data }) => {
    form.setValues(data)
    loading.value = false
  })
}

async function onValidate() {
  const isValid = await form.validate()
  const infoValid = await $ARGFormInfoRef.value?.validate()
  if (!isValid.valid || !infoValid) {
    confirm.alert({ message: t('Message.Please_check_the_field') })
    return false
  }
  return true
}

async function onSubmit() {
  if (!(await onValidate())) return false
  form.setFieldValue('baseInfo.description', form.values?.info?.title)
  return $ARG_lowerService
    .save(form.values || {})
    .then(({ data }) => data)
    .catch(() => false)
}

onMounted(() => {
  toolbar!.value.applicationBtn.validate = onValidate
  toolbar!.value.approveBtn.validate = onValidate
  toolbar!.value.applicationBtn.saveAction = onSubmit
  toolbar!.value.approveBtn.saveAction = onSubmit
})

provide('form', form)
</script>
<template>
  <div v-if="loading" class="flex flex-col gap-5 p-4">
    <Skeleton width="50%" height="2rem" />
    <div class="flex gap-5">
      <div v-for="n in 4" :key="n" class="flex w-1/4 flex-col gap-5">
        <Skeleton width="50%" height="1.5rem" />
        <Skeleton width="100%" height="1.5rem" />
      </div>
    </div>
  </div>
  <form v-else novalidate @submit.prevent="onSubmit">
    <h1>{{ $t('Form.Class.$ARG') }}</h1>
    <BaseInfoForm />
    <$ARGFormInfo ref="$ARGFormInfoRef" />
  </form>
</template>
```

**`$ARGFormInfo.vue` 關鍵結構：**

```vue
<script setup lang="ts">
import { FormFieldModeEnum, FormPageActionEnum } from '@/libs/enums/FormTypes'
import type { $ARGModel } from '@/libs/models/Form/$ARG/$ARG'
import type { FormPageInfoModel } from '@/libs/models/Form/FormModel'
import { useField, useForm } from 'vee-validate'
import { type Ref, computed, inject } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const pageInfo = inject<Ref<FormPageInfoModel>>('pageInfo')!
const form = inject<ReturnType<typeof useForm<$ARGModel>>>('form')!

const { value: title, errorMessage: titleError } = useField<string>('info.title')

const fieldMode = computed(() => ({
  title:
    pageInfo.value.formPageAction === FormPageActionEnum.approval
      ? FormFieldModeEnum.readonly
      : FormFieldModeEnum.required
  // 依欄位需求調整
}))

async function validate() {
  const result = await form.validate()
  return result.valid
}

defineExpose({ fieldMode, validate })
</script>
<template>
  <!-- 依欄位逐一實作，使用 InputField wrapper + PrimeVue 元件 -->
</template>
```

---

### 步驟 6 — formComponentMap

編輯 `src/pages/Form/formComponentMap.ts`，加入新表單：

```ts
import $ARGForm from '@/components/Form/$ARG/$ARGForm.vue'
import { FormClassEnum } from '@/libs/enums/FormTypes'
import type { Component } from 'vue'

export const formComponentMap: Record<FormClassEnum, Component> = {
  [FormClassEnum.A]: AForm,
  [FormClassEnum.B]: BForm,
  [FormClassEnum.$ARG]: $ARGForm // 新增
}
```

---

### 步驟 7 — MSW Mock Handler

建立 `src/mocks/$ARG_lowerformHandlers.ts`：

```ts
import appConfig from '@/appConfig'
import { $ARG_lowerService } from '@/libs/services/forms/$ARG_lowerService'
import { HttpResponse, delay, http } from 'msw'

export const $ARG_lowerformHandlers = [
  http.get(`${appConfig.FORM_API}${$ARG_lowerService.dataUrl}/:formId`, async ({ params }) => {
    await delay()
    // 回傳假資料
    return HttpResponse.json({
      baseInfo: {},
      info: { title: `$ARG 表單測試資料 ${params.formId}` }
    })
  })
]
```

然後在 `src/mocks/browser.ts` 將 `$ARG_lowerformHandlers` 加入 handlers 陣列。

---

### 步驟 8 — Faker 假資料（可選）

若 `src/faker/form.ts` 有表單假資料結構，參考現有格式加入 `$ARG` 表單的假資料。

---

### 步驟 9 — i18n

建立 `src/i18n/base/en/forms/$ARG_lower.json`：

```json
{
  "Title": "$ARG Form",
  "Fields": {
    "Title": "Title"
  }
}
```

建立 `src/i18n/base/zh-tw/forms/$ARG_lower.json`：

```json
{
  "Title": "$ARG 表單",
  "Fields": {
    "Title": "標題"
  }
}
```

並在對應的 i18n config 中 import 這兩個 JSON 檔案（參考現有 a.json 的載入方式）。

---

## 完成確認 Checklist

完成後確認以下全部勾選：

- [ ] `FormClassEnum.$ARG` 已加入
- [ ] `src/libs/models/Form/$ARG/$ARG.ts` 已建立
- [ ] `src/components/Form/$ARG/$ARG_lower.ts` (schema) 已建立
- [ ] `src/libs/services/forms/$ARG_lowerService.ts` 已建立
- [ ] `src/components/Form/$ARG/$ARGForm.vue` 已建立
- [ ] `src/components/Form/$ARG/$ARGFormInfo.vue` 已建立
- [ ] `formComponentMap.ts` 已更新
- [ ] MSW handler 已建立並加入 `browser.ts`
- [ ] i18n JSON (en + zh-tw) 已建立並載入
- [ ] `npm run build` 無 TypeScript 錯誤
