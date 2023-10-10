module.exports = {
  stories: ['../src/**/*.stories.?(ts|tsx)'],
  // TODO:
  // - https://storybook.js.org/addons/@storybook/addon-ondevice-backgrounds
  // - https://storybook.js.org/addons/@storybook/addon-ondevice-notes
  addons: [
    '@storybook/addon-ondevice-controls',
    '@storybook/addon-ondevice-actions',
  ],
  core: {
    disableTelemetry: true,
  },
};
