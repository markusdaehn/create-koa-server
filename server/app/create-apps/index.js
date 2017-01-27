const R = require('ramda');
const path = require('path');
const extendConfig = require('../../config/extend');
const create = require('../create');
const getAppConfigs = require('../get-app-configs');

module.exports = R.curry(require('./create-apps'))(path, create, getAppConfigs);
