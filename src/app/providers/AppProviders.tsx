import { StyleProvider } from '@ant-design/cssinjs'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import { QueryClientProvider, type QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { App as AntdApp, ConfigProvider } from 'antd'
import viVN from 'antd/locale/vi_VN'
import type { PropsWithChildren } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { queryClient as defaultQueryClient } from '@/services'
import { store as defaultStore, type AppStore } from '@/store'
import { antdTheme, muiTheme } from '@/theme'

export type AppProvidersProps = PropsWithChildren<{
  /** Truyền store/queryClient riêng khi test hoặc Storybook */
  store?: AppStore
  queryClient?: QueryClient
}>

/**
 * Gom toàn bộ provider của app.
 * - Redux: client state (auth, ui...)
 * - TanStack Query: server state (dữ liệu từ API)
 * - StyledEngineProvider enableCssLayer: style MUI nằm trong `@layer mui`
 * - StyleProvider layer: style antd nằm trong `@layer antd`
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
          <ThemeProvider theme={muiTheme}>
            <StyleProvider layer>
              <ConfigProvider theme={antdTheme} locale={viVN}>
                <AntdApp>{children}</AntdApp>
              </ConfigProvider>
            </StyleProvider>
          </ThemeProvider>
        </StyledEngineProvider>
        {/* Devtools tự bị loại khỏi bundle production */}
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      </QueryClientProvider>
    </ReduxProvider>
  )
}
