const R = require('ramda');
const create = require('./create');
const path = require('path');
const envVars = require('./get-env-vars')(process.env, path.resolve(__dirname, '../'));
const createEnv = R.curry(require('./create-env'))(require, envVars);
const deepMerge = R.curry(require('./deep-merge'))(R.curry, R.is, R.mergeWith);
module.exports = create(createEnv, deepMerge, process.env.NODE_ENV);
