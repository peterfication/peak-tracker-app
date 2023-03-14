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
    'node_modules/(?!((jest-)?@?react-native|@react-native(-community)?|react-native-ui-lib)/)',
  ],
};
