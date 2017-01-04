const R = require('ramda');
const Koa = require('koa');
const app = require('./app');
const nullableLogger = require('./utils/nullable-logger');

const createServer = R.curry(require('./create'))(Koa, app, nullableLogger);

module.exports = createServer;
