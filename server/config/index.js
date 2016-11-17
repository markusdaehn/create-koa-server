const R = require('ramda');
const create = require('./create');
const envVars = require('./get-env-vars')(process.env, __dirname);
const createEnv = R.curry(require('./create-env'))(require, envVars);

module.exports = create(createEnv, R.merge);
