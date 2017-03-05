const R = require('ramda');
const Koa = require('koa');
const app = require('./app');
const nullableLogger = require('./utils/nullable-logger');
const { getConfigs } = require('./config');
const extend = require('deepmerge2');
const normalize = require('./config').normalizeRootConfig;

const createServer = (options) => require('./create')(Koa, app, nullableLogger, normalize, extend, getConfigs, options);

module.exports = createServer;
