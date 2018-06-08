const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/ReactMCarousel.js',
  output: {
    filename: 'ReactMCarousel.js',
    path: path.resolve(__dirname, 'lib'),
    library: 'ReactMCarousel',
    libraryTarget: 'umd'
  },
  externals: [
    'react',
    'react-dom'
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      }
    ]
  }
}
