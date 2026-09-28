import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Textarea } from './Textarea'

const meta = {
  title: 'Atoms/Textarea',
  component: Textarea,
  parameters: {
    docs: {
      description: {
        component:
          "Textarea (antd). Mặc định tự giãn 3–8 dòng. Dùng trong form: xem `FormTextarea`.\n\n```tsx\nimport { Textarea } from '@/components/atoms'\n\n<Textarea value={note} onChange={(e) => setNote(e.target.value)} showCount maxLength={500} />\n```",
      },
    },
  },
  args: { placeholder: 'Nhập nội dung...', onChange: fn() },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithCount: Story = {
  args: { showCount: true, maxLength: 200 },
}
