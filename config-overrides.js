const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const theme = require('./src/theme');

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    [
      'styled-components',
      {
        displayName: true,
      },
    ],
    config
  );

  config = injectBabelPlugin(
    [
      'import',
      {
        libraryName: 'antd',
        style: true,
      },
    ],
    config
  );

  config = rewireLess.withLoaderOptions({
    modifyVars: { '@primary-color': theme.primaryColor },
  })(config, env);

  return config;
};
