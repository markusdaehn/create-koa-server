const R = require('ramda');
const path = require('path');
const createEnv = R.curry(require('./create-env'))(require, path.join);
const getDefaults = R.curry(require('./get-env-defaults'))(require, path.joinPath, Object.freeze);
const applyDefaults = R.curry(require('./apply-env-defaults'))(getDefaults, Object.assign, Object.keys, Object.freeze);
const deepMerge = require('../utils/deep-merge');

module.exports = {
  create: R.curry(require('./create'))(applyDefaults, createEnv, deepMerge)
};
