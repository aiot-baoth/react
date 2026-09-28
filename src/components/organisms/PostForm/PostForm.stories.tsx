import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, waitFor, within } from 'storybook/test'
import { Button } from '@/components/atoms'
import { PostForm } from './PostForm'

const meta = {
  title: 'Organisms/PostForm',
  component: PostForm,
  parameters: {
    docs: {
      description: {
        component:
          'Form tạo / sửa bài viết (`postSchema`). **Không có nút submit** — đặt trong `FormModal` / `FormDrawer`, hoặc tự thêm nút `type="submit" form={id}`. Mẫu để làm form cho resource khác.',
      },
    },
  },
  args: { id: 'story-post', onSubmit: fn() },
  render: (args) => (
    <div className="flex max-w-md flex-col gap-4">
      <PostForm {...args} />
      <Button type="submit" form={args.id}>
        Lưu
      </Button>
    </div>
  ),
} satisfies Meta<typeof PostForm>

export default meta
type Story = StoryObj<typeof meta>

export const Create: Story = {}

export const Edit: Story = {
  args: {
    defaultValues: { title: 'Bài viết mẫu', body: 'Nội dung đủ dài của bài viết mẫu.', userId: 3 },
  },
  play: async ({ args, canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Lưu' }))
    await waitFor(() => expect(args.onSubmit).toHaveBeenCalled())
  },
}
