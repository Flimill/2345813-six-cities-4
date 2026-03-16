/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react-hooks/recommended',
    'htmlacademy/react-typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint'],
  settings: {
    react: { version: 'detect' },
  },
  
  // === ПРАВИЛА ДЛЯ КУРСОВОЙ РАБОТЫ ===
  rules: {
    // Базовые правила
    'react-refresh/only-export-components': 'warn',
    
    // === Строгие правила типобезопасности  ===
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/strict-boolean-expressions': 'warn',
    '@typescript-eslint/prefer-readonly': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    
    // === Метрики качества кода  ===
    'max-lines': ['warn', { max: 300, skipComments: true, skipBlankLines: true }],
    'complexity': ['warn', { max: 10 }],
    'no-console': 'warn',
    
    // === Отключённые правила  ===
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'warn',
  },
  
  ignorePatterns: [
    'dist/',
    'node_modules/',
    '*.config.js',
    '*.config.cjs',
  ],
};