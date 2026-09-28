import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { CopyButton } from './CopyButton'

const meta = {
  title: 'Molecules/CopyButton',
  component: CopyButton,
  parameters: {
    docs: {
      description: {
        component:
          'Nút sao chép vào clipboard, hiện ✓ trong 1.5s sau khi sao chép.\n\n```tsx\n<span>{orderCode} <CopyButton text={orderCode} /></span>\n```',
      },
    },
  },
  args: { text: 'ORD-2026-0001', onCopied: fn() },
} satisfies Meta<typeof CopyButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <span className="flex items-center gap-1 text-text">
      Mã đơn: <b>{args.text}</b>
      <CopyButton {...args} />
    </span>
  ),
}
