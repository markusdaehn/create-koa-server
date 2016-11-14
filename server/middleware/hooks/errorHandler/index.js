const R = require('ramda');
const createErrorHandler = require('./create');

module.exports = R.curry(require('./register'))(createErrorHandler);
