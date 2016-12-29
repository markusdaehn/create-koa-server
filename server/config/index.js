const R = require('ramda');
const path = require('path');
const { CONFIG_ENV_FOLDER, BASE_CONFIG_NAME } = require('../constants');
const createEnv = R.curry(require('./create-env'))(require, path, CONFIG_ENV_FOLDER);
const deepMerge = require('../utils/deep-merge');

module.exports = R.curry(require('./create'))(path, createEnv, deepMerge, BASE_CONFIG_NAME);
