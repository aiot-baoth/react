import type { Meta, StoryObj } from '@storybook/react-vite'
import { LanguageSwitcher } from './LanguageSwitcher'

const meta = {
  title: 'Molecules/LanguageSwitcher',
  component: LanguageSwitcher,
  parameters: {
    docs: {
      description: {
        component:
          'Chọn ngôn ngữ (i18next). Đổi luôn locale của antd, dayjs, Zod; lưu lựa chọn trong localStorage. Trong Storybook có thể đổi bằng toolbar **Ngôn ngữ**.\n\n```tsx\n<LanguageSwitcher />\n```',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="h-32">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LanguageSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Compact: Story = { args: { compact: true } }
