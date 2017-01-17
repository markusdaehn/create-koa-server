const R = require('ramda');
const path = require('path');
const getEnvConfig = R.curry(require('./get-env-config'))(require, path.join);
const getDefaults = R.curry(require('./get-env-defaults'))(require, path.join, Object.freeze);
const applyDefaults = R.curry(require('./apply-env-defaults'))(getDefaults, Object.assign, Object.keys, Object.freeze);
const deepMerge = require('../utils/deep-merge');

module.exports = R.curry(require('./create'))(applyDefaults, getEnvConfig, deepMerge)
