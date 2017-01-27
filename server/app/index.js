const R = require('ramda');
const path = require('path');
const extendConfig = require('../config/extend');
const create = require('./create');
const getAppConfigs = require('./get-app-configs');
const createApps = R.curry(require('./create-apps'))(path, create, getAppConfigs);

module.exports = {
  createApps,
  create
};
