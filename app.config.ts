import packageJson from './package.json';

import type { ExpoConfig } from 'expo/config';

const IS_DEV = process.env.APP_VARIANT === 'development';

const BUNDLE_IDENTIFIER = IS_DEV
  ? 'com.anonymous.expoboilerplate.dev'
  : 'com.anonymous.expoboilerplate';

const config: ExpoConfig = {
  name: IS_DEV ? 'expo-boilerplate-dev' : 'expo-boilerplate',
  slug: 'expo-boilerplate',
  version: packageJson.version,
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  newArchEnabled: true,
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: BUNDLE_IDENTIFIER,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    edgeToEdgeEnabled: true,
    package: BUNDLE_IDENTIFIER,
  },
  extra: {
    APP_VARIANT: process.env.APP_VARIANT,
  },
  runtimeVersion: {
    policy: 'sdkVersion',
  },
  plugins: [
    [
      'expo-font',
      {
        android: {
          fonts: [
            {
              fontFamily: 'SignikaNegative',
              fontDefinitions: [
                {
                  path: './assets/fonts/SignikaNegative-Light.ttf',
                  weight: 300,
                },
                {
                  path: './assets/fonts/SignikaNegative-Regular.ttf',
                  weight: 400,
                },
                {
                  path: './assets/fonts/SignikaNegative-Medium.ttf',
                  weight: 500,
                },
                {
                  path: './assets/fonts/SignikaNegative-SemiBold.ttf',
                  weight: 600,
                },
                {
                  path: './assets/fonts/SignikaNegative-Bold.ttf',
                  weight: 700,
                },
              ],
            },
          ],
        },
        ios: {
          fonts: [
            './assets/fonts/SignikaNegative-Light.ttf',
            './assets/fonts/SignikaNegative-Regular.ttf',
            './assets/fonts/SignikaNegative-Medium.ttf',
            './assets/fonts/SignikaNegative-SemiBold.ttf',
            './assets/fonts/SignikaNegative-Bold.ttf',
          ],
        },
      },
    ],
  ],
};

export default config;
