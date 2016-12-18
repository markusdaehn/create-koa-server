const R = require('ramda');
const path = require('path');
const glob = require('glob');
const fs = require('fs');
const constants = require('../../../helpers/constants');
const getRoutes = R.curry(require('./get-routes'))(require, glob, path, constants.ROUTES_FOLDER);
const Router = require('koa-router');
const initRoutes = R.curry(require('./init-routes'))(getRoutes);
const toCamelCase = require('../../../helpers/to-camel-case');
const getDirectories = R.curry(require('../../../helpers/get-directories'))(fs, path);
const getHooks = R.curry(require('../../get-middlewares'))(getDirectories, toCamelCase);
const registerHooks = R.curry(require('./register-hooks'))(path, getHooks, constants.HOOKS_ROUTER_FOLDER);

module.exports = {
  register: R.curry(require('./register'))(Router, initRoutes, registerHooks),
  get instance() {
    return router;
  }
};
