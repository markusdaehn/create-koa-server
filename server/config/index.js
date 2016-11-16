const R = require('ramda');
const create = require('./create');
const getEnv = R.curry(require('./create-env'))(require);
const createDefault = require('./create-default');

module.exports = create(createDefault, createEnv, R.merge, process.env, __dirname);
