import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import stylistic from '@stylistic/eslint-plugin'

export default tseslint.config(
  {
    ignores: [
      '**/build/**',
      '**/dist/**',
      '**/coverage/**',
      '**/node_modules/**',
      '**/test-results/**',
      '**/playwright/**',
    ],
  },
  {
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      stylistic.configs['recommended-flat'],
      reactPlugin.configs.flat.recommended,
    ],
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // TypeScript specific rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      // React specific rules
      'react/react-in-jsx-scope': 'off',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'function-declaration',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/jsx-fragments': ['error', 'syntax'],
      'react/jsx-no-useless-fragment': 'error',

      // Code style specific rules
      '@stylistic/jsx-curly-brace-presence': [
        'error', {
          props: 'always',
          children: 'never',
        },
      ],
      '@stylistic/function-call-spacing': ['error', 'never'],
    },
  },
)
