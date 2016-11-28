const R = require('ramda');
const fs = require('fs');
const path = require('path');
const toCamelCase = require('../helpers/to-camel-case');
const constants = require('../helpers/constants');
const getDirectories = R.curry(require('../helpers/get-directories'))(fs, path, constants.PLUGINS_FOLDER);
const getPlugins = R.curry(require('../helpers/get-middlewares'))(getDirectories, toCamelCase);
const register = R.curry(require('./register'))(getPlugins);

module.exports = { register };
