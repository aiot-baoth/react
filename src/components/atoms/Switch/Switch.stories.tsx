import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Switch } from './Switch'

const meta = {
  title: 'Atoms/Switch',
  component: Switch,
  parameters: {
    docs: {
      description: {
        component:
          "Switch (antd) — bật/tắt. Dùng trong form: xem `FormSwitch`.\n\n```tsx\nimport { Switch } from '@/components/atoms'\n\n<Switch checked={enabled} onChange={setEnabled} />\n```",
      },
    },
  },
  args: { defaultChecked: true, onChange: fn() },
  argTypes: { size: { control: 'inline-radio', options: ['small', 'default'] } },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Switch />
      <Switch defaultChecked />
      <Switch size="small" defaultChecked />
      <Switch checkedChildren="Bật" unCheckedChildren="Tắt" defaultChecked />
      <Switch loading defaultChecked />
      <Switch disabled />
    </div>
  ),
}
