module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'prettier/prettier': 0,
    '@typescript-eslint/no-empty-function': 0,
  },
  ignorePatterns: ['node_modules/', 'cache/', 'coverage/', 'dist/', 'build/'],
};
