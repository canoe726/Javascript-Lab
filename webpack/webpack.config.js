const path = require('path')

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'dist/app.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'server.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      assert: require.resolve('assert'),
      buffer: require.resolve('buffer'),
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify'),
      zlib: require.resolve('browserify-zlib'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      url: require.resolve('url'),
      util: require.resolve('util'),
      os: require.resolve('os-browserify/browser'),
      querystring: require.resolve('querystring-es3'),
      timers: require.resolve('timers-browserify'),
      crypto: require.resolve('crypto-browserify'),
      vm: require.resolve('vm-browserify'),
    },
  },
}
