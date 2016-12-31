const R = require('ramda');
const path = require('path');
const fs = require('fs');
const constants = require('../constants');
const getDirectories = R.curry(require('../utils/get-directories'))(fs, path);
const getAppConfigs = R.curry(require('./get-app-configs'))(path, getDirectories);
const { create: createApp } = require('./factory');
const register = R.curry(require('./register'))(path, createApp, getAppConfigs, constants.APPS_FOLDER);

module.exports = {
  register
};
