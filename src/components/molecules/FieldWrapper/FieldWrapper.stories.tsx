import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select } from '@/components/atoms'
import { FieldWrapper } from './FieldWrapper'

const meta = {
  title: 'Molecules/FieldWrapper',
  component: FieldWrapper,
  parameters: {
    docs: {
      description: {
        component:
          'Khung chung **Label + Control + Lỗi/Gợi ý** mà mọi `Form*` dùng. Dùng trực tiếp khi cần bọc một control tuỳ chỉnh. Lỗi tạo bằng `vmsg()` trong schema được tự dịch theo ngôn ngữ.\n\n```tsx\n<FieldWrapper label="Tỉnh" htmlFor="city" required error={error}>\n  <Select id="city" ... />\n</FieldWrapper>\n```',
      },
    },
  },
  args: {
    label: 'Tỉnh / thành',
    required: true,
    hint: 'Chọn nơi bạn đang sinh sống',
    children: <Select id="city" options={[{ value: 'hn', label: 'Hà Nội' }]} />,
    htmlFor: 'city',
  },
  argTypes: { children: { control: false } },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FieldWrapper>

export default meta
type Story = StoryObj<typeof meta>

export const WithHint: Story = {}

export const WithError: Story = { args: { error: 'Vui lòng chọn tỉnh / thành' } }
