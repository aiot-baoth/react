import type { Decorator, Preview } from '@storybook/react-vite'
import { QueryClient } from '@tanstack/react-query'
import { MotionGlobalConfig } from 'motion/react'
import { useEffect, useMemo, type ReactNode } from 'react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { AppProviders } from '../src/app/providers'
import i18n from '../src/i18n'
import { makeStore, setThemeMode } from '../src/store'
import type { ThemeMode } from '../src/theme'
import '../src/styles/global.css'

// Store/QueryClient riêng cho Storybook, tách khỏi instance của app. Có sẵn user demo cho Topbar/UserMenu.
const store = makeStore({
  auth: {
    token: 'storybook-token',
    user: { id: 1, name: 'Nguyễn Văn An', email: 'an@example.com', roles: ['admin'] },
  },
})
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, staleTime: Infinity } },
})

/** Cấu hình router cho từng story qua `parameters.router` */
export type StoryRouterParams = {
  /** URL ban đầu, vd ['/posts/1'] */
  initialEntries?: string[]
  /** Pattern route của story, vd '/posts/:id' (để useParams có giá trị) */
  path?: string
}

/** Data router (createMemoryRouter) để các hook như useMatches/useParams chạy được trong story */
function StoryRouter({
  params,
  argsKey,
  children,
}: {
  params?: StoryRouterParams
  argsKey: string
  children: ReactNode
}) {
  const router = useMemo(
    () =>
      createMemoryRouter([{ path: params?.path ?? '*', element: children }], {
        initialEntries: params?.initialEntries ?? ['/'],
      }),
    // Tạo lại router khi args đổi để story nhận args mới
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [argsKey],
  )
  return <RouterProvider router={router} />
}

/** Key ổn định từ args để tạo lại router khi args đổi (bỏ qua function / React element) */
function argsToKey(args: Record<string, unknown>) {
  try {
    return JSON.stringify(args, (_key, value: unknown) => {
      if (typeof value === 'function') return 'fn'
      if (value && typeof value === 'object' && '$$typeof' in value) return 'element'
      return value
    })
  } catch {
    return String(Date.now())
  }
}

/** Đồng bộ toolbar Theme / Ngôn ngữ của Storybook vào Redux + i18next */
function GlobalsSync({ theme, locale }: { theme: ThemeMode; locale: string }) {
  useEffect(() => {
    store.dispatch(setThemeMode(theme))
  }, [theme])
  useEffect(() => {
    if (i18n.language !== locale) void i18n.changeLanguage(locale)
  }, [locale])
  return null
}

const withProviders: Decorator = (Story, context) => (
  <AppProviders store={store} queryClient={queryClient}>
    <GlobalsSync
      theme={context.globals.theme as ThemeMode}
      locale={context.globals.locale as string}
    />
    <div className="bg-background">
      <StoryRouter
        params={context.parameters.router as StoryRouterParams | undefined}
        argsKey={argsToKey(context.args)}
      >
        <Story />
      </StoryRouter>
    </div>
  </AppProviders>
)

const preview: Preview = {
  // Chạy TRƯỚC khi render story: set ngôn ngữ + theme theo toolbar (play test luôn thấy đúng ngôn ngữ)
  loaders: [
    async ({ globals, parameters }) => {
      // Tắt animation: toolbar "Animation: Off" hoặc story đặt parameters.motion.skip (play test không phụ thuộc timing)
      MotionGlobalConfig.skipAnimations =
        globals.motion === 'off' ||
        Boolean((parameters.motion as { skip?: boolean } | undefined)?.skip)
      store.dispatch(setThemeMode(globals.theme as ThemeMode))
      if (i18n.language !== globals.locale) await i18n.changeLanguage(globals.locale as string)
      return {}
    },
  ],
  // Bọc mọi story bằng provider giống app thật (Redux, Query, i18n, theme MUI/antd, CSS layer, router)
  decorators: [withProviders],
  globalTypes: {
    theme: {
      description: 'Giao diện sáng / tối',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
    motion: {
      description: 'Bật / tắt animation (Motion)',
      toolbar: {
        icon: 'lightning',
        items: [
          { value: 'on', title: 'Animation: On' },
          { value: 'off', title: 'Animation: Off' },
        ],
        dynamicTitle: true,
      },
    },
    locale: {
      description: 'Ngôn ngữ',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'vi', title: 'Tiếng Việt' },
          { value: 'en', title: 'English' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light', locale: 'vi', motion: 'on' },
  parameters: {
    layout: 'padded',
    // "Show code" hiển thị mã nguồn thật của story (dễ copy hơn JSX sinh tự động)
    docs: { source: { type: 'code' } },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          'Giới thiệu',
          [
            'Tổng quan',
            'Quản lý state',
            'Form validation',
            'Dark mode & i18n',
            'Routing',
            'Animation',
          ],
          'Foundations',
          'Atoms',
          'Molecules',
          'Organisms',
          'Templates',
          'Pages',
        ],
      },
    },
  },
  tags: ['autodocs'],
}

export default preview
