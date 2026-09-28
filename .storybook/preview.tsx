import type { Preview } from '@storybook/react-vite'
import { QueryClient } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { AppProviders } from '../src/app/providers'
import { makeStore } from '../src/store'
import '../src/styles/global.css'

// Store/QueryClient riêng cho Storybook, tách khỏi instance của app
const store = makeStore()
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, staleTime: Infinity } },
})

const preview: Preview = {
  // Bọc mọi story bằng provider giống app thật (Redux, Query, theme MUI/antd, CSS layer, router)
  decorators: [
    (Story) => (
      <AppProviders store={store} queryClient={queryClient}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </AppProviders>
    ),
  ],
  parameters: {
    layout: 'padded',
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          'Giới thiệu',
          'Foundations',
          'Atoms',
          'Molecules',
          'Organisms',
          'Templates',
          'Pages',
        ],
      },
    },
  },
  tags: ['autodocs'],
}

export default preview
