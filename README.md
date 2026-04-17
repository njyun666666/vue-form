# Vue Form

[Demo](https://vue-form-jyun.vercel.app) · [GitHub](https://github.com/njyun666666/vue-form)

基於 Vue 3 + PrimeVue 4 的表單簽核系統，支援表單申請、多關卡簽核流程與流程圖視覺化。

## 功能

- 表單申請與簽核（核准 / 駁回）
- 多關卡流程圖設計與預覽
- 簽核歷程查閱（DataTable + 流程圖 Hover 預覽）
- 表單欄位動態驗證（必填 / 選填 / 唯讀 / 隱藏）
- RWD Layout、淺色 / 深色主題、多國語系（繁中 / 英文）

## 快速開始

```bash
npm install
npm run dev        # 開發伺服器（Mock API）
npm run build      # type-check + 建置
npm run lint       # ESLint 自動修正
npm run format     # Prettier 格式化
```

> 預設以 Mock Service Worker 模擬後端 API，無需額外環境設定。

## 技術棧

| 分類        | 套件                                                   |
| ----------- | ------------------------------------------------------ |
| Framework   | Vue 3 (Composition API + `<script setup>`)             |
| Build       | Vite 7、TypeScript 5                                   |
| UI          | PrimeVue 4、Tailwind CSS 4、Font Awesome 7、PrimeIcons |
| 狀態 / 路由 | Pinia 3、Vue Router 5、@tanstack/vue-query             |
| 表單驗證    | VeeValidate 4 + Zod 3                                  |
| 流程圖      | @vue-flow/core                                         |
| i18n        | vue-i18n 11                                            |
| Mock        | MSW 2                                                  |
| 工具        | VueUse、dayjs、lodash、axios                           |

## 部署

透過 [Vercel](https://vercel.com) 連接 GitHub 自動部署。
