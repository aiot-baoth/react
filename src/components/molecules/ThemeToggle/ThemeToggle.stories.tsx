import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeToggle } from './ThemeToggle'

const meta = {
  title: 'Molecules/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    docs: {
      description: {
        component:
          "Nút chuyển giao diện sáng / tối. Lưu trong Redux (`uiSlice.themeMode`) + localStorage; MUI, antd và Tailwind (`dark:`) đổi theo. Trong Storybook có thể đổi bằng toolbar **Theme**.\n\n```tsx\n<ThemeToggle />\n\n// Đọc/đổi ở chỗ khác\nconst mode = useAppSelector(selectThemeMode)\ndispatch(setThemeMode('dark'))\n```",
      },
    },
  },
} satisfies Meta<typeof ThemeToggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
