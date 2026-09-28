# Steps

## 1. Scaffold (Vite + React + TS)

```bash
npm create vite@latest . -- --template react-ts --no-interactive
npm install
```

## 2. Cài thư viện UI + router

```bash
npm i @mui/material @mui/icons-material @emotion/react @emotion/styled
npm i antd @ant-design/icons @ant-design/cssinjs
npm i react-router-dom
npm i -D tailwindcss @tailwindcss/vite
npm i -D prettier prettier-plugin-tailwindcss
```

## 3. Dọn file demo + tạo cấu trúc atomic design

```bash
rm -f src/App.css src/App.tsx src/index.css src/assets/* public/icons.svg
mkdir -p src/{app/{providers,router},components/{atoms,molecules,organisms,templates},pages,theme,hooks,services,utils,types,constants,styles}
```

## 4. Config

- `vite.config.ts`: plugin `tailwindcss()`, alias `@ -> src`, port 3000, tách vendor chunk (react/mui/antd)
- `tsconfig.app.json`: `"paths": { "@/*": ["./src/*"] }`
- `.prettierrc`, `.prettierignore`, `.env.example` -> `.env`

```bash
npm pkg set scripts.format="prettier --write ." scripts.format:check="prettier --check ." scripts.typecheck="tsc -b"
```

## 5. Theme + tích hợp MUI / antd / Tailwind

- `src/theme/tokens.ts` -> `muiTheme.ts`, `antdTheme.ts`; `src/styles/global.css` (`@theme`)
- Thứ tự layer: `@layer theme, base, antd, mui, components, utilities;` -> Tailwind override được MUI/antd
- `AppProviders`: `StyledEngineProvider enableCssLayer` (MUI) + `StyleProvider layer` (antd) + `ConfigProvider`

## 6. Component mẫu

- atoms: `Button` (MUI), `Input` (antd), `Loader` (antd), `Logo` (Tailwind)
- molecules: `FormField`, `SearchBar`
- organisms: `Header`
- templates: `MainLayout`
- pages: `HomePage`, `NotFoundPage` (lazy qua react-router `lazy`)

## 7. Kiểm tra

```bash
npm run format
npm run typecheck
npm run lint
npm run build
npm run dev   # http://localhost:3000
```

## 8. Git

```bash
git init && git add . && git commit -m "chore: init base frontend"
```
