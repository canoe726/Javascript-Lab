const path = require('path')

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'performance.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
      },
    ],
  },
}
