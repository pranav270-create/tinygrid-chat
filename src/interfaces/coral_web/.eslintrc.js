module.exports = {
  extends: ['eslint-config-next/core-web-vitals', 'eslint-config-prettier'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    "react/no-unescaped-entities": "off",
    "@next/next/no-page-custom-font": "off",
    // '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-process-env': 'error',
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
};