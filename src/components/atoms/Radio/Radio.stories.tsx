import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { RadioGroup } from './Radio'

const OPTIONS = [
  { label: 'Ngày', value: 'day' },
  { label: 'Tuần', value: 'week' },
  { label: 'Tháng', value: 'month' },
]

const meta = {
  title: 'Atoms/RadioGroup',
  component: RadioGroup,
  parameters: {
    docs: {
      description: {
        component:
          'Nhóm radio (antd) từ `options`. `optionType="button"` để hiện dạng nút. Dùng trong form: xem `FormRadioGroup`.\n\n```tsx\nimport { RadioGroup } from \'@/components/atoms\'\n\n<RadioGroup options={options} value={value} onChange={(e) => setValue(e.target.value)} />\n```',
      },
    },
  },
  args: { options: OPTIONS, defaultValue: 'week', onChange: fn() },
  argTypes: {
    optionType: { control: 'inline-radio', options: ['default', 'button'] },
    buttonStyle: { control: 'inline-radio', options: ['outline', 'solid'] },
  },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Buttons: Story = {
  args: { optionType: 'button', buttonStyle: 'solid' },
}
