import type { Meta, StoryObj } from '@storybook/react-vite'
import ForbiddenPage from './ForbiddenPage'

const meta = {
  title: 'Pages/ForbiddenPage',
  component: ForbiddenPage,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ForbiddenPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
