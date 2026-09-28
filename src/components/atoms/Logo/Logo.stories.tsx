import type { Meta, StoryObj } from '@storybook/react-vite'
import { Logo } from './Logo'

const meta = {
  title: 'Atoms/Logo',
  component: Logo,
  parameters: {
    docs: {
      description: {
        component:
          'Logo viết thuần **Tailwind** — ví dụ cho atom không phụ thuộc MUI/antd.\n\n```tsx\nimport { Logo } from \'@/components/atoms\'\n\n<Logo text="Acme" />\n```',
      },
    },
  },
  args: { text: 'Base Frontend' },
} satisfies Meta<typeof Logo>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const CustomStyle: Story = {
  args: { text: 'Acme', className: 'text-2xl text-secondary' },
}
