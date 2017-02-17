const R = require('ramda');
const create = require('../create');

module.exports = R.curry(require('./create-apps'))(Object.keys, create);
