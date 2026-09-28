import { StyleProvider } from '@ant-design/cssinjs'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import { App as AntdApp, ConfigProvider } from 'antd'
import viVN from 'antd/locale/vi_VN'
import type { PropsWithChildren } from 'react'
import { antdTheme, muiTheme } from '@/theme'

/**
 * Gom toàn bộ provider của app.
 * - StyledEngineProvider enableCssLayer: style MUI nằm trong `@layer mui`
 * - StyleProvider layer: style antd nằm trong `@layer antd`
 * => Tailwind utilities (layer `utilities`) luôn override được.
 */
export function AppProviders({ children }: PropsWithChildren) {
  return (
    <StyledEngineProvider enableCssLayer>
      <ThemeProvider theme={muiTheme}>
        <StyleProvider layer>
          <ConfigProvider theme={antdTheme} locale={viVN}>
            <AntdApp>{children}</AntdApp>
          </ConfigProvider>
        </StyleProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
