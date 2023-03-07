module.exports = {
  root: true,
  env: {
    'browser': true,
    'es2021': true,
    'node': true,
    'vue/setup-compiler-macros': true,
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'plugin:@typescript-eslint/recommended', '@nuxtjs/eslint-config-typescript', '@vue/prettier'],
  overrides: [],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'dot-notation': 'off',
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          '../*',
          '~/*',
          '~~/*',
          './assets/*',
          './components/*',
          './pages/*',
          './plugins/*',
          './router/*',
          './composables/*',
          './server/*',
          './store/*',
          './types/*',
          './utils/*',
          './libs/*',
          './*.vue',
        ],
      },
    ],
    'import/order': [
      'error',
      {
        'groups': ['builtin', 'external', 'parent', 'sibling', 'index', 'object', 'type'],
        'pathGroups': [
          {
            pattern: '{vue,vue-router,vite,@vitejs/plugin-vue}',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'parent',
            position: 'before',
          },
        ],
        'pathGroupsExcludedImportTypes': ['builtin'],
        'alphabetize': {
          order: 'asc',
        },
        'newlines-between': 'always',
      },
    ],
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    'vue/multi-word-component-names': 'off',
    'vue/require-v-for-key': 'off',
  },
}
