# CLAUDE.md

Source base frontend theo **Atomic Design**: React 19 + TypeScript + Vite 8, MUI 9 + Ant Design 6 + Tailwind CSS v4, Storybook 10.
State: TanStack Query (server) + Redux Toolkit (client) + axios. Form: React Hook Form + Zod. Khác: react-i18next (vi/en), dark mode, Motion (animation).

## Quy tắc bắt buộc

- **KHÔNG tự ý `git commit` / `git push`** (kể cả `--amend`, tạo tag, tạo PR). Chỉ commit khi người dùng yêu cầu rõ ràng trong tin nhắn hiện tại. Khi xong việc: tóm tắt thay đổi và **gợi ý commit message** (tiếng Anh, Conventional Commits) để người dùng tự commit.
- Được phép `git add` / xem `git status`, `git diff`. Không `git reset --hard`, `git checkout -- .`, `git stash drop`, xoá branch khi chưa hỏi.
- Mỗi bước làm xong ghi vào `step.md`: ngắn gọn, chủ yếu là command.
- Giao tiếp với người dùng bằng tiếng Việt.

## Lệnh

```bash
npm run dev              # app: http://localhost:3000
npm run storybook        # docs component: http://localhost:6006
npm run typecheck        # tsc -b (gồm cả .storybook)
npm run lint             # ESLint (type-aware); lint:fix để tự sửa
npm run format           # Prettier (tự sắp xếp class Tailwind)
npm run build            # tsc -b && vite build
npm run build-storybook  # -> storybook-static/
npx vite preview         # chạy thử bản build (kiểm tra production)
```

Trước khi báo xong: `npm run typecheck && npm run lint && npm run format:check && npm run build`; có đụng story/docs thì chạy thêm `npm run build-storybook`.

## Git hooks (đã cài)

- `pre-commit`: lint-staged -> `eslint --fix --max-warnings=0 --no-warn-ignored`, `prettier --write`, `tsc -b`.
- `commit-msg`: commitlint, **Conventional Commits** — `<type>(<scope>)?: <subject>`, header ≤ 100 ký tự.
  Type: `feat` `fix` `docs` `style` `refactor` `perf` `test` `build` `ci` `chore` `revert`.

## Cấu trúc

```
src/
├── app/            # App, providers (AppProviders, ThemeBridge), router (guards, menu, RouteErrorBoundary)
├── components/
│   ├── atoms/      # nhỏ nhất, không phụ thuộc component khác
│   ├── molecules/  # ghép atoms (Form*, ConfirmDialog, ErrorState...)
│   ├── organisms/  # khối hoàn chỉnh (DataTable, FilterBar, Sidebar, Topbar...)
│   └── templates/  # layout (DashboardLayout, AuthLayout, ListPage, DetailPage, MainLayout)
├── pages/          # template + dữ liệu thật, lazy load theo route (default export)
├── docs/           # trang MDX của Storybook
├── hooks/          # hooks dùng chung; queries/ = TanStack Query theo resource
├── i18n/           # i18next: locales/vi.ts (nguồn), en.ts; validation.ts (vmsg)
├── schemas/        # Zod schema + rule dùng chung (common.schema.ts)
├── services/       # api/ = axios client + API theo resource; queryClient.ts
├── store/          # Redux: slices/, listeners.ts (side effect), typed hooks
├── theme/          # tokens.ts, muiTheme, antdTheme, motion.ts
├── styles/         # global.css (Tailwind, @theme, thứ tự @layer, dark vars)
└── constants/  types/  utils/
```

## Quy ước code

### Component

- Mỗi component 1 folder: `Name/Name.tsx` + `Name/index.ts` + `Name/Name.stories.tsx`; export thêm ở `index.ts` của tầng.
- Tầng trên chỉ import tầng dưới: atoms ← molecules ← organisms ← templates ← pages. Import qua alias: `@/components/atoms`.
  Trong cùng tầng import trực tiếp folder (`@/components/molecules/FieldWrapper`) để tránh vòng import qua barrel.
- File `.tsx` component chỉ export component (+ type) — hằng số / hàm tiện ích để ở `constants/` hoặc `utils/` (rule react-refresh).
- Viết JSDoc cho props (Storybook hiển thị). Không viết JSX trần trong JSDoc/markdown docs — bọc trong backtick hoặc code block.
- Pattern mẫu cho màn CRUD mới: `services/api/postApi.ts` -> `hooks/queries/usePosts.ts` -> `schemas/post.schema.ts` -> `organisms/PostForm` -> `pages/PostListPage` / `PostDetailPage` -> route + `app/router/menu.tsx`.

### Style

- Ưu tiên props của component; layout/spacing bằng Tailwind `className`. Tailwind thắng MUI/antd nhờ `@layer theme, base, antd, mui, components, utilities`; ép mạnh dùng hậu tố `!`.
- Dùng màu token (`text-text`, `text-text-secondary`, `bg-surface`, `bg-background`, `border-border`, `text-primary`...) để tự đổi theo dark mode. Trường hợp riêng dùng `dark:`.
- Đổi màu/font: sửa **cả** `src/theme/tokens.ts` **và** `src/styles/global.css` (`@theme` + `[data-theme='dark']`).
- antd v6: tránh prop deprecated — `mask={{ closable }}` (không `maskClosable`), Tag `variant` (không `bordered`), Spin `size="middle"`, Alert `title` (không `message`), Divider `orientation`, `destroyOnHidden`. Không dùng `List` (deprecated).

### State & API

- Dữ liệu từ API -> TanStack Query (`hooks/queries`, có query key factory + `queryOptions`); **không** đưa vào Redux.
- Redux chỉ cho client state dùng chung (auth, ui/theme). Dùng `useAppDispatch` / `useAppSelector`; side effect (localStorage...) đặt trong `store/listeners.ts`, reducer giữ thuần.
- Gọi API qua `api.*` / `xxxApi` trong `services/api`, không gọi axios trực tiếp trong component. Lỗi là `ApiError { message, status, data }`.
- Lọc / phân trang lưu trên URL bằng `useQueryParams`.

### Form

- Schema Zod ở `src/schemas`; import `z` từ `@/schemas` (không import thẳng `'zod'`) để bật locale.
- Message lỗi dùng `vmsg('validation.xxx', { field: 'field.yyy' })` — không viết câu cố định (để dịch được). Rule sẵn: `requiredString(field)`, `emailRule`, `passwordRule`, `phoneRule`, `dateRule(field)`.
- Dùng `useZodForm(schema, { defaultValues })` + các `Form*` molecule (FormInput, FormSelect, FormDatePicker...). Field mới: dùng `useFieldController` + `FieldWrapper`.

### i18n

- Mọi text hiển thị dùng `t('key')`. Thêm key vào `src/i18n/locales/vi.ts` trước, TypeScript sẽ bắt bổ sung `en.ts`.

### Animation (Motion)

- Đang bật `<LazyMotion strict>`: chỉ dùng `m.*` từ `motion/react` (ESLint cấm `motion` và `framer-motion`).
- Ưu tiên atom `Animate`, `Stagger`/`StaggerItem`, `AnimatedNumber`; dùng `motionTokens` / `motionPresets` (`src/theme/motion.ts`), không tự đặt số.
- Chỉ animate `opacity` / `transform`. Modal/Drawer/Dropdown của antd, MUI đã có animation riêng — không bọc thêm.

### Routing

- Route ở `src/app/router/index.tsx`; page và layout đều lazy (`page()`, `layout()`).
- `ProtectedRoute` (có `roles`), `GuestRoute`; breadcrumb qua `handle: { crumb } satisfies RouteHandle`.

### Bundle

- `package.json` có `"sideEffects"` để tree-shake qua barrel. File nào **chạy code khi import** (không chỉ export) phải thêm vào danh sách, nếu không sẽ bị loại khỏi bản production. Nghi ngờ thì kiểm tra bằng `npm run build && npx vite preview`.

## Storybook

- Global decorator (`.storybook/preview.tsx`): `AppProviders` (store/queryClient riêng, có user demo) + `createMemoryRouter`. Story cần URL/params: `parameters.router: { initialEntries: ['/posts/1'], path: '/posts/:id' }`.
- Toolbar: Theme (light/dark), Ngôn ngữ (vi/en), Animation (on/off). Loader set ngôn ngữ/theme trước khi render.
- Play test không phụ thuộc thời gian animation: đặt `parameters: { motion: { skip: true } }`.
- Story mặc định chạy tiếng Việt — assertion dùng text tiếng Việt.
- Đưa JSX vào `render` thay vì `args` khi có thể.

## Dữ liệu mẫu (mock)

- API demo: JSONPlaceholder (`VITE_API_URL`) — tạo/sửa/xoá trả về thành công nhưng không lưu thật.
- Mock: `services/api/authApi.ts` (email `admin...` có role admin, `fail@example.com` để thử lỗi), `hooks/useNotifications.ts`, số liệu `DashboardPage`.
