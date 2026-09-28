import { StyledEngineProvider } from '@mui/material/styles'
import { QueryClientProvider, type QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { LazyMotion, MotionConfig } from 'motion/react'
import type { PropsWithChildren } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import '@/i18n'
import { queryClient as defaultQueryClient } from '@/services'
import { store as defaultStore, type AppStore } from '@/store'
import { ThemeBridge } from './ThemeBridge'

/** Tải tính năng animation sau (chunk riêng) */
const loadMotionFeatures = () => import('@/theme/motionFeatures').then((mod) => mod.default)

export type AppProvidersProps = PropsWithChildren<{
  /** Truyền store/queryClient riêng khi test hoặc Storybook */
  store?: AppStore
  queryClient?: QueryClient
}>

/**
 * Gom toàn bộ provider của app.
 * - Redux: client state (auth, ui, theme mode...)
 * - TanStack Query: server state (dữ liệu từ API)
 * - i18next: đa ngôn ngữ (import '@/i18n' để khởi tạo)
 * - StyledEngineProvider enableCssLayer: style MUI nằm trong `@layer mui`
 * - ThemeBridge: theme MUI/antd theo dark/light + locale antd; style antd nằm trong `@layer antd`
 * - Motion: LazyMotion (strict -> chỉ dùng `m.*`), tắt animation khi hệ điều hành bật "Giảm chuyển động"
 * => Tailwind utilities (layer `utilities`) luôn override được.
 */
export function AppProviders({
  children,
  store = defaultStore,
  queryClient = defaultQueryClient,
}: AppProvidersProps) {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <StyledEngineProvider enableCssLayer>
          <LazyMotion features={loadMotionFeatures} strict>
            <MotionConfig reducedMotion="user">
              <ThemeBridge>{children}</ThemeBridge>
            </MotionConfig>
          </LazyMotion>
        </StyledEngineProvider>
        {/* Devtools tự bị loại khỏi bundle production */}
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      </QueryClientProvider>
    </ReduxProvider>
  )
}
