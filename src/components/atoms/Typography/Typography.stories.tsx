import type { Meta, StoryObj } from '@storybook/react-vite'
import { Heading, Text } from './Typography'

const meta = {
  title: 'Atoms/Typography',
  component: Heading,
  parameters: {
    docs: {
      description: {
        component:
          'Chuẩn hoá cỡ chữ / màu chữ. `Heading` render `h1`–`h6`, `Text` có các biến thể `body`, `secondary`, `caption`, `strong`, `code`, `danger`, `success`.\n\n```tsx\nimport { Heading, Text } from \'@/components/atoms\'\n\n<Heading level={3}>Tiêu đề</Heading>\n<Text variant="secondary">Mô tả</Text>\n```',
      },
    },
  },
  args: { level: 2, children: 'Tiêu đề mẫu' },
  argTypes: { level: { control: 'inline-radio', options: [1, 2, 3, 4, 5, 6] } },
} satisfies Meta<typeof Heading>

export default meta
type Story = StoryObj<typeof meta>

export const HeadingPlayground: Story = {}

export const Headings: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {([1, 2, 3, 4, 5, 6] as const).map((level) => (
        <Heading key={level} level={level}>
          Heading {level}
        </Heading>
      ))}
    </div>
  ),
}

export const TextVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Text>body — nội dung thường</Text>
      <Text variant="secondary">secondary — chữ phụ</Text>
      <Text variant="caption">caption — chú thích nhỏ</Text>
      <Text variant="strong">strong — nhấn mạnh</Text>
      <Text>
        Inline <Text variant="code">code</Text>
      </Text>
      <Text variant="danger">danger — lỗi</Text>
      <Text variant="success">success — thành công</Text>
      <div className="w-48">
        <Text truncate as="p">
          truncate — một đoạn chữ rất dài sẽ bị cắt bớt bằng dấu ba chấm
        </Text>
      </div>
    </div>
  ),
}
