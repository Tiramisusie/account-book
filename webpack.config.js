var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    'webpack/hot/dev-server',
    './src/index.js'
  ],
  output: {
    path: '/',
    filename: 'bundle.js',
    publicPath: 'http://localhost:3031/scripts/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
    {
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src')
    },{
        test: /\.less$/,
        loader: "style!css!less"
      }
    ]
  }
};
