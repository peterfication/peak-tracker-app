# Storybook

## Initial setup

The automatic setup worked, except one step where the [manual setup](https://github.com/storybookjs/react-native/blob/next-6.0/MANUAL_SETUP.md) was necessary:

[Updating the `metro.config.js`](https://github.com/storybookjs/react-native/blob/next-6.0/MANUAL_SETUP.md#metroconfigjs), to fix the `RangeError: Maximum call stack size exceeded.` (from [this issue comment](https://github.com/storybookjs/react-native/issues/405#issuecomment-1436683333)).

## Storybook server

- https://yarnpkg.com/package/@storybook/react-native-server
- https://dev.to/risafj/setting-up-storybook-for-react-native-typescript-server-loader-ios-android-3b0i
- Check out https://dev.to/dannyhw/quick-guide-for-storybookreact-native-server-v6-4nl2
