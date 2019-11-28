import webpack from 'webpack';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import MomentLocalesPlugin from 'moment-locales-webpack-plugin';
import { ADMIN_PREFIX } from './src/constants';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false,
  VERSION: JSON.stringify(require('./package.json').version),
};

export default {
  mode: 'production',
  node: { fs: 'empty' },
  devtool: 'source-map',
  entry: './src/index', // Default entry with Webpack v4. Keeping it for explicitness.
  target: 'web',
  output: {
    path: `${__dirname}/lib/jekyll-admin/public`,
    publicPath: `${ADMIN_PREFIX}/`,
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new MiniCssExtractPlugin({ filename: 'styles.css' }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      noInfo: true,
      options: {
        context: '/',
      },
    }),
    // Strip all moment.js locales except "en" ("en" is built into Moment and can't be removed)
    // Refer https://github.com/iamakulov/moment-locales-webpack-plugin for options that can be passed
    new MomentLocalesPlugin(),
  ],
  module: {
    rules: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel-loader']},
      {test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader'},
      {test: /\.(woff|woff2)(\?.*$|$)/, loader: 'file-loader?prefix=font/&limit=30000'},
      {test: /\.ttf(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader?limit=10000&mimetype=image/svg+xml'},
      {test: /\.(jpe?g|png|gif)$/i, loaders: ['file-loader']},
      {test: /\.ico$/, loader: 'file-loader?name=[name].[ext]'},
      {
        test: /(\.css|\.scss)$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
};
