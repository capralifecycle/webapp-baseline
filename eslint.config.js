import eslint from '@eslint/js'
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

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
      reactPlugin.configs.flat.recommended,
      // Must be last to override other rules
      prettierPluginRecommended,
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
      '@typescript-eslint/no-explicit-any': 'off',

      // React specific rules
      'react/prop-types': 'off',
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
      'react/jsx-curly-brace-presence': [
        'error',
        {props: 'always', children: 'never'},
      ],

      // Prettier
      'prettier/prettier': 'warn',
    },
  },
  {
    plugins: {
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
      'react-hooks/exhaustive-deps': 'off',
    },
    files: ['**/app/**'],
  },
)
