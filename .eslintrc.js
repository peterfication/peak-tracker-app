module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'alloy',
    'alloy/react',
    'plugin:jest/recommended',
    'plugin:promise/recommended',
    'plugin:react/recommended',
    'plugin:testing-library/react',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    '@react-native-community',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'import',
    'jsx-a11y',
    'promise',
    'simple-import-sort',
    'testing-library',
    'unused-imports',
  ],
  rules: {
    'prettier/prettier': 0,
    '@typescript-eslint/no-empty-function': 0,
    'import/no-unresolved': 0,

    // Configure simple-import-sort
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    // Configure unused-imports
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
  overrides: [
    // Needed to make plugin:@typescript-eslint/recommended-requiring-type-checking work
    // See https://stackoverflow.com/questions/58510287/parseroptions-project-has-been-set-for-typescript-eslint-parser
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],

      parserOptions: {
        project: ['./tsconfig.json'], // Specify it only for TypeScript files
      },
    },

    // Ignore some rules for test files
    {
      files: ['**/__tests__/**/*.[jt]s?(x)'],
      rules: {
        'max-nested-callbacks': 0,
      },
    },
    // Ignore some rules for stories files
    {
      files: ['src/**/*.stories.[jt]s?(x)'],
      rules: {
        // Because of "ComponentStory not found in '@storybook/react-native'"
        'import/named': 0,
        'react-native/no-inline-styles': 0,
      },
    },
  ],
  ignorePatterns: [
    'node_modules/',
    'cache/',
    'coverage/',
    'dist/',
    'build/',
    'index.js',
  ],
  settings: {
    // See https://github.com/facebook/react-native/issues/28549#issuecomment-657249702
    'import/ignore': ['node_modules/react-native/index\\.js$'],
  },
};
