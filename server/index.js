const R = require('ramda');
const Koa = require('koa');
const app = require('./app');
const nullableLogger = require('./utils/nullable-logger');
const deepMerge = require('./utils/deep-merge');

const createServer = R.curry(require('./create'))(Koa, app, nullableLogger, deepMerge);

module.exports = createServer;
