let path = require('path');
let webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './app/app'
  ],
  target:'electron-main',

  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
         template: 'app/index.tpl.html',
         inject: 'body',
         filename: 'index.html'
       }),
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['react-hot-loader/babel'],
        },
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&p&localIdentName=__[hash:base64:5]'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
      }
      ,{
        test: /\.(jpg|png|gif)$/,
        loader:    'file-loader'
      }
    ]
  }
}
