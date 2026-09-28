# Base Frontend

React 19 + TypeScript + Vite · MUI · Ant Design · Tailwind CSS v4 — tổ chức theo **Atomic Design**.

## Scripts

| Lệnh                | Mô tả                                |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Dev server (http://localhost:3000)   |
| `npm run build`     | Typecheck + build production         |
| `npm run typecheck` | Kiểm tra TypeScript                  |
| `npm run lint`      | oxlint                               |
| `npm run format`    | Prettier (tự sắp xếp class Tailwind) |

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
├── hooks/  services/  utils/  constants/  types/
```

## Quy ước

- Mỗi component 1 folder: `Name/Name.tsx` + `Name/index.ts`; mỗi tầng có `index.ts` barrel.
- Import qua alias: `import { Button } from '@/components/atoms'`.
- Tầng chỉ import từ tầng thấp hơn (atoms ← molecules ← organisms ← templates ← pages).
- Màu/font sửa ở `src/theme/tokens.ts` **và** `@theme` trong `src/styles/global.css`.
- Style: Tailwind utilities luôn thắng MUI/antd nhờ CSS `@layer`. Cần ép mạnh hơn dùng `!` (vd `bg-success!`).
