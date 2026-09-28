import js from '@eslint/js'
import prettier from 'eslint-config-prettier/flat'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  globalIgnores([
    'dist',
    'storybook-static',
    'coverage',
    'node_modules',
    // Storybook: không lint config và story
    '.storybook',
    '**/*.stories.{ts,tsx}',
  ]),

  // TypeScript + React (type-aware)
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      reactHooks.configs.flat['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
      // Cho phép truyền async handler vào props (onClick, onSubmit...)
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      // Đang dùng <LazyMotion strict>: chỉ dùng `m.*`, `motion.*` sẽ lỗi runtime + kéo toàn bộ thư viện vào bundle
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'motion/react',
              importNames: ['motion'],
              message:
                "Dùng `m` thay cho `motion` (LazyMotion strict): import { m } from 'motion/react'",
            },
            { name: 'framer-motion', message: "Dùng 'motion/react' (Motion v11+)" },
          ],
        },
      ],
    },
  },

  // Router: export object cấu hình, không phải component
  {
    files: ['src/app/router/**'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },

  // File JS config (eslint, commitlint...) chạy trên Node, không cần type-check
  {
    files: ['**/*.{js,mjs,cjs}'],
    extends: [js.configs.recommended],
    languageOptions: { globals: globals.node },
  },

  // Luôn đặt cuối: tắt các rule định dạng trùng với Prettier
  prettier,
])
