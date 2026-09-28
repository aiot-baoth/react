import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import { SearchBar } from './SearchBar'

const meta = {
  title: 'Molecules/SearchBar',
  component: SearchBar,
  parameters: {
    docs: {
      description: {
        component:
          "Ghép **Input (antd) + Button (MUI)** trong 1 form. Submit bằng Enter hoặc bấm nút, `onSearch` nhận keyword đã trim.\n\n```tsx\nimport { SearchBar } from '@/components/molecules'\n\n<SearchBar onSearch={(keyword) => setFilter(keyword)} />\n```",
      },
    },
  },
  args: {
    onSearch: fn(),
    className: 'max-w-md',
  },
} satisfies Meta<typeof SearchBar>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithDefaultValue: Story = {
  args: { defaultValue: 'react' },
}

export const SubmitFlow: Story = {
  name: 'Tương tác: nhập & tìm',
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByPlaceholderText('Tìm kiếm...'), '  storybook  ')
    await userEvent.click(canvas.getByRole('button', { name: /tìm/i }))
    await expect(args.onSearch).toHaveBeenCalledWith('storybook')
  },
}
