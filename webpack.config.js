/* eslint-disable no-var */
var path = require('path');
var webpack = require('webpack');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry: [
    './app/js/entry',
    'webpack/hot/dev-server'
  ],
  devtool: 'eval-source-map',
  output: {
    path: __dirname+"/app/dist/",
    filename: 'bundle.js',
    publicPath: '/dist/',
    contentBase: __dirname+ "/app/"
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
     compressor: {
       warnings: false
     }
   }),
  new OpenBrowserPlugin({ url: 'http://localhost:3500' })
  ],
  resolve: {
    extensions: [ '', '.js' ]
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['react']
      }
    }]
  }
};
