/**
 * Conventional Commits: <type>(<scope>)?: <subject>
 * type: feat | fix | docs | style | refactor | perf | test | build | ci | chore | revert
 * Ví dụ: feat(auth): thêm form đăng nhập
 * @type {import('@commitlint/types').UserConfig}
 */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Cho phép subject tiếng Việt / viết hoa tự do
    'subject-case': [0],
    'header-max-length': [2, 'always', 100],
  },
}
