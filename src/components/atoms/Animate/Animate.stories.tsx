import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from '../Button'
import { Animate } from './Animate'

const Box = ({ label }: { label: string }) => (
  <div className="rounded-app bg-primary/10 px-4 py-6 text-center text-sm font-medium text-primary">
    {label}
  </div>
)

const meta = {
  title: 'Atoms/Animate',
  component: Animate,
  parameters: {
    docs: {
      description: {
        component:
          'Hiệu ứng xuất hiện dựng sẵn (Motion): `fade`, `slideUp`, `slideDown`, `slideLeft`, `scale`. Preset / thời lượng / easing lấy từ `src/theme/motion.ts`. Tự tắt khi hệ điều hành bật **Giảm chuyển động**.\n\n```tsx\nimport { Animate } from \'@/components/atoms\'\n\n<Animate preset="slideUp" delay={0.1}>\n  <Card>...</Card>\n</Animate>\n\n// Chỉ chạy khi cuộn tới\n<Animate preset="fade" inView>...</Animate>\n\n// Chạy lại khi đổi trang: đặt key\n<Animate key={pathname}><Outlet /></Animate>\n```',
      },
    },
  },
  args: { preset: 'slideUp', delay: 0, duration: 0.25, inView: false },
  argTypes: {
    preset: {
      control: 'inline-radio',
      options: ['fade', 'slideUp', 'slideDown', 'slideLeft', 'scale'],
    },
    duration: { control: { type: 'range', min: 0.1, max: 2, step: 0.05 } },
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
        <Animate key={key} {...args}>
          <Box label={args.preset ?? 'slideUp'} />
        </Animate>
      </div>
    )
  },
} satisfies Meta<typeof Animate>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const AllPresets: Story = {
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
        <div className="grid grid-cols-5 gap-3">
          {(['fade', 'slideUp', 'slideDown', 'slideLeft', 'scale'] as const).map((preset, i) => (
            <Animate key={`${preset}-${key}`} preset={preset} delay={i * 0.1}>
              <Box label={preset} />
            </Animate>
          ))}
        </div>
      </div>
    )
  },
}

export const Slow: Story = { args: { preset: 'scale', duration: 1 } }
