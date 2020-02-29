const rewireWebpackBundleAnalyzer = require('react-app-rewire-webpack-bundle-analyzer');

module.exports = function override(config, env) {
  config.output.path = `${__dirname}/lib/jekyll-admin/public`;

  if (env === 'production') {
    config = rewireWebpackBundleAnalyzer(config, env, {
      analyzerMode: 'static',
      reportFilename: 'report.html',
    });
  }

  return config;
};
