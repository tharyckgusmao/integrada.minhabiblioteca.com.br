var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // The entry file. All your app roots fromn here.
  entry: [
    './app/app'
  ],
  target:'electron-main',
  // Where you want the output to go
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name]-[hash].min.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new ExtractTextPlugin('[name]-[hash].min.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new StatsWriterPlugin('webpack.stats.json', {
            source: false,
            modules: false
        }),
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
          presets: ['es2015', 'react', 'stage-0']
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
      }
    ]
  },
};
