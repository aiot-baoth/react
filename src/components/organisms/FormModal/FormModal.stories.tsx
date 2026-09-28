import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, fn, screen, userEvent, within } from 'storybook/test'
import { Button } from '@/components/atoms'
import { PostForm } from '@/components/organisms/PostForm'
import { FormModal } from './FormModal'

const meta = {
  title: 'Organisms/FormModal',
  component: FormModal,
  parameters: {
    docs: {
      description: {
        component:
          'Modal chứa form tạo / sửa. Nút **Lưu** ở footer submit form bên trong qua thuộc tính HTML `form={formId}` — form không cần biết mình nằm trong modal.\n\n```tsx\n<FormModal open={open} formId="post-form" title="Tạo bài viết" submitting={mutation.isPending} onClose={close}>\n  <PostForm id="post-form" onSubmit={(v) => mutation.mutateAsync(v)} />\n</FormModal>\n```',
      },
    },
  },
  args: {
    open: false,
    title: 'Tạo bài viết',
    formId: 'story-post-form',
    onClose: fn(),
    children: null,
  },
  argTypes: { children: { control: false } },
} satisfies Meta<typeof FormModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Mở modal</Button>
        <FormModal {...args} open={open} onClose={() => setOpen(false)}>
          <PostForm id={args.formId} onSubmit={() => setOpen(false)} />
        </FormModal>
      </>
    )
  },
}

export const Validate: Story = {
  name: 'Tương tác: bấm Lưu khi form rỗng',
  args: { open: true },
  render: (args) => (
    <FormModal {...args}>
      <PostForm id={args.formId} onSubmit={fn()} />
    </FormModal>
  ),
  play: async () => {
    const dialog = await screen.findByRole('dialog')
    await userEvent.click(within(dialog).getByRole('button', { name: 'Lưu' }))
    await expect(await within(dialog).findByText('Vui lòng nhập tiêu đề')).toBeInTheDocument()
  },
}
