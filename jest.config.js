const transformIgnorePatternsPackages = [
  '(jest-)?@?react-native',
  '@react-native(-community)?',
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
  coveragePathIgnorePatterns: ['./app/utils/vendor'],
  coverageThreshold: {
    global: {
      statements: 80,
    },
  },
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  transformIgnorePatterns: [
    `node_modules/(?!(${transformIgnorePatternsPackages})/)`,
  ],
};
