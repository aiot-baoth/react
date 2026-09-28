# Base Frontend

React 19 + TypeScript + Vite · MUI · Ant Design · Tailwind CSS v4 — tổ chức theo **Atomic Design**.

State: **TanStack Query** (server state) · **Redux Toolkit** (client state) · **axios** (gọi API).

Form: **React Hook Form** + **Zod** (validate, thông báo lỗi tiếng Việt).

## Scripts

| Lệnh                        | Mô tả                                |
| --------------------------- | ------------------------------------ |
| `npm run dev`               | Dev server (http://localhost:3000)   |
| `npm run build`             | Typecheck + build production         |
| `npm run typecheck`         | Kiểm tra TypeScript                  |
| `npm run lint` / `lint:fix` | ESLint (kiểm tra / tự sửa)           |
| `npm run format`            | Prettier (tự sắp xếp class Tailwind) |

## Cấu trúc

```
src/
├── app/            # App, providers, router
├── components/
│   ├── atoms/      # Thành phần nhỏ nhất: Button, Input, Logo, Loader
│   ├── molecules/  # Ghép atoms: FormField, SearchBar
│   ├── organisms/  # Khối UI hoàn chỉnh: Header
│   └── templates/  # Layout trang: MainLayout
├── pages/          # Template + dữ liệu thật, lazy load theo route
├── theme/          # Design tokens -> MUI theme, antd theme
├── styles/         # global.css (Tailwind + @theme + thứ tự layer)
├── hooks/          # hooks dùng chung; queries/ = TanStack Query hooks theo resource
├── services/       # api/ = axios client + API theo resource; queryClient.ts
├── schemas/        # Zod schema (validate form) + rule dùng chung
├── store/          # Redux Toolkit: slices/, listeners.ts, typed hooks
├── utils/  constants/  types/
```

## Quy ước

- Mỗi component 1 folder: `Name/Name.tsx` + `Name/index.ts` + `Name/Name.stories.tsx`; mỗi tầng có `index.ts` barrel.
- Viết JSDoc cho props để Storybook hiển thị mô tả trong tab Docs.
- Import qua alias: `import { Button } from '@/components/atoms'`.
- Tầng chỉ import từ tầng thấp hơn (atoms ← molecules ← organisms ← templates ← pages).
- Màu/font sửa ở `src/theme/tokens.ts` **và** `@theme` trong `src/styles/global.css`.
- Style: Tailwind utilities luôn thắng MUI/antd nhờ CSS `@layer`. Cần ép mạnh hơn dùng `!` (vd `bg-success!`).
- Dữ liệu từ API → TanStack Query (`src/hooks/queries`), **không** lưu vào Redux. Redux chỉ cho client state dùng chung (auth, UI).
- Gọi API qua `api.*` trong `src/services/api`, không gọi axios trực tiếp trong component.
- Form: khai báo schema trong `src/schemas`, dùng `useZodForm(schema)` + `FormInput`. Import `z` từ `@/schemas`, không import thẳng từ `'zod'`.

## Commit

- Trước mỗi commit, Husky chạy **lint-staged**: ESLint `--fix` + Prettier trên file đã stage, sau đó `tsc -b`. Còn lỗi thì commit bị chặn.
- Message commit theo **Conventional Commits** (commitlint): `<type>(<scope>)?: <mô tả>`
  - type: `feat` `fix` `docs` `style` `refactor` `perf` `test` `build` `ci` `chore` `revert`
  - Ví dụ: `feat(auth): thêm form đăng nhập`, `fix(header): lệch logo trên mobile`
