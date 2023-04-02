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
    'plugin:jsx-a11y/recommended',
    '@react-native-community',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    // Needs to be last
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'jsx-a11y',
    'promise',
    'testing-library',
    'unused-imports',
    'import',
  ],
  rules: {
    '@typescript-eslint/no-empty-function': 0,
    'no-magic-numbers': 'error',
    'import/no-cycle': 'error',

    'import/no-unresolved': ['error', { ignore: ['^@env'] }],
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@app/**/*',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['type'],
        groups: [
          'builtin',
          'external',
          'internal',
          ['sibling', 'parent'],
          'index',
          'unknown',
        ],
        'newlines-between': 'always',
        distinctGroup: false,
        alphabetize: {
          /* sort in ascending order. Options: ["ignore", "asc", "desc"] */
          order: 'asc',
          /* ignore case. Options: [true, false] */
          caseInsensitive: true,
        },
      },
    ],

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
      parserOptions: {
        project: ['./tsconfig.json'], // Specify it only for TypeScript files
      },
      extends: [
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@typescript-eslint/strict',
      ],
      rules: {
        '@typescript-eslint/no-unnecessary-condition': 'error',
      },
    },

    // Ignore some rules for test files
    {
      files: ['**/__tests__/**/*.ts?(x)'],
      rules: {
        'max-nested-callbacks': 0,
        // For awaiting Promises in tests to work
        // `await new Promise(process.nextTick);`
        '@typescript-eslint/unbound-method': 0,
        'no-magic-numbers': 0,
      },
    },
    // Ignore some rules for stories files
    {
      files: ['src/**/*.stories.ts?(x)'],
      rules: {
        // Because of "ComponentStory not found in '@storybook/react-native'"
        'import/named': 0,
        'react-native/no-inline-styles': 0,
        'no-magic-numbers': 0,
      },
    },
    // Ignore some rules for JS files
    {
      files: ['**/*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 0,
      },
    },
  ],
  ignorePatterns: [
    'build/',
    'cache/',
    'coverage/',
    'dist/',
    'index.js',
    'node_modules/',
    'src/graphql/generated.ts',
    'src/graphql/schema.ts',
  ],
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
};
