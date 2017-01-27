const R = require('ramda');

const mount = require('koa-mount');
const Koa = require('koa');
const middleware = require('../../middleware');

module.exports = R.curry(require('./create'))(mount, Koa, middleware);
