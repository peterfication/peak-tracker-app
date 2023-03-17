module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        // verbose: true,
        allowlist: [
          'OAUTH_CLIENT_ID',
          'OAUTH_USE_LOCALHOST',
          'STORYBOOK_ENABLED',
        ],
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
