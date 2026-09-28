import type { Meta, StoryObj } from '@storybook/react-vite'
import { App } from 'antd'
import { useState } from 'react'
import { expect, fn, screen, userEvent, waitFor, within } from 'storybook/test'
import { Button } from '@/components/atoms'
import { ConfirmDialog } from './ConfirmDialog'
import { useConfirmDelete } from './useConfirm'

const meta = {
  title: 'Molecules/ConfirmDialog',
  component: ConfirmDialog,
  parameters: {
    docs: {
      description: {
        component:
          "Hộp thoại xác nhận. 2 cách dùng.\n\n**1. Hook** (khuyên dùng) — không cần state `open`:\n\n```tsx\nconst confirmDelete = useConfirmDelete()\nconfirmDelete({ content: 'Xoá bài viết #1?', onConfirm: () => deletePost.mutateAsync(1) })\n\nconst confirm = useConfirm()\nif (await confirm({ content: 'Rời trang khi chưa lưu?' })) navigate(-1)\n```\n\n**2. Component** controlled:\n\n```tsx\n<ConfirmDialog open={open} danger content=\"...\" onConfirm={save} onCancel={close} />\n```\n\n`onConfirm` trả Promise thì nút xác nhận tự loading.",
      },
    },
  },
  args: {
    open: true,
    title: 'Xác nhận xoá',
    content: 'Dữ liệu đã xoá không thể khôi phục. Bạn chắc chắn muốn xoá?',
    danger: true,
    onConfirm: fn(() => new Promise<void>((r) => setTimeout(r, 1000))),
    onCancel: fn(),
  },
} satisfies Meta<typeof ConfirmDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Controlled: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button color="error" onClick={() => setOpen(true)}>
          Xoá
        </Button>
        <ConfirmDialog
          {...args}
          open={open}
          onConfirm={async () => {
            await args.onConfirm()
            setOpen(false)
          }}
          onCancel={() => setOpen(false)}
        />
      </>
    )
  },
}

function HookDemo({ onDeleted }: { onDeleted: () => void }) {
  const confirmDelete = useConfirmDelete()
  const { message } = App.useApp()
  return (
    <Button
      color="error"
      onClick={() =>
        void confirmDelete({
          content: 'Xoá bài viết #1?',
          onConfirm: async () => {
            await new Promise((r) => setTimeout(r, 300))
            onDeleted()
            void message.success('Đã xoá')
          },
        })
      }
    >
      Xoá (useConfirmDelete)
    </Button>
  )
}

export const WithHook: Story = {
  name: 'Tương tác: dùng hook',
  render: (args) => <HookDemo onDeleted={args.onCancel} />,
  play: async ({ args, canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: /useConfirmDelete/ }))
    const dialog = await screen.findByRole('dialog')
    await expect(within(dialog).getByText('Xoá bài viết #1?')).toBeInTheDocument()
    await userEvent.click(within(dialog).getByRole('button', { name: 'Xoá' }))
    await waitFor(() => expect(args.onCancel).toHaveBeenCalled())
  },
}
