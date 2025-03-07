module.exports = {
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: './.env',
      },
    ],
    [
      'module-resolver',
      {
        alias: {
          '@src/assets': './src/assets',
          '@src/components': './src/components',
          '@src/constants': './src/constants',
          '@src/context': './src/context',
          '@src/hooks': './src/hooks',
          '@src/screens': './src/screens',
          '@src/services': './src/services',
          '@src/store': './src/store',
          '@src/utils': './src/utils',
          '@src/storage': './src/storage',
          '@src/navigation': './src/navigation',
          '@src/types': './src/types',
          '@src/theme': './src/theme',
          '@src/translations': './src/translations',
        },
        extensions: ['.js', '.json'],
        root: ['./src'],
      },
    ],
  ],
  presets: ['module:@react-native/babel-preset'],
};
