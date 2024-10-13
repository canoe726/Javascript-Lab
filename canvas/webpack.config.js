const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

function getDirectories(srcPath) {
  return fs
    .readdirSync(srcPath)
    .filter((file) => fs.statSync(path.join(srcPath, file)).isDirectory())
}
const directories = [
  {
    src: './src/chapter1',
    dist: 'chapter1/',
  },
]
const entryObject = {}
directories.forEach((directory) => {
  getDirectories(directory.src).forEach((name) => {
    entryObject[`${directory.dist}/${name}`] = `${directory.src}/${name}/index.ts`
  })
})

module.exports = {
  mode: 'development',
  entry: entryObject,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: '[name]/bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 4000,
  },
  plugins: [new webpack.ProgressPlugin(), new CleanWebpackPlugin()],
}
