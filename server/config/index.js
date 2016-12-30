const R = require('ramda');
const path = require('path');
const { CONFIG_ENV_FOLDER, BASE_CONFIG_NAME, DEFAULT_CONFIGS_NAME, CONFIG_FOLDER } = require('../constants');
const createEnv = R.curry(require('./create-env'))(require, path, CONFIG_ENV_FOLDER);
const getDefaults = R.curry(require('./get-defaults'))(require, path, Object.freeze, DEFAULT_CONFIGS_NAME, CONFIG_FOLDER);
const applyDefaults = R.curry(require('./apply-defaults'))(getDefaults, Object.assign, Object.keys, Object.freeze);
const deepMerge = require('../utils/deep-merge');

module.exports = R.curry(require('./create'))(applyDefaults, createEnv, deepMerge, BASE_CONFIG_NAME);
