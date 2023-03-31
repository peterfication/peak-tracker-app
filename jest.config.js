const path = require('path');

const transformIgnorePatternsPackages = [
  '(jest-)?@?react-native',
  '@react-native(-community)?',
  '@react-navigation',
  'react-native-ui-lib',
  // The following packages are needed for the Storybook import to
  // work when testing App.tsx
  '@storybook',
  'react-native-swipe-gestures',
  'react-native-modal-selector',
  'react-native-modal-datetime-picker',
  'react-native-app-auth',
  'react-native-base64',
].join('|');

module.exports = {
  preset: 'react-native',
  cacheDirectory: './cache',
  coveragePathIgnorePatterns: [
    './src/utils/vendor',
    './src/graphql/generated.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 80,
      lines: 90,
      statements: 90,
    },
  },
  collectCoverageFrom: ['src/**/{!(*.stories),}.(ts|tsx)'],
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  transformIgnorePatterns: [
    `node_modules/(?!(${transformIgnorePatternsPackages})/)`,
  ],
  moduleDirectories: ['node_modules', path.join(__dirname, 'src')],
  moduleNameMapper: {
    '^@app(.*)$': '<rootDir>/src$1',
  },
};
