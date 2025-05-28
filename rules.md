# Project Rules

## 基本信息

- 專案名稱：
- 專案目的：

## 專案結構

專案根目錄結構說明：

- `/src`: 主要源代碼目錄
- `/src/components`: client 組件
- `/src/components/__tests__`: 測試文件
- `/src/components/ui`: radix-ui 組件
- `/src/context`: provider 檔案
- `/public`: 靜態資源文件
- `/docs`: 文檔
- `/lib`: 應用檔

## 編碼風格

- 使用 ESLint 和 Prettier 進行代碼格式化
- 採用 camelCase 命名變數和函數
- 使用 PascalCase 命名組件和類
- 檔案命名使用 kebab-case
- javascript: Airbnb React/JSX Style Guide

## 技術棧

- 前端框架: React
- 樣式: CSS Modules / Tailwind CSS
- 狀態管理: Zustand
- API 請求: Axios
- 與資料庫溝通: prisma

## 重要知識

- 所有 API 請求應統一通過 `/src/services` 進行管理
- 共用組件應放置在 `/src/components/common`
- 頁面組件應放置在 `/src/pages`
- 使用環境變數存儲敏感信息

## 測試規範

- 單元測試使用 Vitest
- 組件測試使用 React Testing Library
- 測試文件命名格式: `*.test.js` 或 `*.spec.js`

## Git 工作流

- 使用 Gitflow 工作流
- 分支命名: `feature/feature-name`, `bugfix/issue-description`
- Commit 訊息格式: `[type]: description`

## 部署流程

- CI/CD 使用 GitHub Actions
- 測試環境: Vercel
- 生產環境: AWS/GCP

## API 開發規範

- RESTful API 設計原則
  - 使用名詞而非動詞表示資源 (例如: `/users` 而非 `/getUsers`)
  - 使用 HTTP 方法表示操作 (GET, POST, PUT, DELETE)
  - 使用巢狀路由表示資源關係 (例如: `/users/{id}/orders`)
  - 資源 ID 應放在 URL 中 (例如: `/users/{id}`)

- API 版本控制
  - 在 URL 中包含版本號 (例如: `/api/v1/users`)
  - 主要版本變更時遞增版本號

- API 請求與響應格式
  - 請求參數使用 camelCase
  - 響應數據使用統一格式:

    ```json
    {
      "success": true,
      "data": {},
      "message": "",
      "code": 200
    }
    ```

- API 錯誤處理
  - 使用適當的 HTTP 狀態碼
  - 錯誤響應格式統一:

    ```json
    {
      "success": false,
      "details": {},
      "message": "錯誤描述",
      "code": "ERROR_CODE"
    }
    ```

- API 文檔
  - 使用 Swagger/OpenAPI 進行 API 文檔化
  - 每個 API 端點都應有清晰的描述、參數說明和響應範例

- API 測試
  - 每個 API 端點都應有對應的自動化測試
  - 測試應涵蓋正常流程和錯誤處理

- API 安全
  - 實施身份驗證和授權機制
  - 敏感數據應進行加密
  - 實施速率限制防止濫用

- 注意事項
  - 如果你找不到正確的方法，請和我討論，不要自己亂猜亂寫。
