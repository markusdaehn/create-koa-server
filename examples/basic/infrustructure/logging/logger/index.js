const R = require('ramda');
const bunyan = require('bunyan')

module.exports = R.curry(require('./create'))(bunyan, process.stdout);
