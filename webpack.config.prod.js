var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var StringReplacePlugin = require("string-replace-webpack-plugin");

module.exports = {
  // The entry file. All your app roots fromn here.
  entry: [
    './app/app'
  ],
  target:'electron-renderer',
  // Where you want the output to go
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name]-[hash].min.js',
    publicPath: './'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.IgnorePlugin(/vertx/),
    new ExtractTextPlugin('[name]-[hash].min.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            "react",
            "es2015",
            "stage-0"]
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback:'style-loader',
          use:'css-loader?sourceMap&modules&importLoaders=1&localIdentName=__[hash:base64:5]!postcss-loader'
        })
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
  },
};
