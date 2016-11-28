const R = require('ramda');
const handleError = require('./handle');
const createErrorHandler = R.curry(require('./create'))(handleError);

module.exports = {
  register: R.curry(require('./register'))(createErrorHandler)
};
