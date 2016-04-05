var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8081',
    'webpack/hot/dev-server',
    './src/index'
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:8081/assets/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.ProvidePlugin({
      'Promise': 'exports?global.Promise!es6-promise',
      'fetch': 'exports?self.fetch!whatwg-fetch',
    }),
  ],
  module: {
    loaders: [
      {test: /\.css$/, loaders: ['style', 'css']},
      {test: /\.jsx?$/, loaders: ['babel?cacheDirectory'], exclude: '/node_modules/'}
    ]
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    publicPath: 'http://localhost:8081/assets/'
  }
};