module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@app': './src',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        // verbose: true,
        allowlist: ['OAUTH_CLIENT_ID', 'OAUTH_USE_LOCALHOST'],
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
