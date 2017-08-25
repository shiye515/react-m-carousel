const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let publicPath = process.env.npm_lifecycle_event === 'build:docs' ? '/react-m-carousel/' : '/'
module.exports = {
  entry: './examples/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'docs'),
    publicPath
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
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'less-loader',
          options: {
            noIeCompat: true
          }
        }]
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: './examples/index.html'
  })]
}
