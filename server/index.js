const R = require('ramda');
const Koa = require('koa');
const app = require('./app');
const nullableLogger = require('./utils/nullable-logger');
const deepMerge = require('./utils/deep-merge');
const createConfig = require('./config');
const path = require('path');

const createServer = R.curry(require('./create'))(Koa, app, path.join, nullableLogger, deepMerge, createConfig);

module.exports = createServer;
