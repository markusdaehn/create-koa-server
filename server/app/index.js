const R = require('ramda');
const path = require('path');
const fs = require('fs');
const constants = require('../constants');
const getDirectories = R.curry(require('../utils/get-directories'))(fs, path);
const getAppConfigs = R.curry(require('./get-app-configs'))(path, getDirectories);
const { create } = require('./factory');
const register = R.curry(require('./register'))(path, create, getAppConfigs, constants.APPS_FOLDER);

module.exports = {
  register,
  create
};
