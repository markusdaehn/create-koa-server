const R = require('ramda');
const create = require('./create');
const path = require('path');
const envVars = require('./get-env-vars')(process.env, path.resolve(__dirname, '../'));
const createEnv = R.curry(require('./create-env'))(require, envVars);

module.exports = create(createEnv, R.mergeWith(R.merge), process.env.NODE_ENV);
