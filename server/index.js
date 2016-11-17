const R = require('ramda');
const config = require('./config');
const koa = require('koa');
const middleware = require('./middleware');

const server = R.curry(require('./create'))(koa, config, middleware);

module.exports = server;
