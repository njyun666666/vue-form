# /new-form — 新增表單型別

依照此專案的表單架構，完整新增一個新的表單型別。

## 使用方式

```
/new-form <FormClass>
```

例：`/new-form C` 會新增 C 表單所需的全部檔案與設定。

---

## 執行步驟

你需要完成以下 **10 個步驟**，每一步完成後繼續下一步，直到全部完成。

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
import { FormBaseInfoModel } from '@/libs/models/Form/FormModel'

export class $ARGInfoModel {
  title?: string
  // 依需求定義欄位

  constructor(input?: Partial<$ARGInfoModel>) {
    this.title = input?.title
    // 逐一對應欄位
  }
}

export class $ARGModel {
  baseInfo?: FormBaseInfoModel
  info?: $ARGInfoModel

  constructor(input?: Partial<$ARGModel>) {
    this.baseInfo = input?.baseInfo
    this.info = input?.info ? new $ARGInfoModel(input.info) : undefined
    // 若有 productDetail 陣列：
    // this.productDetail = input?.productDetail?.map((item) => new ProductDetailModel(item))
  }
}
```

> Model constructor 負責轉換原始 API 資料（巢狀物件、陣列的 new Model()），Service 只做 HTTP 呼叫。

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
import { $ARGModel } from '@/libs/models/Form/$ARG/$ARG'
import type { FormSaveViewModel } from '@/libs/models/Form/FormModel'

class $ARGService {
  readonly saveUrl = '/$ARG_lower/save'
  readonly dataUrl = '/$ARG_lower/data'

  save(data: $ARGModel) {
    return formAPI.post<FormSaveViewModel>(this.saveUrl, data)
  }

  data(formId: string) {
    return formAPI.get<$ARGModel>(`${this.dataUrl}/${formId}`).then((res) => {
      res.data = new $ARGModel(res.data) // Model constructor 負責轉換
      return res
    })
  }
}

export const $ARG_lowerService = new $ARGService()
```

---

### 步驟 5 — FieldMode Composable

建立 `src/components/Form/$ARG/use$ARGFieldMode.ts`：

每張表單的欄位控制邏輯依步驟（stepId）與商業規則不同，獨立封裝為該表單專屬的 composable。

```ts
import { FormFieldModeEnum, FormPageActionEnum } from '@/libs/enums/FormTypes'
import type { $ARGModel } from '@/libs/models/Form/$ARG/$ARG'
import type { FormPageInfoModel } from '@/libs/models/Form/FormModel'
import type { FormContext } from 'vee-validate'
import { type Ref, computed } from 'vue'

export function use$ARGFieldMode(pageInfo: Ref<FormPageInfoModel>, form: FormContext<$ARGModel>) {
  const fieldMode = computed(() => {
    const mode: Record<string, FormFieldModeEnum> = {
      title: FormFieldModeEnum.readonly
      // 預設全部 readonly
    }

    // info 頁不開放編輯
    if (pageInfo.value.formPageAction === FormPageActionEnum.info) return mode

    // 依 stepId 設定各欄位模式
    if (pageInfo.value.stepId === 1) {
      mode.title = FormFieldModeEnum.required
    }

    // 可依 form.values 中的欄位值做條件判斷
    // 例：if (form.values.info?.radio === 1) { ... }

    return mode
  })

  return { fieldMode }
}
```

> **不要**建立通用的 `useFieldMode`，每張表單自行建立對應的 composable（`useAFieldMode`、`useBFieldMode`…），商業邏輯才不會互相耦合。

---

### 步驟 6 — 表單元件

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
import { $ARGInfoModel, $ARGModel } from '@/libs/models/Form/$ARG/$ARG'
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

const initialValues: $ARGModel = {
  baseInfo: new FormBaseInfoModel(),
  info: new $ARGInfoModel()
}

const form = useForm<$ARGModel>({
  validationSchema: z
    .object({ baseInfo: baseInfoSchema, info: $ARGFormInfoSchema })
    .superRefine((val, ctx) => {
      requiredFieldsValidator(val.info, $ARGFormInfoRef.value?.fieldMode).forEach((field) => {
        ctx.addIssue({ code: 'custom', message: t('Message.Required'), path: [`info.${field}`] })
      })
    }),
  initialValues
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
  const { valid, errors } = await form.validate()
  if (!valid) {
    console.error(errors)
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

> 驗證統一由 `form.validate()` 搭配 `superRefine` 完成，不在 FormInfo 內另行呼叫 validate。

**`$ARGFormInfo.vue` 關鍵結構：**

```vue
<script setup lang="ts">
import { use$ARGFieldMode } from './use$ARGFieldMode'
import InputField from '@/components/UI/InputField.vue'
import { FormFieldModeEnum } from '@/libs/enums/FormTypes'
import type { $ARGModel } from '@/libs/models/Form/$ARG/$ARG'
import type { FormPageInfoModel } from '@/libs/models/Form/FormModel'
import InputText from 'primevue/inputtext'
import type { FormContext } from 'vee-validate'
import { useField } from 'vee-validate'
import { type Ref, inject } from 'vue'

const pageInfo = inject<Ref<FormPageInfoModel>>('pageInfo')!
const form = inject<FormContext<$ARGModel>>('form')!

const field = {
  title: useField<string>('info.title')
}

const { fieldMode } = use$ARGFieldMode(pageInfo, form)

defineExpose({ fieldMode })
</script>
<template>
  <div>
    <InputField
      for="title"
      :label="$t('Form.$ARG.title')"
      :error="field.title.errorMessage.value"
      :isRequired="fieldMode.title === FormFieldModeEnum.required"
    >
      <InputText
        id="title"
        v-model.trim="field.title.value.value"
        :invalid="!!field.title.errorMessage.value"
        :disabled="fieldMode.title === FormFieldModeEnum.readonly"
      />
    </InputField>
  </div>
</template>
```

> - `form` 以 `FormContext<$ARGModel>` 型別注入，傳入 composable 以存取完整表單資料。
> - `defineExpose` 只暴露 `fieldMode`（及需要的 composable 回傳值），不暴露 `validate`。

---

### 步驟 7 — formComponentMap

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

### 步驟 8 — MSW Mock Handler

建立 `src/mocks/$ARG_lowerHandlers.ts`：

```ts
import appConfig from '@/appConfig'
import { $ARG_lowerService } from '@/libs/services/forms/$ARG_lowerService'
import { HttpResponse, delay, http } from 'msw'

export const $ARG_lowerHandlers = [
  http.get(`${appConfig.FORM_API}${$ARG_lowerService.dataUrl}/:formId`, async ({ params }) => {
    await delay()
    return HttpResponse.json({
      baseInfo: {},
      info: { title: `$ARG 表單測試資料 ${params.formId}` }
    })
  })
]
```

然後在 `src/mocks/browser.ts` 將 `$ARG_lowerHandlers` 加入 handlers 陣列。

---

### 步驟 9 — Faker 假資料（可選）

若 `src/faker/form.ts` 有表單假資料結構，參考現有格式加入 `$ARG` 表單的假資料。

---

### 步驟 10 — i18n

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
- [ ] `src/libs/models/Form/$ARG/$ARG.ts` 已建立（含 constructor）
- [ ] `src/components/Form/$ARG/$ARG_lower.ts` (schema) 已建立
- [ ] `src/libs/services/forms/$ARG_lowerService.ts` 已建立（`data()` 使用 `new $ARGModel()`）
- [ ] `src/components/Form/$ARG/use$ARGFieldMode.ts` 已建立
- [ ] `src/components/Form/$ARG/$ARGForm.vue` 已建立（單一 `form.validate()` 驗證）
- [ ] `src/components/Form/$ARG/$ARGFormInfo.vue` 已建立（使用 composable，無 `validate()` expose）
- [ ] `formComponentMap.ts` 已更新
- [ ] MSW handler 已建立並加入 `browser.ts`
- [ ] i18n JSON (en + zh-tw) 已建立並載入
- [ ] `npm run build` 無 TypeScript 錯誤
