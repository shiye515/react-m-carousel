const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: './src/ReactMCarousel.js',
  output: {
    filename: 'ReactMCarousel.js',
    path: path.resolve(__dirname, 'lib'),
    library: 'ReactMCarousel'
  },
  externals: ['react', 'react-prefixer'],
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  node: {
    console: false,
    global: false,
    process: false,
    __filename: false,
    __dirname: false,
    Buffer: false,
    setImmediate: false
  }
}
