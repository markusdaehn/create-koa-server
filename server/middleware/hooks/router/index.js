const R = require('ramda');
const path = require('path');
const getRoutes = R.curry(require('./get-routes'))(require, path);
const router = require('koa-router');

module.exports = R.curry(require('./register'))(router, getRoutes);
