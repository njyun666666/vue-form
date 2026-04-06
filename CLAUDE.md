# Vue Form Project — Claude Code Guide

## Commands

```bash
npm run dev          # 開發伺服器
npm run build        # vue-tsc type-check + vite build
npm run lint         # ESLint 自動修正
npm run format       # Prettier 格式化 src/
```

> 新增或升級依賴一律使用 `npm install --legacy-peer-deps`

---

## Tech Stack

| 層級      | 套件                                                                             |
| --------- | -------------------------------------------------------------------------------- |
| Framework | Vue 3 (Composition API + `<script setup>`)                                       |
| Build     | Vite 7 + `@vitejs/plugin-vue`                                                    |
| UI        | PrimeVue 4、Tailwind CSS 4、Font Awesome 7 (`<font-awesome-icon />`)、PrimeIcons |
| 狀態/路由 | Pinia 3、Vue Router 5、@tanstack/vue-query                                       |
| 表單      | VeeValidate 5 beta (`useForm`、`useField`) + Zod 4 (`toTypedSchema`)             |
| 流程圖    | @vue-flow (core, background, controls, minimap, node-resizer, node-toolbar)      |
| i18n      | vue-i18n 11；語系：`en`、`zh-tw`                                                 |
| Mock      | MSW 2；worker 目錄 `public/`；`VITE_MOCK_MODE=1` 啟用                            |
| 工具      | VueUse、dayjs、lodash、axios、uuid、jwt-decode、clsx、tailwind-merge、qs         |

**路徑別名**：`@` → `src/`

---

## 專案結構

```
src/
├── assets/
├── components/
│   ├── Common/           # 共用：Brand、ErrorMessage、RequiredMark
│   ├── FlowChart/        # 流程圖節點、邊線、表單
│   ├── Form/
│   │   ├── A/            # AForm.vue、AFormInfo.vue、a.ts (schema)
│   │   ├── B/
│   │   ├── BaseInfoForm.vue
│   │   ├── ProductDetail/
│   │   └── Toolbar/
│   ├── Org/
│   └── UI/               # 可重用 UI 元件
├── faker/                # MSW 假資料產生器
├── i18n/
│   ├── base/
│   │   ├── en/forms/     # en 語系模組 JSON
│   │   └── zh-tw/forms/  # zh-tw 語系模組 JSON
│   ├── config.ts
│   ├── dayjs/
│   └── primelocale/
├── layouts/              # MainLayout、MenuNav、UserNav
├── libs/
│   ├── api/              # Axios 實例、攔截器、token refresh
│   ├── enums/            # FormTypes.ts (FormClassEnum…)
│   ├── models/           # TypeScript interfaces / Model classes
│   ├── services/         # formService、loginService、forms/aService…
│   └── utils/            # zod.ts、confirm.ts、datatable.ts、style.ts…
├── mocks/                # MSW handlers
├── pages/
│   ├── Form/
│   │   └── formComponentMap.ts   # FormClassEnum → Component
│   └── …
├── router/
├── stores/               # login、layout、locale (Pinia)
├── styles/
├── appConfig.ts
├── appConst.ts
├── main.ts
└── primeVueConfig.ts
```

---

## 開發慣例

### Vue

- 一律使用 Composition API (`<script setup>`)。
- 圖示優先使用 `<font-awesome-icon />`（Font Awesome 7）。

### TypeScript

- 維持嚴格型別；build 前會執行 `vue-tsc --build --force`。
- Model class 統一放 `src/libs/models/`。

### 樣式

- 以 Tailwind CSS utility class 為主；共用 class 組合用 `clsx` + `tailwind-merge`（`src/libs/utils/style.ts`）。
- 深色/亮色主題以 CSS class 切換。

### i18n

- 前端顯示文字**全部**走 `vue-i18n`（`$t(...)` / `useI18n().t(...)`）。
- 語系檔依模組拆分：`src/i18n/base/en/forms/x.json` & `src/i18n/base/zh-tw/forms/x.json`。

### Mock

- 每支 API 都要在 `src/mocks/` 新增對應的 MSW handler。
- 假資料使用 `src/faker/` 裡的 faker 函式產生。

---

## 驗證

- 使用 `VeeValidate 5 beta` + `Zod 4`；**禁止**混用其他驗證庫。
- `requiredFieldsValidator(val, fieldMode)` 位於 `src/libs/utils/zod.ts`，依 `FormFieldModeEnum` 動態決定必填。
- Schema 以 `z.object({...}).partial()` 定義 info；主表單再 `superRefine` 補強跨欄位規則。

---

## 路由與認證

- Router guard 在 `beforeEach`：未登入跳轉 `/login`。
- `afterEach` 設定動態 `document.title`。
- JWT 儲存於 Pinia `login` store；Axios interceptor 自動加 `Authorization: Bearer`，token 過期自動 refresh（含 debounce）。

---

## Skill

| 指令        | 說明                                                                                    |
| ----------- | --------------------------------------------------------------------------------------- |
| `/new-form` | 引導新增完整表單型別（Enum → Model → Schema → Service → Component → Map → Mock → i18n） |
