const R = require('ramda');
const koa = require('koa');
const middleware = require('./middleware');

const server = R.curry(require('./create'))(koa, middleware);

module.exports = server;
