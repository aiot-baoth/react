export const ENV = {
  APP_NAME: import.meta.env.VITE_APP_NAME ?? 'Base Frontend',
  API_URL: import.meta.env.VITE_API_URL ?? '',
} as const
