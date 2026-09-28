import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, within } from 'storybook/test'
import { Button } from '../Button'
import { Stagger, StaggerItem } from './Stagger'

const ITEMS = ['Khai báo schema', 'Tạo form', 'Gọi API', 'Hiển thị kết quả', 'Xử lý lỗi']

const meta = {
  title: 'Atoms/Stagger',
  component: Stagger,
  parameters: {
    docs: {
      description: {
        component:
          'Các `StaggerItem` bên trong xuất hiện **lần lượt** — dùng cho danh sách, lưới thẻ số liệu, menu... Mỗi item có `preset` riêng.\n\n```tsx\nimport { Stagger, StaggerItem } from \'@/components/atoms\'\n\n<Stagger className="grid grid-cols-4 gap-4" stagger={0.05}>\n  {stats.map((s) => (\n    <StaggerItem key={s.key}><StatCard {...s} /></StaggerItem>\n  ))}\n</Stagger>\n```',
      },
    },
  },
  args: { stagger: 0.08, delay: 0, inView: false },
  argTypes: {
    stagger: { control: { type: 'range', min: 0, max: 0.5, step: 0.01 } },
    delay: { control: { type: 'range', min: 0, max: 1, step: 0.05 } },
    children: { control: false },
  },
  render: function Render(args) {
    const [key, setKey] = useState(0)
    return (
      <div className="flex max-w-sm flex-col gap-3">
        <Button size="small" variant="outlined" onClick={() => setKey((k) => k + 1)}>
          Chạy lại
        </Button>
        <Stagger key={key} {...args} className="flex flex-col gap-2" role="list">
          {ITEMS.map((item) => (
            <StaggerItem key={item} preset="slideLeft" role="listitem">
              <div className="rounded-app border border-border bg-surface px-3 py-2 text-sm text-text">
                {item}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    )
  },
} satisfies Meta<typeof Stagger>

export default meta
type Story = StoryObj<typeof meta>

export const List: Story = {}

export const Grid: Story = {
  render: function Render() {
    const [key, setKey] = useState(0)
    return (
      <div className="flex flex-col gap-3">
        <Button
          size="small"
          variant="outlined"
          className="self-start"
          onClick={() => setKey((k) => k + 1)}
        >
          Chạy lại
        </Button>
        <Stagger key={key} stagger={0.04} className="grid grid-cols-6 gap-2">
          {Array.from({ length: 18 }, (_, i) => (
            <StaggerItem key={i} preset="scale">
              <div className="grid aspect-square place-items-center rounded-app bg-primary/10 text-primary">
                {i + 1}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    )
  },
}

export const RendersAll: Story = {
  name: 'Tương tác: đủ phần tử',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getAllByRole('listitem')).toHaveLength(ITEMS.length)
  },
}
