const R = require('ramda');
const path = require('path');
const glob = require('glob');
const getRoutes = R.curry(require('./get-routes'))(require, glob, path);
const router = require('koa-router')();
const initRoutes = R.curry(require('./init-routes'))(getRoutes);

module.exports = {
  register: R.curry(require('./register'))(router, initRoutes),
  get instance() {
    return router;
  }
};
