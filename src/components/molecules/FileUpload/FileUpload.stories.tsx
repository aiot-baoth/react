import type { Meta, StoryObj } from '@storybook/react-vite'
import type { UploadFile } from 'antd'
import { useState } from 'react'
import { fn } from 'storybook/test'
import { FileUpload } from './FileUpload'

const meta = {
  title: 'Molecules/FileUpload',
  component: FileUpload,
  parameters: {
    docs: {
      description: {
        component:
          'Kéo thả / chọn file (antd Upload.Dragger). Kiểm tra định dạng (`accept`) và dung lượng (`maxSizeMB`) ở client, **không tự upload** — lấy `file.originFileObj` gửi lên API khi submit.\n\n```tsx\nconst [files, setFiles] = useState<UploadFile[]>([])\n\n<FileUpload value={files} onChange={setFiles} accept="image/*,.pdf" maxCount={3} maxSizeMB={2} />\n\n// submit\nconst form = new FormData()\nfiles.forEach((f) => form.append(\'files\', f.originFileObj as File))\n```',
      },
    },
  },
  args: { accept: 'image/*,.pdf', maxCount: 3, maxSizeMB: 2, onChange: fn() },
  argTypes: { listType: { control: 'inline-radio', options: ['text', 'picture', 'picture-card'] } },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FileUpload>

export default meta
type Story = StoryObj<typeof meta>

export const Interactive: Story = {
  render: function Render(args) {
    const [files, setFiles] = useState<UploadFile[]>([
      { uid: '1', name: 'hop-dong.pdf', status: 'done' },
    ])
    return (
      <FileUpload
        {...args}
        value={files}
        onChange={(list) => {
          setFiles(list)
          args.onChange?.(list)
        }}
      />
    )
  },
}

export const Disabled: Story = { args: { disabled: true } }
