import type { Meta, StoryObj } from '@storybook/react-vite'
import { useZodForm } from '@/hooks'
import { z } from '@/schemas'
import { FormSwitch } from './FormSwitch'

const schema = z.object({ notify: z.boolean() })

function Demo() {
  const { control, watch } = useZodForm(schema, { defaultValues: { notify: true } })
  return (
    <div className="flex max-w-sm flex-col gap-2">
      <FormSwitch
        control={control}
        name="notify"
        label="Nhận thông báo qua email"
        hint="Có thể tắt bất cứ lúc nào"
      />
      <span className="text-xs text-text-secondary">Giá trị: {String(watch('notify'))}</span>
    </div>
  )
}

const meta = {
  title: 'Molecules/FormSwitch',
  component: Demo,
  parameters: {
    docs: {
      description: {
        component:
          'Switch đã nối **React Hook Form**, giá trị `boolean`.\n\n```tsx\n<FormSwitch control={control} name="notify" label="Nhận thông báo" />\n```',
      },
    },
  },
} satisfies Meta<typeof Demo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
