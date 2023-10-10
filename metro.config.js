const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

const mergedConfig = mergeConfig(getDefaultConfig(__dirname), config);

// See https://github.com/storybookjs/react-native#existing-project
mergedConfig.resolver.resolverMainFields.unshift('sbmodern');

module.exports = mergedConfig;
