import type { Meta, StoryObj } from '@storybook/react-vite'
import RegisterPage from './RegisterPage'

const meta = {
  title: 'Pages/RegisterPage',
  component: RegisterPage,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof RegisterPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
