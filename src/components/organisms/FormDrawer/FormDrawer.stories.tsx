import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { fn } from 'storybook/test'
import { Button } from '@/components/atoms'
import { PostForm } from '@/components/organisms/PostForm'
import { FormDrawer } from './FormDrawer'

const meta = {
  title: 'Organisms/FormDrawer',
  component: FormDrawer,
  parameters: {
    docs: {
      description: {
        component:
          'Drawer bên phải chứa form — hợp với form dài hoặc cần xem song song danh sách. Cách dùng giống `FormModal`.\n\n```tsx\n<FormDrawer open={Boolean(editing)} formId="post-edit" title="Sửa bài viết" onClose={close}>\n  <PostForm id="post-edit" defaultValues={editing} onSubmit={update} />\n</FormDrawer>\n```',
      },
    },
  },
  args: {
    open: false,
    title: 'Sửa bài viết #1',
    formId: 'story-drawer-form',
    onClose: fn(),
    children: null,
  },
  argTypes: { children: { control: false } },
} satisfies Meta<typeof FormDrawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Mở drawer</Button>
        <FormDrawer {...args} open={open} onClose={() => setOpen(false)}>
          <PostForm
            id={args.formId}
            defaultValues={{ title: 'Bài viết mẫu', body: 'Nội dung bài viết mẫu...', userId: 2 }}
            onSubmit={() => setOpen(false)}
          />
        </FormDrawer>
      </>
    )
  },
}
