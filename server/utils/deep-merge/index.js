const R = require('ramda');

module.exports = R.curry(require('./impl'))(R.curry, R.is, R.mergeWith);
