let path = require('path');
let webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var StringReplacePlugin = require("string-replace-webpack-plugin");

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
    new webpack.IgnorePlugin(/vertx/),
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
          presets: ['es2015','react', "stage-0"],
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
      },
      {test: /pdfkit[\/\\]js[\/\\]mixins[\/\\]fonts.js$/, loader: StringReplacePlugin.replace({
        replacements: [
          {
            pattern: 'return this.font(\'Helvetica\');',
            replacement: function () {
              return '';
            }
          }
        ]})
      },
      {test: /fontkit[\/\\]index.js$/, loader: StringReplacePlugin.replace({
        replacements: [
          {
            pattern: /fs\./g,
            replacement: function () {
              return 'require(\'fs\').';
            }
          }
        ]})
      },
      /* hack for Web Worker support */
      {test: /FileSaver.js$/, loader: StringReplacePlugin.replace({
        replacements: [
          {
            pattern: 'doc.createElementNS("http://www.w3.org/1999/xhtml", "a")',
            replacement: function () {
              return 'doc ? doc.createElementNS("http://www.w3.org/1999/xhtml", "a") : []';
            }
          }
        ]})
      },
      {enforce: 'post', test: /fontkit[\/\\]index.js$/, loader: "transform-loader?brfs"},
      {enforce: 'post', test: /unicode-properties[\/\\]index.js$/, loader: "transform-loader?brfs"},
      {enforce: 'post', test: /linebreak[\/\\]src[\/\\]linebreaker.js/, loader: "transform-loader?brfs"}



    ]
  }
}
