const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isProd = process.env.npm_lifecycle_event === 'build:docs'

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: './examples/index.js',
  output: {
    path: path.resolve(__dirname, 'docs'),
    publicPath: isProd ? '/react-m-carousel/' : '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './examples/index.html'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'docs'),
    port: 8080
  }
}
