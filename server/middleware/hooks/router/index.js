const R = require('ramda');
const path = require('path');
const glob = require('glob');
const fs = require('fs');
const getRoutes = R.curry(require('./get-routes'))(require, glob, path);
const router = require('koa-router')();
const initRoutes = R.curry(require('./init-routes'))(getRoutes);

const constants = require('../../helpers/constants');
const toCamelCase = require('../../helpers/to-camel-case');
const getDirectories = R.curry(require('../../helpers/get-directories'))(fs, path, constants.HOOKS_ROUTER_FOLDER);
const getHooks = R.curry(require('../../helpers/get-middlewares'))(getDirectories, toCamelCase);
const registerHooks = R.curry(require('./register-hooks'))(getHooks);

module.exports = {
  register: R.curry(require('./register'))(router, initRoutes, registerHooks),
  get instance() {
    return router;
  }
};
