/* eslint-disable no-var */
var jsdom = require('jsdom');

// browser globals
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;

process.env.NODE_ENV = 'test';

// Disable webpack-specific features for tests since
// Mocha doesn't know what to do with them.
['.css', '.scss', '.png', '.jpg'].forEach(ext => {
  require.extensions[ext] = () => null;
});

// Register babel so that it will transpile ES6 to ES5
// before our tests run.
require('babel-register')();
