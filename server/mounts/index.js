const R = require('ramda');
const path = require('path');
const constants = require('../helpers/constants');
const getDirectories = R.curry(require('../helpers/get-directories'))(fs, path);
const getMountConfigs = R.curry(require('./get-mount-configs'))(path, getDirectories);
const { create: createApp } = require('../app-factory');
const register = R.curry(require('./register'))(path, createApp, getMountConfigs, constants.MOUNTS_FOLDER);

module.exports = {
  register
};
