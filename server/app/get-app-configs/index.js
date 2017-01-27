const R = require('ramda');
const path = require('path');
const fs = require('fs');
const constants = require('../../constants');
const getDirectories = R.curry(require('../../utils/get-directories'))(fs, path);
const extendConfig = require('../../config/extend');

module.exports = R.curry(require('./get-app-configs'))(path, getDirectories, extendConfig, constants.APPS_FOLDER);
