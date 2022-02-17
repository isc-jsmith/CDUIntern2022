module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    "react-native-reanimated/plugin",
  ],
};

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.tsx', '.ts', '.js', '.json'],
      }
    ],
    'react-native-reanimated/plugin'
  ]
};