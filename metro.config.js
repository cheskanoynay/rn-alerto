const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const { withNativeWind } = require("nativewind/metro");
const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */

const defaultConfig = mergeConfig(getDefaultConfig(__dirname), {});
const config = withNativeWind(defaultConfig, {
  input: "./global.css",
});

module.exports = wrapWithReanimatedMetroConfig(config);
