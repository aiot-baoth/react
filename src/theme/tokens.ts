/**
 * Design tokens dùng chung cho MUI, Ant Design và Tailwind.
 * Khi đổi giá trị ở đây, nhớ cập nhật biến tương ứng trong `src/styles/global.css`
 * (`@theme` cho light, `[data-theme='dark']` cho dark).
 */
export const tokens = {
  /** Màu thương hiệu / trạng thái — giống nhau ở cả 2 mode */
  color: {
    primary: '#1677ff',
    secondary: '#722ed1',
    success: '#52c41a',
    warning: '#faad14',
    error: '#ff4d4f',
    info: '#1677ff',
  },
  /** Màu nền / chữ / viền — đổi theo theme mode */
  mode: {
    light: {
      text: '#1f1f1f',
      textSecondary: '#595959',
      background: '#f5f5f5',
      surface: '#ffffff',
      border: '#d9d9d9',
    },
    dark: {
      text: '#f0f0f0',
      textSecondary: '#a6a6a6',
      background: '#0f0f10',
      surface: '#1c1c1e',
      border: '#3a3a3c',
    },
  },
  font: {
    family: "'Inter', system-ui, 'Segoe UI', Roboto, sans-serif",
    size: 14,
  },
  radius: 8,
} as const

export type ThemeMode = keyof typeof tokens.mode
export type Tokens = typeof tokens
