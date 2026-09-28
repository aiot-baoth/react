/**
 * Design tokens dùng chung cho MUI, Ant Design và Tailwind.
 * Khi đổi màu/font ở đây, nhớ cập nhật biến tương ứng trong `src/styles/global.css` (@theme).
 */
export const tokens = {
  color: {
    primary: '#1677ff',
    secondary: '#722ed1',
    success: '#52c41a',
    warning: '#faad14',
    error: '#ff4d4f',
    info: '#1677ff',
    text: '#1f1f1f',
    textSecondary: '#595959',
    background: '#f5f5f5',
    surface: '#ffffff',
    border: '#d9d9d9',
  },
  font: {
    family: "'Inter', system-ui, 'Segoe UI', Roboto, sans-serif",
    size: 14,
  },
  radius: 8,
} as const

export type Tokens = typeof tokens
