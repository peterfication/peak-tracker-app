const crypto = require('crypto');

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// See https://github.com/goatandsheep/react-native-dotenv/issues/75#issuecomment-704320755
// Make sure that different APP_ENV values lead to a reset of the cache. This is
// for example necessary when you switch between development and storybook
let hash = crypto.createHash('sha256');
hash.update(`${process.env.APP_ENV}`);
const cacheVersion = hash.digest('hex');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  cacheVersion,
};

const mergedConfig = mergeConfig(getDefaultConfig(__dirname), config);

// See https://github.com/storybookjs/react-native#existing-project
mergedConfig.resolver.resolverMainFields.unshift('sbmodern');

module.exports = mergedConfig;
