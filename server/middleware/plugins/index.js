const R = require('ramda');
const fs = require('fs');
const path = require('path');
const toCamelCase = require('../../utils/to-camel-case');
const constants = require('../..//constants');
const getDirectories = R.curry(require('../../utils/get-directories'))(fs, path);
const getPlugins = R.curry(require('../get-middlewares'))(require, getDirectories, toCamelCase);
const register = R.curry(require('./register'))(path, getPlugins, constants.PLUGINS_FOLDER);

module.exports = { register };
