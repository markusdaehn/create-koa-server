const R = require('ramda');
const createErrorHandler = require('./create');

module.exports = {
  register: R.curry(require('./register'))(createErrorHandler)
};
