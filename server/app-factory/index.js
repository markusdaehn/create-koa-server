const R = require('ramda');
const mount = require('koa-mount');
const Koa = require('koa');
const middleware = require('../middleware');
const create = R.curry(require('./create'))(mount, Koa, middleware);

module.exports = Object.freeze({
  create
});
