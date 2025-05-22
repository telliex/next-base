This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## API 開發與自動文件化流程

本專案已整合自動 API 文件產生，開發者只需在 Next.js API route 加上註解，即可自動產生 OpenAPI (Swagger) 文件，並用 Redoc 美觀展示。

### 1. 撰寫 API
在 `src/app/api/xxx/route.ts` 中撰寫 API，並用 `ApiRoute` 裝飾器描述：

```typescript
import { ApiRoute } from '@/lib/decorators';

export const GET = ApiRoute({
  path: '/posts',
  method: 'GET',
  summary: 'Get all posts',
  description: 'Retrieve a list of all posts with their authors',
  tags: ['Posts'],
})(async () => {
  // ...你的邏輯
});
```

### 2. 產生 API 文件
每次 API 有異動時，執行：
```bash
pnpm run generate-docs
```
這會自動掃描所有 route，產生/更新 `public/swagger.json`。

### 3. 查看 API 文件
啟動 Next.js 或任何靜態伺服器，然後瀏覽：
```
http://localhost:3000/api-docs.html
```
Redoc 會自動讀取 `swagger.json`，顯示美觀的 API 文件頁面。

### 優點
- **完全自動**：API route 只需加註解，無需額外維護 controller/model。
- **即時同步**：每次執行 `pnpm run generate-docs`，API 文件即時更新。
- **易於維護**：API 文件與程式碼同源，減少遺漏與錯誤。
- **美觀易讀**：Redoc 展示，支援搜尋、折疊、分類。

### 團隊協作建議
- 每次 API route 有異動，請務必執行 `pnpm run generate-docs` 並 commit `public/swagger.json`。
- 文件頁面（api-docs.html）可直接給前端、QA、第三方開發者瀏覽。
