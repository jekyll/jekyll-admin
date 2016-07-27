// This file configures the development web server
// which supports hot reloading and synchronized testing.
import browserSync from 'browser-sync';
import fs from 'fs';
import path from 'path';
import url from 'url';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.config.dev';

import { ADMIN_PREFIX } from '../src/constants';

const bundler = webpack(config);
const defaultFile = "index.html";
const folder = path.resolve(__dirname, "../");

// Run Browsersync and use middleware for Hot Module Replacement
browserSync({
  startPath: `${ADMIN_PREFIX}`,
  server: {
    baseDir: 'src',
    middleware: [
      webpackDevMiddleware(bundler, {
        // Dev middleware can't access config, so we provide publicPath
        publicPath: config.output.publicPath,

        // pretty colored output
        stats: { colors: true },

        // Set to false to display a list of each file that is being bundled.
        noInfo: true

        // for other settings see
        // http://webpack.github.io/docs/webpack-dev-middleware.html
      }),

      // bundler should be the same as above
      webpackHotMiddleware(bundler),

      // history fallback
      (req, res, next) => {
        let fileName = url.parse(req.url);
        fileName = fileName.href.split(fileName.search).join("");
        let fileExists = fs.existsSync(folder + fileName);
        if (!fileExists && fileName.indexOf("browser-sync-client") < 0) {
            req.url = "/" + defaultFile;
        }
        return next();
      }
    ]
  },

  // no need to watch '*.js' here, webpack will take care of it for us,
  // including full page reloads if HMR won't work
  files: [
    'src/*.html'
  ]
});
