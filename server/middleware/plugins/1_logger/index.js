const R = require('ramda');
const bunyanLogger = require('koa-bunyan-logger');
const createBunyanConfig = require('./create-bunyan-config');

module.exports = R.curry(require('./register'))(bunyanLogger, createBunyanConfig);
