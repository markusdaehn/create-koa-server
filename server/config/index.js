const R = require('ramda');
const create = require('./create');
const path = require('path');
const envVars = require('./get-env-vars')(path, Object.freeze, __dirname, process.env);
const createEnv = R.curry(require('./create-env'))(require, envVars);

module.exports = create(createEnv, R.merge);
