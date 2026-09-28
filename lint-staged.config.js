/**
 * Chạy trên các file đã `git add` trước mỗi commit (.husky/pre-commit).
 * Các lệnh trong 1 mảng chạy tuần tự.
 * --no-warn-ignored: file bị ESLint ignore (story, .storybook) không gây warning chặn commit.
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*.{ts,tsx}': [
    'eslint --fix --max-warnings=0 --no-warn-ignored',
    'prettier --write',
    // Typecheck toàn project (dạng function => không nối danh sách file vào lệnh)
    () => 'tsc -b',
  ],
  '*.{js,mjs,cjs}': ['eslint --fix --max-warnings=0 --no-warn-ignored', 'prettier --write'],
  '*.{json,md,mdx,css,html,yml,yaml}': 'prettier --write',
}
