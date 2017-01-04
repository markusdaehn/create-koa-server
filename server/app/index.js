const R = require('ramda');
const path = require('path');
const fs = require('fs');
const constants = require('../constants');
const getDirectories = R.curry(require('../utils/get-directories'))(fs, path);
const getAppConfigs = R.curry(require('./get-app-configs'))(path, getDirectories, constants.APPS_FOLDER);
const { create } = require('./factory');
const createApps = R.curry(require('./create-apps'))(path, create, getAppConfigs);

module.exports = {
  createApps,
  create
};
