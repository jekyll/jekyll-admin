import webpack from 'webpack';
import path from 'path';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import MomentLocalesPlugin from 'moment-locales-webpack-plugin';
import { ADMIN_PREFIX } from './src/constants';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('development'),
  __DEV__: true,
  VERSION: JSON.stringify(require('./package.json').version),
};

export default {
  mode: 'development',
  node: { fs: 'empty' },
  devtool: 'cheap-module-eval-source-map', // more info: https://webpack.js.org/configuration/devtool/#devtool
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './src/index'
  ],
  target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  output: {
    path: `${__dirname}/lib/jekyll-admin/public`, // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: `http://localhost:3000${ADMIN_PREFIX}/`, // Use absolute paths to avoid the way that URLs are resolved by Chrome when they're parsed from a dynamically loaded CSS blob. Note: Only necessary in Dev.
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS), // Tells React to build in prod mode. https://facebook.github.io/react/downloads.htmlnew webpack.HotModuleReplacementPlugin());
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
      noInfo: true, // set to false to see a list of every file being bundled.
      options: {
        context: '/',
      },
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      logLevel: 'silent',
      openAnalyzer: false,
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
      {test: /(\.css|\.scss)$/, loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']}
    ]
  }
};
