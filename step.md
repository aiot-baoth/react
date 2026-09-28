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

## 9. Storybook

```bash
npx storybook@latest init --yes --no-dev --features docs
rm -rf src/stories   # xoá story demo
```

- `.storybook/main.ts`: stories `src/**/*.mdx`, `src/**/*.stories.tsx` (dùng lại `vite.config.ts`)
- `.storybook/preview.tsx`: decorator `AppProviders` + `MemoryRouter`, import `global.css`, `tags: ['autodocs']`, sắp xếp sidebar theo tầng atomic
- Docs: `src/docs/Introduction.mdx`, `src/docs/DesignTokens.mdx`
- Story đặt cạnh component: `src/components/<tầng>/<Name>/<Name>.stories.tsx`

```bash
npm run storybook         # http://localhost:6006
npm run build-storybook   # -> storybook-static/
```

## 10. State management + API

```bash
npm i @tanstack/react-query @tanstack/react-query-devtools
npm i @reduxjs/toolkit react-redux
npm i axios
rm src/services/httpClient.ts   # thay fetch wrapper bằng axios
mkdir -p src/store/slices src/services/api src/hooks/queries
```

- axios: `src/services/api/axiosClient.ts` (interceptor gắn token, chuẩn hoá `ApiError`, 401 -> logout), resource `postApi.ts`
- TanStack Query: `src/services/queryClient.ts`, hooks `src/hooks/queries/usePosts.ts`, type lỗi `src/types/react-query.d.ts`
- Redux: `src/store/` (`authSlice`, `uiSlice`, `listeners.ts`, `useAppDispatch/useAppSelector`)
- `AppProviders`: thêm `ReduxProvider` + `QueryClientProvider` + `ReactQueryDevtools`
- `.env`: `VITE_API_URL=https://jsonplaceholder.typicode.com` (demo)
- Storybook: store/queryClient riêng trong `.storybook/preview.tsx`, docs `src/docs/StateManagement.mdx`

## 11. Form validation (React Hook Form + Zod)

```bash
npm i react-hook-form zod @hookform/resolvers
mkdir -p src/schemas src/components/molecules/FormInput src/components/organisms/{LoginForm,RegisterForm}
```

- `src/schemas/zod.ts`: `z.config(vi())` (lỗi tiếng Việt) — luôn import `z` từ `@/schemas`
- `src/schemas/common.schema.ts` (rule dùng chung), `auth.schema.ts` (`loginSchema`, `registerSchema`)
- `src/hooks/useZodForm.ts`: `useForm` + `zodResolver`, `mode: 'onTouched'`
- Atom `Input`: nhận `ref`, `type="password"` -> `Input.Password`
- Molecule `FormInput` (`useController` + `FormField`); organisms `LoginForm`, `RegisterForm`
- Stories + play test; docs `src/docs/FormValidation.mdx`

## 12. ESLint + Husky + lint-staged + commitlint

```bash
npm uninstall oxlint && rm .oxlintrc.json   # thay oxlint bằng ESLint
npm i -D eslint @eslint/js typescript-eslint eslint-plugin-react-hooks eslint-plugin-react-refresh \
  eslint-config-prettier globals
npm i -D husky lint-staged @commitlint/cli @commitlint/config-conventional
npm pkg set scripts.lint="eslint ." scripts.lint:fix="eslint . --fix"
npx husky init                                   # tạo .husky/, script "prepare": "husky"
echo "npx lint-staged" > .husky/pre-commit
echo 'npx --no -- commitlint --edit "$1"' > .husky/commit-msg
```

- `eslint.config.js`: flat config, typescript-eslint type-aware, react-hooks, react-refresh, prettier (cuối)
- ESLint bỏ qua Storybook: `.storybook/`, `**/*.stories.{ts,tsx}` (vẫn được `tsc` kiểm tra type)
- lint-staged dùng `eslint --no-warn-ignored` để commit file story không bị chặn
- `tsconfig.app.json` include thêm `.storybook/*.ts(x)` (để ESLint type-aware + tsc kiểm tra)
- `lint-staged.config.js`: ts/tsx -> eslint --fix, prettier, `tsc -b`; json/md/css -> prettier
- `commitlint.config.js`: Conventional Commits, tắt `subject-case` (cho phép tiếng Việt)
- `.vscode/`: format + eslint fix khi lưu

```bash
echo "cap nhat" | npx commitlint                 # ✖ bị chặn
echo "feat(form): thêm validate" | npx commitlint # ✔
```
