module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        // verbose: true,
        allowlist: ['STORYBOOK_ENABLED'],
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
