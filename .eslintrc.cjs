module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier', 'react', '@typescript-eslint', 'react-hooks'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
    },
  ],
  rules: {
    'prettier/prettier': ['error', {}, {usePrettierrc: true}],

    // React specific rules
    'react/react-in-jsx-scope': 'off',
    'react/jsx-curly-brace-presence': [
      'error',
      {props: 'always', children: 'never'},
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'react/jsx-fragments': ['error', 'syntax'],
    'react/jsx-no-useless-fragment': 'error',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'function-declaration',
        unnamedComponents: 'arrow-function',
      },
    ],

    // TypeScript specific rules
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
  },
}
