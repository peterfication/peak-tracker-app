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
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        // From https://github.com/lydell/eslint-plugin-simple-import-sort/blob/main/examples/.eslintrc.js
        groups: [
          // Node.js builtins. You could also generate this regex if you use a `.js` config.
          // For example: `^(${require("module").builtinModules.join("|")})(/|$)`
          // Note that if you use the `node:` prefix for Node.js builtins,
          // you can avoid this complexity: You can simply use "^node:".
          [
            '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
          ],
          // Packages. `react` related packages come first.
          ['^react', '^@?\\w'],
          // Internal packages.
          ['^(@app)(/.*|$)'],
          // Side effect imports.
          ['^\\u0000'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
          ['^.+\\.s?css$'],
        ],
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
      },
    },
    // Ignore some rules for stories files
    {
      files: ['src/**/*.stories.ts?(x)'],
      rules: {
        // Because of "ComponentStory not found in '@storybook/react-native'"
        'import/named': 0,
        'react-native/no-inline-styles': 0,
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
